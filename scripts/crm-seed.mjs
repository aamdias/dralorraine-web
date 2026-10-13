import { mkdir, writeFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import { createSeed } from "../utils/crm/seed.mjs";
const directory = resolve(".crm-demo");
const filename = resolve(directory, "state.json");
await mkdir(directory, { recursive: true, mode: 0o700 });
let exists = true;
try {
    await access(filename);
} catch {
    exists = false;
}
if (exists && !process.argv.includes("--reset"))
    console.log(
        "Demo data already exists. Use npm run crm:seed -- --reset to restore fictional records."
    );
else {
    const seed = createSeed();
    await writeFile(filename, JSON.stringify(seed, null, 2), { mode: 0o600 });
    console.log(
        `Seeded ${seed.patients.length} fictional patients, ${seed.appointments.length} appointments and ${seed.intakes.length} online intakes locally. No database connection used.`
    );
}
