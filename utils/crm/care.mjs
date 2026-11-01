import {
    ValidationError,
    textField,
    dateField,
    idField,
    today
} from "./model.mjs";

export const UNITS = ["ml", "g", "unidade", "dose"];
export const quantity = (v) => Math.round(Number(v) * 1000) / 1000;
function required(value, message, max) {
    const text = textField(value, max);
    if (!text) throw new ValidationError(message);
    return text;
}
export function imageField(value) {
    if (!value) return null;
    if (
        typeof value !== "string" ||
        value.length > 600000 ||
        !/^data:image\/(jpeg|png);base64,[A-Za-z0-9+/]+=*$/.test(value)
    )
        throw new ValidationError("Use uma foto JPEG ou PNG de até 450 KB.");
    const bytes = Buffer.from(value.split(",")[1], "base64");
    const png = bytes
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    if (!(value.startsWith("data:image/png") ? png : jpg))
        throw new ValidationError("Arquivo de imagem inválido.");
    return value;
}
export function validateProduct(input) {
    if (!UNITS.includes(input.unit))
        throw new ValidationError("Unidade inválida.");
    return {
        name: required(input.name, "Informe o produto.", 160),
        brand: textField(input.brand, 120),
        unit: input.unit,
        image: imageField(input.image),
        image_source: textField(input.image_source, 1000)
    };
}
export function validatePurchase(input) {
    const amount = Number(input.quantity);
    if (
        !Number.isFinite(amount) ||
        amount <= 0 ||
        amount > 1000000 ||
        quantity(amount) !== amount
    )
        throw new ValidationError(
            "Informe a quantidade com até três casas decimais."
        );
    if (
        !Number.isSafeInteger(input.cost_cents) ||
        input.cost_cents < 0 ||
        input.cost_cents > 100000000
    )
        throw new ValidationError("Custo inválido.");
    const purchased_on = dateField(input.purchased_on);
    if (!purchased_on || purchased_on > today())
        throw new ValidationError(
            "Informe uma data de compra válida, até hoje."
        );
    const expires_on = dateField(input.expires_on);
    if (expires_on && expires_on < purchased_on)
        throw new ValidationError("Validade anterior à compra.");
    const product_id = idField(input.product_id);
    if (!product_id) throw new ValidationError("Selecione o produto.");
    return {
        product_id,
        quantity: amount,
        cost_cents: input.cost_cents,
        purchased_on,
        expires_on,
        lot: textField(input.lot, 100)
    };
}
export function validateUsage(input = []) {
    if (!Array.isArray(input) || input.length > 30)
        throw new ValidationError("Lista de consumo inválida.");
    const seen = new Set();
    return input.map((item) => {
        if (!item || typeof item !== "object" || Array.isArray(item))
            throw new ValidationError("Consumo inválido.");
        const purchase_id = idField(item.purchase_id),
            amount = Number(item.quantity);
        if (
            !purchase_id ||
            seen.has(purchase_id) ||
            !Number.isFinite(amount) ||
            amount <= 0 ||
            amount > 1000000 ||
            quantity(amount) !== amount
        )
            throw new ValidationError(
                "Confira os lotes e as quantidades consumidas."
            );
        seen.add(purchase_id);
        return { purchase_id, quantity: amount };
    });
}
export function validatePrescription(input) {
    const appointment_id = idField(input.appointment_id);
    if (!appointment_id)
        throw new ValidationError("Selecione um atendimento realizado.");
    if (!Array.isArray(input.items) || input.items.length > 20)
        throw new ValidationError("Inclua até 20 produtos.");
    if (
        input.items.some(
            (item) => !item || typeof item !== "object" || Array.isArray(item)
        )
    )
        throw new ValidationError("Produto prescrito inválido.");
    if (
        input.items.reduce(
            (n, item) =>
                n + (typeof item.image === "string" ? item.image.length : 0),
            0
        ) > 3000000
    )
        throw new ValidationError(
            "As fotos da receita ultrapassam 3 MB. Use menos fotos ou imagens menores."
        );
    const date = dateField(input.date);
    if (!date || date > today())
        throw new ValidationError(
            "Informe uma data de emissão válida, até hoje."
        );
    return {
        appointment_id,
        date,
        title: required(input.title, "Informe o título.", 160),
        conduct: required(
            input.conduct,
            "Descreva a conduta para o paciente.",
            12000
        ),
        doctor: required(input.doctor, "Informe a médica responsável.", 160),
        registration: required(input.registration, "Informe CRM/UF.", 120),
        qualification: textField(input.qualification, 120),
        items: input.items.map((item) => ({
            product_id: idField(item.product_id),
            name: required(item.name, "Informe o nome de cada produto.", 160),
            instructions: required(
                item.instructions,
                "Informe o modo de uso de cada produto.",
                2000
            ),
            image: imageField(item.image),
            image_source: textField(item.image_source, 1000)
        }))
    };
}

// Revenue is apportioned by consumed cost, so several products never duplicate an encounter's revenue.
export function inventoryMetrics(products, purchases, usages, appointments) {
    const allocations = new Map();
    for (const a of appointments.filter(
        (a) => a.status === "Realizado" && a.amount_cents != null
    )) {
        const rows = usages.filter((u) => u.appointment_id === a.id);
        const cost = rows.reduce((n, u) => n + Number(u.cost_cents), 0);
        let assigned = 0;
        rows.forEach((u, index) => {
            const share =
                index === rows.length - 1
                    ? a.amount_cents - assigned
                    : Math.floor(
                          a.amount_cents *
                              (cost ? u.cost_cents / cost : 1 / rows.length)
                      );
            allocations.set(u.id, share);
            assigned += share;
        });
    }
    return products.map((p) => {
        const lots = purchases
            .filter((l) => l.product_id === p.id)
            .map((l) => {
                const uses = usages.filter((u) => u.purchase_id === l.id);
                const revenue = uses.reduce(
                    (n, u) => n + (allocations.get(u.id) || 0),
                    0
                );
                const knownCost = uses
                    .filter((u) => allocations.has(u.id))
                    .reduce((n, u) => n + u.cost_cents, 0);
                return {
                    ...l,
                    remaining: quantity(
                        l.quantity -
                            uses.reduce((n, u) => n + Number(u.quantity), 0)
                    ),
                    consumed_cost: uses.reduce((n, u) => n + u.cost_cents, 0),
                    revenue,
                    contribution: revenue - knownCost,
                    encounters: new Set(uses.map((u) => u.appointment_id)).size
                };
            });
        const uses = usages.filter((u) =>
            lots.some((l) => l.id === u.purchase_id)
        );
        const consumed_cost = uses.reduce(
            (n, u) => n + Number(u.cost_cents),
            0
        );
        const revenue = uses.reduce(
            (n, u) => n + (allocations.get(u.id) || 0),
            0
        );
        const knownCost = uses
            .filter((u) => allocations.has(u.id))
            .reduce((n, u) => n + Number(u.cost_cents), 0);
        return {
            ...p,
            lots,
            stock: quantity(lots.reduce((n, l) => n + l.remaining, 0)),
            investment: lots.reduce((n, l) => n + l.cost_cents, 0),
            consumed_cost,
            revenue,
            contribution: revenue - knownCost,
            unknown_revenue: new Set(
                uses
                    .filter((u) => !allocations.has(u.id))
                    .map((u) => u.appointment_id)
            ).size,
            encounters: new Set(uses.map((u) => u.appointment_id)).size
        };
    });
}
