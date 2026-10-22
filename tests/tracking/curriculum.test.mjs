import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

// Run the real Marketing effect with only its UI/framework dependencies stubbed.
// This covers listener registration, async pixel initialization, and cleanup.
async function mount(pathname = "/curriculo/interesse", delayed = false) {
    const listeners = new Map();
    const calls = [];
    const frameWindow = {};
    const captured = [];
    const stored = new Map();
    const pixel = Object.fromEntries(
        ["init", "pageView", "track", "trackCustom"].map((name) => [
            name,
            (...args) => calls.push([name, ...args])
        ])
    );
    let resolvePixel;
    const pendingPixel = delayed
        ? new Promise((resolve) => {
              resolvePixel = resolve;
          })
        : Promise.resolve({ default: pixel });
    const context = vm.createContext({
        window: {
            location: {
                pathname,
                href: `https://www.dralorraine.com${pathname}`,
                origin: "https://www.dralorraine.com"
            },
            dataLayer: [],
            sessionStorage: {
                getItem: (key) => stored.get(key),
                setItem: (key, value) => stored.set(key, value)
            },
            addEventListener: (name, fn) => listeners.set(name, fn),
            removeEventListener: (name) => listeners.delete(name)
        },
        document: {
            addEventListener() {},
            removeEventListener() {},
            querySelector: () => ({ contentWindow: frameWindow })
        },
        router: { events: { on() {}, off() {} } },
        process: { env: { NEXT_PUBLIC_POSTHOG_KEY: "test" } },
        console,
        URL,
        Set,
        posthog: {
            init() {},
            opt_out_capturing() {},
            capture: (...args) => captured.push(args)
        },
        initializeOpenAIPixel() {},
        trackConsultationBookingClick() {},
        loadPixel: () => pendingPixel,
        useEffect: (fn) => {
            context.cleanup = fn();
        }
    });
    const tracking = fs
        .readFileSync("utils/curriculumTracking.mjs", "utf8")
        .replaceAll("export ", "");
    const source = fs.readFileSync("pages/_app.js", "utf8");
    const effect = source.slice(
        source.indexOf("    useEffect(() => {"),
        source.indexOf("    return (\n        <PostHogProvider")
    );
    vm.runInContext(
        `${tracking}\n${effect.replace(
            'import("react-facebook-pixel")',
            "loadPixel()"
        )}`,
        context
    );
    await Promise.resolve();
    return {
        calls,
        captured,
        stored,
        listeners,
        frameWindow,
        context,
        ready: async () => {
            resolvePixel({ default: pixel });
            await Promise.resolve();
        }
    };
}
const payload = {
    event: "Tally.FormSubmitted",
    payload: {
        formId: "EkjBgl",
        id: "test-submission",
        fields: [{ title: "Email", answer: { value: "private@example.test" } }]
    }
};
function submit(app, data = JSON.stringify(payload), overrides = {}) {
    app.listeners.get("message")?.({
        origin: "https://tally.so",
        source: app.frameWindow,
        data,
        ...overrides
    });
}
test("a successful curriculum submission emits one analytics lead without answers or revenue", async () => {
    const app = await mount();
    submit(app);
    submit(app, payload);
    const leads = app.context.window.dataLayer.filter(
        (args) => args[0] === "event" && args[1] === "generate_lead"
    );
    assert.equal(
        leads.length,
        1,
        "A completed Tally form must produce one analytics lead"
    );
    assert.equal(app.captured.length, 1);
    assert.equal(app.captured[0][0], "curriculum_lead_submitted");
    assert.equal(
        JSON.stringify([leads, app.captured]).includes("private@example.test"),
        false
    );
    assert.equal(
        JSON.stringify([leads, app.captured]).includes("test-submission"),
        false
    );
    assert.equal(leads[0][2].value, undefined);
    assert.equal(
        app.calls.some(([, event]) => event === "Lead"),
        false
    );
    assert.equal(
        app.calls.some(([, event]) => event === "Purchase"),
        false
    );
    app.context.cleanup();
    assert.equal(app.listeners.has("message"), false);
});
test("reject forged, unrelated, malformed, and unfinished form messages", async () => {
    const app = await mount();
    submit(app, "{");
    submit(app, null);
    submit(app, JSON.stringify(payload), { origin: "https://evil.example" });
    submit(app, payload, { source: {} });
    submit(app, {
        ...payload,
        payload: { formId: "another-form", id: "other" }
    });
    submit(app, { event: "Tally.FormPageView", payload: { formId: "EkjBgl" } });
    assert.equal(
        app.calls.some(([, event]) => event === "Lead"),
        false
    );
    assert.equal(app.captured.length, 0);
});
test("submission analytics work even before the Meta pixel initializes", async () => {
    const app = await mount("/curriculo/interesse", true);
    submit(app);
    await app.ready();
    assert.equal(app.captured.length, 1);
    assert.equal(
        app.calls.some(([, event]) => event === "Lead"),
        false
    );
});
test("visiting the interest form is a funnel event, never a Lead", async () => {
    const app = await mount();
    assert.equal(
        app.calls.filter(([, event]) => event === "CurriculumInterest").length,
        1
    );
    assert.equal(
        app.calls.some(([, event]) => event === "Lead"),
        false
    );
});
