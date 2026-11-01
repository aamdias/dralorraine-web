import { useState, useId, Children, isValidElement, cloneElement } from "react";
import {
    FiPlus,
    FiPackage,
    FiFileText,
    FiDownload,
    FiTrash2
} from "react-icons/fi";
import { inventoryMetrics, UNITS, quantity } from "@utils/crm/care.mjs";
import { money, dateLabel, today, normalizeSearch } from "@utils/crm/model.mjs";
import styles from "./CRM.module.scss";

const formatQuantity = (value) =>
    new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 3 }).format(value);

async function api(body, url = "/api/admin/crm") {
    const res = await fetch(
        url,
        body
            ? {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body)
              }
            : undefined
    );
    const result = await res.json();
    if (!res.ok)
        throw new Error(result.error || "Não foi possível concluir a ação.");
    return result;
}
function Field({ label, children }) {
    const id = useId();
    return (
        <div className={styles.field}>
            <label htmlFor={id}>{label}</label>
            {Children.map(children, (child) =>
                isValidElement(child) &&
                ["input", "select", "textarea"].includes(child.type)
                    ? cloneElement(child, { id })
                    : child
            )}
        </div>
    );
}
function Stat({ label, value, note }) {
    return (
        <div className={styles.stat}>
            <span className={styles.eyebrow}>{label}</span>
            <strong>{value}</strong>
            <small>{note}</small>
        </div>
    );
}
export function ProductPhoto({ image, name }) {
    // Data URIs are stored snapshots, bypassing remote tracking and the public image cache.
    return image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.productPhoto} src={image} alt={name} />
    ) : (
        <div className={styles.productPhoto} aria-label="Sem foto">
            <FiPackage />
        </div>
    );
}
async function normalizePhoto(source) {
    const img = new window.Image();
    img.src = source;
    await img.decode();
    const ratio = Math.min(1, 900 / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.width * ratio));
    canvas.height = Math.max(1, Math.round(img.height * ratio));
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg", 0.82);
    if (image.length > 600000)
        throw new Error("Foto muito grande. Use uma imagem menor.");
    return image;
}
function PhotoInput({ value, source, onChange, onBusy }) {
    const [url, setUrl] = useState(""),
        [busy, setBusy] = useState(false),
        [error, setError] = useState("");
    async function load(callback, origin) {
        setBusy(true);
        onBusy?.(1);
        setError("");
        try {
            onChange(await normalizePhoto(await callback()), origin);
        } catch (e) {
            setError(e.message || "Não foi possível abrir a foto.");
        } finally {
            setBusy(false);
            onBusy?.(-1);
        }
    }
    return (
        <div className={styles.photoInput}>
            <ProductPhoto image={value} name="Foto do produto" />
            <div>
                <Field label="Foto real do produto">
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        disabled={busy}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            if (file.size > 4 * 1024 * 1024) {
                                setError("Envie uma foto de até 4 MB.");
                                return;
                            }
                            load(
                                () =>
                                    new Promise((resolve, reject) => {
                                        const r = new FileReader();
                                        r.onload = () => resolve(r.result);
                                        r.onerror = reject;
                                        r.readAsDataURL(file);
                                    }),
                                ""
                            );
                        }}
                    />
                </Field>
                <Field label="Ou link direto da foto do fabricante">
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://…/produto.jpg"
                    />
                </Field>
                <button
                    type="button"
                    disabled={!url || busy}
                    className={styles.textButton}
                    onClick={() =>
                        load(
                            async () =>
                                (await api({ url }, "/api/admin/product-image"))
                                    .image,
                            url
                        )
                    }
                >
                    {busy ? "Preparando foto…" : "Importar foto do link"}
                </button>
                {value && (
                    <button
                        type="button"
                        className={styles.textButton}
                        onClick={() => onChange(null, "")}
                    >
                        Remover foto
                    </button>
                )}
                {source && (
                    <small className={styles.block}>Origem: {source}</small>
                )}
                <small className={styles.block}>
                    Use a foto da embalagem correta. A imagem será incluída na
                    receita.
                </small>
                {error && (
                    <p role="alert" className={styles.error}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}
export function UsageEditor({ record, onChange, data }) {
    const usages = record.usages || [];
    const metrics = inventoryMetrics(
        data.products || [],
        data.purchases || [],
        data.usages || [],
        data.appointments
    );
    const lots = metrics.flatMap((p) =>
        p.lots.map((l) => ({
            ...l,
            product: p,
            available: quantity(
                l.remaining +
                    (data.usages || [])
                        .filter(
                            (u) =>
                                u.appointment_id === record.id &&
                                u.purchase_id === l.id
                        )
                        .reduce((n, u) => n + Number(u.quantity), 0)
            )
        }))
    );
    const update = (index, changes) =>
        onChange(
            usages.map((u, i) => (i === index ? { ...u, ...changes } : u))
        );
    return (
        <div className={styles.usageEditor}>
            <p>
                Baixa no estoque apenas para atendimentos realizados. Escolha o
                lote e a quantidade na unidade cadastrada.
            </p>
            {usages.map((u, index) => {
                const lot = lots.find((l) => l.id === u.purchase_id);
                return (
                    <div key={index} className={styles.usageRow}>
                        <Field label={`Produto / lote ${index + 1}`}>
                            <select
                                value={u.purchase_id}
                                required
                                onChange={(e) =>
                                    update(index, {
                                        purchase_id: e.target.value
                                    })
                                }
                            >
                                <option value="">Selecione o lote</option>
                                {lots
                                    .filter(
                                        (l) =>
                                            l.available > 0 ||
                                            l.id === u.purchase_id
                                    )
                                    .map((l) => (
                                        <option
                                            key={l.id}
                                            value={l.id}
                                            disabled={usages.some(
                                                (other, i) =>
                                                    i !== index &&
                                                    other.purchase_id === l.id
                                            )}
                                        >
                                            {l.product.name} ·{" "}
                                            {l.lot || dateLabel(l.purchased_on)}{" "}
                                            · {l.available} {l.product.unit}{" "}
                                            disponíveis
                                            {l.expires_on
                                                ? ` · validade ${dateLabel(
                                                      l.expires_on
                                                  )}`
                                                : ""}
                                        </option>
                                    ))}
                            </select>
                        </Field>
                        <Field
                            label={`Quantidade${
                                lot ? ` (${lot.product.unit})` : ""
                            }`}
                        >
                            <input
                                type="number"
                                min="0.001"
                                step="0.001"
                                max={lot?.available}
                                value={u.quantity}
                                required
                                onChange={(e) =>
                                    update(index, { quantity: e.target.value })
                                }
                            />
                        </Field>
                        <button
                            type="button"
                            aria-label={`Remover consumo ${index + 1}`}
                            className={styles.iconButton}
                            onClick={() =>
                                onChange(usages.filter((_, i) => i !== index))
                            }
                        >
                            <FiTrash2 />
                        </button>
                        {lot && (
                            <small>
                                Custo:{" "}
                                {money(
                                    Math.round(
                                        (Number(u.quantity || 0) *
                                            lot.cost_cents) /
                                            lot.quantity
                                    )
                                )}
                            </small>
                        )}
                    </div>
                );
            })}
            <button
                type="button"
                className={styles.secondary}
                disabled={!lots.length || usages.length >= 30}
                onClick={() =>
                    onChange([...usages, { purchase_id: "", quantity: "" }])
                }
            >
                <FiPlus /> Adicionar consumo
            </button>
            {!lots.length && (
                <small className={styles.block}>
                    Cadastre um produto e uma compra em Estoque para registrar o
                    consumo.
                </small>
            )}
        </div>
    );
}
export default function CareWorkspace({
    mode,
    data,
    onSave,
    Drawer,
    patientId,
    embedded = false,
    globalError
}) {
    const [modal, setModal] = useState(null),
        [query, setQuery] = useState(""),
        [error, setError] = useState(""),
        [working, setWorking] = useState(false);
    const products = inventoryMetrics(
        data.products || [],
        data.purchases || [],
        data.usages || [],
        data.appointments
    );
    const prescriptions = (data.prescriptions || [])
        .filter((r) => !patientId || r.patient_id === patientId)
        .sort((a, b) =>
            (b.created_at || b.date).localeCompare(a.created_at || a.date)
        );
    const totals = products.reduce(
        (n, p) => ({
            investment: n.investment + p.investment,
            cost: n.cost + p.consumed_cost,
            revenue: n.revenue + p.revenue,
            contribution: n.contribution + p.contribution
        }),
        { investment: 0, cost: 0, revenue: 0, contribution: 0 }
    );
    const open = (kind, record = {}) => {
        setError("");
        setModal({ kind, record });
    };
    async function save(kind, record) {
        setWorking(true);
        setError("");
        try {
            const result = await onSave(
                kind,
                record,
                record.id,
                record.revision
            );
            if (result) setModal(null);
        } catch (e) {
            setError(e.message);
        } finally {
            setWorking(false);
        }
    }
    async function download(id) {
        setWorking(true);
        setError("");
        try {
            const res = await fetch(
                `/api/admin/prescription-pdf?id=${encodeURIComponent(id)}`
            );
            if (!res.ok) {
                const result = await res.json();
                throw new Error(
                    result.error || "Não foi possível gerar o PDF."
                );
            }
            const url = URL.createObjectURL(await res.blob());
            const a = document.createElement("a");
            a.href = url;
            a.download = `receita-${id}.pdf`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (e) {
            setError(e.message);
        } finally {
            setWorking(false);
        }
    }
    return (
        <div className={styles.careWorkspace}>
            <div className={styles.pageHeading}>
                <div>
                    <span className={styles.eyebrow}>
                        {mode === "stock"
                            ? "PRODUTOS E RESULTADOS"
                            : "CUIDADO QUE CONTINUA"}
                    </span>
                    {embedded ? (
                        <h2>Receitas do paciente</h2>
                    ) : (
                        <h1>
                            {mode === "stock" ? (
                                <>
                                    Cada produto, um <em>investimento.</em>
                                </>
                            ) : (
                                <>
                                    Seu cuidado, <em>por escrito.</em>
                                </>
                            )}
                        </h1>
                    )}
                    <p>
                        {mode === "stock"
                            ? "Compras, consumo e retorno dos produtos usados nos atendimentos."
                            : "Produtos, modo de uso e conduta em um documento para levar consigo."}
                    </p>
                </div>
                <button
                    className={styles.primary}
                    onClick={() =>
                        open(mode === "stock" ? "product" : "prescription")
                    }
                >
                    <FiPlus />{" "}
                    {mode === "stock" ? "Novo produto" : "Nova receita"}
                </button>
            </div>
            {error && (
                <p role="alert" className={styles.error}>
                    {error}
                </p>
            )}
            {mode === "stock" ? (
                <>
                    <div className={styles.stats}>
                        <Stat
                            label="INVESTIDO EM COMPRAS"
                            value={money(totals.investment)}
                            note="Custo total dos lotes"
                        />
                        <Stat
                            label="CUSTO CONSUMIDO"
                            value={money(totals.cost)}
                            note="Produtos usados nos atendimentos"
                        />
                        <Stat
                            label="RECEITA ATRIBUÍDA"
                            value={money(totals.revenue)}
                            note="Rateada pelo custo dos produtos"
                        />
                        <Stat
                            label="MARGEM DE CONTRIBUIÇÃO"
                            value={money(totals.contribution)}
                            note="Receita conhecida menos produto consumido"
                        />
                    </div>
                    <p className={styles.notice}>
                        A receita dos atendimentos realizados é rateada
                        proporcionalmente ao custo consumido de cada produto. A
                        margem considera somente produtos; outros gastos não
                        estão incluídos. Atendimentos sem valor informado ficam
                        fora da margem.
                    </p>
                    <Field label="Buscar produto ou marca">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Nome ou marca…"
                        />
                    </Field>
                    <div className={styles.productGrid}>
                        {products
                            .filter((p) =>
                                normalizeSearch(
                                    `${p.name} ${p.brand || ""}`
                                ).includes(normalizeSearch(query))
                            )
                            .map((p) => (
                                <article
                                    className={styles.productCard}
                                    key={p.id}
                                >
                                    <div className={styles.productIdentity}>
                                        <ProductPhoto
                                            image={
                                                p.has_image
                                                    ? `/api/admin/product-photo?id=${encodeURIComponent(
                                                          p.id
                                                      )}&v=${p.revision}`
                                                    : null
                                            }
                                            name={p.name}
                                        />
                                        <div>
                                            <small>{p.brand}</small>
                                            <h2>{p.name}</h2>
                                            <strong>
                                                {formatQuantity(p.stock)}{" "}
                                                {p.unit} em estoque
                                            </strong>
                                        </div>
                                    </div>
                                    <dl className={styles.productNumbers}>
                                        <div>
                                            <dt>Investimento</dt>
                                            <dd>{money(p.investment)}</dd>
                                        </div>
                                        <div>
                                            <dt>Receita atribuída</dt>
                                            <dd>{money(p.revenue)}</dd>
                                        </div>
                                        <div>
                                            <dt>Custo consumido</dt>
                                            <dd>{money(p.consumed_cost)}</dd>
                                        </div>
                                        <div>
                                            <dt>Margem de contribuição</dt>
                                            <dd>{money(p.contribution)}</dd>
                                        </div>
                                    </dl>
                                    <small>
                                        {p.encounters} atendimento(s) com
                                        consumo
                                        {p.unknown_revenue
                                            ? ` · ${p.unknown_revenue} sem receita informada`
                                            : ""}
                                    </small>
                                    <details>
                                        <summary>
                                            Lotes e saldos ({p.lots.length})
                                        </summary>
                                        {p.lots.map((l) => (
                                            <div
                                                className={styles.lotRow}
                                                key={l.id}
                                            >
                                                <strong>
                                                    {l.lot ||
                                                        "Sem código de lote"}
                                                </strong>
                                                <span>
                                                    {formatQuantity(
                                                        l.remaining
                                                    )}{" "}
                                                    /{" "}
                                                    {formatQuantity(l.quantity)}{" "}
                                                    {p.unit} ·{" "}
                                                    {money(l.cost_cents)}
                                                </span>
                                                <small>
                                                    {l.encounters}{" "}
                                                    atendimento(s) · receita
                                                    atribuída {money(l.revenue)}{" "}
                                                    · custo consumido{" "}
                                                    {money(l.consumed_cost)} ·
                                                    margem{" "}
                                                    {money(l.contribution)}
                                                </small>
                                                <small>
                                                    Compra{" "}
                                                    {dateLabel(l.purchased_on)}
                                                    {l.expires_on
                                                        ? ` · validade ${dateLabel(
                                                              l.expires_on
                                                          )}`
                                                        : ""}
                                                    {l.remaining > 0 &&
                                                    l.expires_on &&
                                                    l.expires_on < today()
                                                        ? " · Vencido"
                                                        : ""}
                                                </small>
                                            </div>
                                        ))}
                                    </details>
                                    <div className={styles.headingActions}>
                                        <button
                                            className={styles.secondary}
                                            onClick={() =>
                                                open("purchase", {
                                                    product_id: p.id,
                                                    quantity: "",
                                                    cost_cents: null,
                                                    purchased_on: today(),
                                                    expires_on: "",
                                                    lot: ""
                                                })
                                            }
                                        >
                                            <FiPlus /> Compra
                                        </button>
                                        <button
                                            className={styles.textButton}
                                            disabled={working}
                                            onClick={async () => {
                                                setWorking(true);
                                                setError("");
                                                try {
                                                    open(
                                                        "product",
                                                        await api(
                                                            null,
                                                            `/api/admin/crm?product=${p.id}`
                                                        )
                                                    );
                                                } catch (e) {
                                                    setError(e.message);
                                                } finally {
                                                    setWorking(false);
                                                }
                                            }}
                                        >
                                            Editar produto
                                        </button>
                                    </div>
                                </article>
                            ))}
                    </div>
                    {!products.length && (
                        <div className={styles.careEmpty}>
                            <FiPackage />
                            <h2>Comece pelo seu primeiro produto.</h2>
                            <p>
                                Cadastre o produto, registre a compra e informe
                                o consumo em cada atendimento.
                            </p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {!prescriptions.length && (
                        <div className={styles.careEmpty}>
                            <FiFileText />
                            <h2>Um plano de cuidado para cada paciente.</h2>
                            <p>
                                Selecione um atendimento realizado, escreva a
                                conduta e adicione os produtos prescritos.
                            </p>
                        </div>
                    )}
                    {prescriptions.map((r) => (
                        <article key={r.id} className={styles.prescriptionRow}>
                            <div>
                                <span className={styles.eyebrow}>
                                    {dateLabel(r.date)}
                                </span>
                                <h3>{r.title}</h3>
                                <p>{r.patient_name}</p>
                            </div>
                            <div className={styles.headingActions}>
                                <button
                                    className={styles.textButton}
                                    disabled={working}
                                    onClick={async () => {
                                        setWorking(true);
                                        setError("");
                                        try {
                                            open(
                                                "preview",
                                                await api(
                                                    null,
                                                    `/api/admin/crm?prescription=${r.id}`
                                                )
                                            );
                                        } catch (e) {
                                            setError(e.message);
                                        } finally {
                                            setWorking(false);
                                        }
                                    }}
                                >
                                    Visualizar
                                </button>
                                <button
                                    className={styles.secondary}
                                    disabled={working}
                                    onClick={() => download(r.id)}
                                >
                                    <FiDownload /> Baixar PDF
                                </button>
                            </div>
                        </article>
                    ))}
                </>
            )}
            {modal && (
                <CareDialog
                    key={`${modal.kind}-${modal.record.id || "new"}`}
                    modal={modal}
                    data={data}
                    patientId={patientId}
                    Drawer={Drawer}
                    busy={working}
                    error={error || globalError}
                    onClose={() => {
                        if (!working) {
                            setModal(null);
                            setError("");
                        }
                    }}
                    onSave={save}
                    onDownload={download}
                />
            )}
        </div>
    );
}
function CareDialog({
    modal,
    data,
    patientId,
    Drawer,
    busy,
    error,
    onClose,
    onSave,
    onDownload
}) {
    const kind = modal.kind;
    const [record, setRecord] = useState(() => ({
        name: "",
        brand: "",
        unit: "ml",
        image: null,
        image_source: "",
        date: today(),
        title: "Receita e plano de cuidado",
        conduct: "",
        doctor: "Dra. Lorraine Souza",
        registration: "CRM-SP 218676",
        qualification: "",
        items: [],
        ...modal.record
    }));
    const [cost, setCost] = useState("");
    const [formError, setFormError] = useState("");
    const [pendingPhotos, setPendingPhotos] = useState(0);
    const photoBusy = (delta) => setPendingPhotos((n) => n + delta);
    const change = (key, value) => setRecord((s) => ({ ...s, [key]: value }));
    const field = (key) => ({
        value: record[key] ?? "",
        onChange: (e) => change(key, e.target.value),
        onInput: (e) => change(key, e.target.value)
    });
    const appointments = data.appointments
        .filter(
            (a) =>
                a.status === "Realizado" &&
                (!patientId || a.patient_id === patientId)
        )
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    const selected = data.appointments.find(
        (a) => a.id === record.appointment_id
    );
    const patient = data.patients.find((p) => p.id === selected?.patient_id);
    const titles = {
        product: record.id ? "Editar produto" : "Novo produto",
        purchase: "Registrar compra",
        prescription: "Nova receita",
        preview: "Receita do paciente"
    };
    const updateItem = (index, changes) =>
        setRecord((s) => ({
            ...s,
            items: s.items.map((r, i) =>
                i === index ? { ...r, ...changes } : r
            )
        }));
    return (
        <Drawer
            title={titles[kind]}
            subtitle={
                kind === "prescription"
                    ? "Revise os produtos e a conduta antes de emitir."
                    : "Um registro para acompanhar com cuidado."
            }
            onClose={onClose}
        >
            {kind === "preview" ? (
                <>
                    <div className={styles.formScroll}>
                        <div className={styles.prescriptionPreview}>
                            <span className={styles.eyebrow}>
                                {record.doctor} · {record.registration}
                            </span>
                            {record.qualification && (
                                <small>{record.qualification}</small>
                            )}
                            <h2>{record.title}</h2>
                            <p>
                                Para {record.patient_name} ·{" "}
                                {dateLabel(record.date)}
                            </p>
                            {record.items.map((item, i) => (
                                <div className={styles.rxProduct} key={i}>
                                    <ProductPhoto
                                        image={item.image}
                                        name={item.name}
                                    />
                                    <div>
                                        <h3>
                                            {i + 1}. {item.name}
                                        </h3>
                                        <p>{item.instructions}</p>
                                    </div>
                                </div>
                            ))}
                            <h3>Conduta e orientações</h3>
                            <p className={styles.preLine}>{record.conduct}</p>
                            <small>Documento sem assinatura digital.</small>
                        </div>
                    </div>
                    <footer className={styles.editorFooter}>
                        {(error || formError) && (
                            <p role="alert" className={styles.error}>
                                {error || formError}
                            </p>
                        )}
                        <button
                            className={styles.primary}
                            disabled={busy}
                            onClick={() => onDownload(record.id)}
                        >
                            <FiDownload /> Baixar PDF
                        </button>
                    </footer>
                </>
            ) : (
                <form
                    className={styles.editorForm}
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (pendingPhotos) return;
                        onSave(
                            kind,
                            kind === "purchase"
                                ? {
                                      ...record,
                                      cost_cents: Math.round(Number(cost) * 100)
                                  }
                                : record
                        );
                    }}
                >
                    <fieldset className={styles.careFieldset} disabled={busy}>
                        <div className={styles.formScroll}>
                            <div className={styles.careFields}>
                                {kind === "product" && (
                                    <>
                                        <Field label="Nome do produto *">
                                            <input
                                                {...field("name")}
                                                required
                                                maxLength={160}
                                            />
                                        </Field>
                                        <Field label="Marca">
                                            <input
                                                {...field("brand")}
                                                maxLength={120}
                                            />
                                        </Field>
                                        <Field label="Unidade de controle *">
                                            <select {...field("unit")}>
                                                {UNITS.map((u) => (
                                                    <option key={u}>{u}</option>
                                                ))}
                                            </select>
                                            <small>
                                                Use a mesma unidade para a
                                                compra e o consumo. Ex.: frasco
                                                de 30 ml = compra de 30 ml.
                                            </small>
                                        </Field>
                                        <PhotoInput
                                            value={record.image}
                                            source={record.image_source}
                                            onBusy={photoBusy}
                                            onChange={(image, image_source) =>
                                                setRecord((s) => ({
                                                    ...s,
                                                    image,
                                                    image_source
                                                }))
                                            }
                                        />
                                    </>
                                )}
                                {kind === "purchase" && (
                                    <>
                                        <Field label="Produto">
                                            <select
                                                {...field("product_id")}
                                                required
                                            >
                                                <option value="">
                                                    Selecione
                                                </option>
                                                {(data.products || []).map(
                                                    (p) => (
                                                        <option
                                                            key={p.id}
                                                            value={p.id}
                                                        >
                                                            {p.name} ({p.unit})
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </Field>
                                        <Field
                                            label={`Quantidade total (${
                                                data.products?.find(
                                                    (p) =>
                                                        p.id ===
                                                        record.product_id
                                                )?.unit || "unidade cadastrada"
                                            }) *`}
                                        >
                                            <input
                                                type="number"
                                                min="0.001"
                                                max="1000000"
                                                step="0.001"
                                                required
                                                {...field("quantity")}
                                            />
                                        </Field>
                                        <Field label="Custo total da compra (R$) *">
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                max="1000000"
                                                required
                                                value={cost}
                                                onChange={(e) =>
                                                    setCost(e.target.value)
                                                }
                                            />
                                            <small>
                                                Informe o total pago pelo lote,
                                                incluindo os gastos que deseja
                                                distribuir.
                                            </small>
                                        </Field>
                                        <Field label="Data da compra *">
                                            <input
                                                type="date"
                                                {...field("purchased_on")}
                                                max={today()}
                                                required
                                            />
                                        </Field>
                                        <Field label="Código do lote">
                                            <input
                                                {...field("lot")}
                                                maxLength={100}
                                            />
                                        </Field>
                                        <Field label="Validade">
                                            <input
                                                type="date"
                                                min={
                                                    record.purchased_on ||
                                                    undefined
                                                }
                                                {...field("expires_on")}
                                            />
                                        </Field>
                                        <p className={styles.notice}>
                                            Compras ficam no histórico. Confira
                                            quantidade e custo antes de
                                            registrar.
                                        </p>
                                    </>
                                )}
                                {kind === "prescription" && (
                                    <>
                                        <Field label="Atendimento realizado *">
                                            <select
                                                {...field("appointment_id")}
                                                required
                                            >
                                                <option value="">
                                                    Selecione o atendimento
                                                </option>
                                                {appointments.map((a) => (
                                                    <option
                                                        value={a.id}
                                                        key={a.id}
                                                    >
                                                        {
                                                            data.patients.find(
                                                                (p) =>
                                                                    p.id ===
                                                                    a.patient_id
                                                            )?.name
                                                        }{" "}
                                                        · {dateLabel(a.date)} ·{" "}
                                                        {a.procedure} ·{" "}
                                                        {a.modality}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>
                                        {!appointments.length && (
                                            <p className={styles.notice}>
                                                Registre um atendimento com
                                                status Realizado antes de emitir
                                                uma receita.
                                            </p>
                                        )}
                                        {patient && (
                                            <p>
                                                Paciente:{" "}
                                                <strong>{patient.name}</strong>
                                            </p>
                                        )}
                                        <Field label="Título *">
                                            <input
                                                {...field("title")}
                                                required
                                                maxLength={160}
                                            />
                                        </Field>
                                        <Field label="Data de emissão *">
                                            <input
                                                type="date"
                                                {...field("date")}
                                                min={
                                                    selected?.date || undefined
                                                }
                                                max={today()}
                                                required
                                            />
                                        </Field>
                                        <h3>Produtos prescritos</h3>
                                        <p>
                                            Escolha no catálogo ou escreva um
                                            produto. Prescrever não dá baixa no
                                            estoque.
                                        </p>
                                        {record.items.map((item, index) => (
                                            <section
                                                key={index}
                                                className={styles.rxItem}
                                            >
                                                <div
                                                    className={
                                                        styles.headingActions
                                                    }
                                                >
                                                    <h3>Produto {index + 1}</h3>
                                                    <button
                                                        type="button"
                                                        className={
                                                            styles.iconButton
                                                        }
                                                        disabled={
                                                            pendingPhotos > 0
                                                        }
                                                        aria-label={`Remover produto ${
                                                            index + 1
                                                        }`}
                                                        onClick={() =>
                                                            change(
                                                                "items",
                                                                record.items.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                                <Field label="Usar produto do catálogo">
                                                    <select
                                                        value={
                                                            item.product_id ||
                                                            ""
                                                        }
                                                        disabled={
                                                            pendingPhotos > 0
                                                        }
                                                        onChange={async (e) => {
                                                            const productId =
                                                                e.target.value;
                                                            if (!productId) {
                                                                updateItem(
                                                                    index,
                                                                    {
                                                                        product_id:
                                                                            null
                                                                    }
                                                                );
                                                                return;
                                                            }
                                                            setPendingPhotos(
                                                                (n) => n + 1
                                                            );
                                                            setFormError("");
                                                            try {
                                                                const p =
                                                                    await api(
                                                                        null,
                                                                        `/api/admin/crm?product=${encodeURIComponent(
                                                                            productId
                                                                        )}`
                                                                    );
                                                                updateItem(
                                                                    index,
                                                                    {
                                                                        product_id:
                                                                            p.id,
                                                                        name: p.name,
                                                                        image: p.image,
                                                                        image_source:
                                                                            p.image_source
                                                                    }
                                                                );
                                                            } catch (e) {
                                                                setFormError(
                                                                    e.message
                                                                );
                                                            } finally {
                                                                setPendingPhotos(
                                                                    (n) => n - 1
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <option value="">
                                                            Produto escrito
                                                            manualmente
                                                        </option>
                                                        {(
                                                            data.products || []
                                                        ).map((p) => (
                                                            <option
                                                                key={p.id}
                                                                value={p.id}
                                                            >
                                                                {p.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </Field>
                                                <Field label="Produto e apresentação *">
                                                    <input
                                                        required
                                                        maxLength={160}
                                                        value={item.name}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                name: e.target
                                                                    .value
                                                            })
                                                        }
                                                    />
                                                </Field>
                                                <Field label="Modo de uso, frequência e duração *">
                                                    <textarea
                                                        required
                                                        rows={4}
                                                        maxLength={2000}
                                                        value={
                                                            item.instructions
                                                        }
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                instructions:
                                                                    e.target
                                                                        .value
                                                            })
                                                        }
                                                    />
                                                </Field>
                                                <PhotoInput
                                                    value={item.image}
                                                    source={item.image_source}
                                                    onBusy={photoBusy}
                                                    onChange={(
                                                        image,
                                                        image_source
                                                    ) =>
                                                        updateItem(index, {
                                                            image,
                                                            image_source
                                                        })
                                                    }
                                                />
                                            </section>
                                        ))}
                                        <button
                                            type="button"
                                            className={styles.secondary}
                                            disabled={record.items.length >= 20}
                                            onClick={() =>
                                                change("items", [
                                                    ...record.items,
                                                    {
                                                        product_id: null,
                                                        name: "",
                                                        instructions: "",
                                                        image: null,
                                                        image_source: ""
                                                    }
                                                ])
                                            }
                                        >
                                            <FiPlus /> Adicionar produto
                                        </button>
                                        <Field label="Conduta e orientações ao paciente *">
                                            <textarea
                                                rows={7}
                                                maxLength={12000}
                                                {...field("conduct")}
                                                required
                                                placeholder="Descreva os cuidados, a rotina e o acompanhamento…"
                                            />
                                        </Field>
                                        <Field label="Médica responsável *">
                                            <input
                                                {...field("doctor")}
                                                required
                                                maxLength={160}
                                            />
                                        </Field>
                                        <Field label="CRM / UF *">
                                            <input
                                                {...field("registration")}
                                                required
                                                maxLength={120}
                                            />
                                        </Field>
                                        <Field label="RQE (se aplicável)">
                                            <input
                                                {...field("qualification")}
                                                maxLength={120}
                                            />
                                        </Field>
                                        <div className={styles.notice}>
                                            A emissão salva uma cópia dos textos
                                            e fotos. Para corrigir, emita uma
                                            nova receita. O PDF é gerado sem
                                            assinatura digital.
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </fieldset>
                    <footer className={styles.editorFooter}>
                        {(error || formError) && (
                            <p role="alert" className={styles.error}>
                                {error || formError}
                            </p>
                        )}
                        <div className={styles.formFooter}>
                            <button
                                type="button"
                                className={styles.secondary}
                                disabled={busy}
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <button
                                className={styles.primary}
                                disabled={
                                    busy ||
                                    pendingPhotos > 0 ||
                                    (kind === "prescription" &&
                                        !appointments.length)
                                }
                            >
                                {busy
                                    ? "Salvando…"
                                    : kind === "prescription"
                                    ? "Emitir receita"
                                    : "Salvar registro"}
                            </button>
                        </div>
                    </footer>
                </form>
            )}
        </Drawer>
    );
}
