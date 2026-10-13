import { useState } from "react";
import Head from "next/head";
import { Logo, Monogram } from "@components/Logo";
import { currentUser } from "@utils/crm/auth.mjs";
import { isDemo, privateHeaders, safeNext } from "@utils/crm/runtime.mjs";
import styles from "@components/CRM/CRM.module.scss";
export async function getServerSideProps(ctx) {
    privateHeaders(ctx.res);
    const adminHost =
        ctx.req.headers.host ===
        new URL(process.env.ADMIN_SITE_URL || "https://admin.dralorraine.com")
            .host;
    let user;
    try {
        user = await currentUser(ctx.req, ctx.res);
    } catch {}
    if (user)
        return {
            redirect: {
                destination: adminHost ? "/" : "/admin",
                permanent: false
            }
        };
    return {
        props: { demo: isDemo(), adminHost, nextPath: safeNext(ctx.query.next) }
    };
}
export default function Login({ demo, adminHost, nextPath }) {
    const [email, setEmail] = useState(demo ? "alan@example.test" : ""),
        [code, setCode] = useState(""),
        [sent, setSent] = useState(false),
        [demoCode, setDemoCode] = useState(null),
        [busy, setBusy] = useState(false),
        [error, setError] = useState("");
    async function submit(event, action = sent ? "verify" : "send") {
        event.preventDefault();
        setBusy(true);
        setError("");
        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code, action })
            });
            const body = await response.json();
            if (!response.ok) throw new Error(body.error);
            if (action === "send") {
                setSent(true);
                setDemoCode(body.demoCode || null);
            } else
                window.location.assign(
                    adminHost
                        ? nextPath.replace(/^\/admin/, "") || "/"
                        : nextPath
                );
        } catch (e) {
            setError(e.message || "Não foi possível entrar.");
        } finally {
            setBusy(false);
        }
    }
    return (
        <main className={`${styles.root} ${styles.login}`}>
            <Head>
                <title>Acesso · Lorraine CRM</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <section className={styles.loginEditorial}>
                <Logo lockup="horizontal" />
                <div>
                    <span className={styles.eyebrow}>
                        UM CUIDADO QUE CONTINUA
                    </span>
                    <h1>
                        Cada paciente,
                        <br />
                        uma <em>história.</em>
                    </h1>
                    <p>
                        Um espaço para acompanhar relações,
                        <br />
                        organizar atendimentos e cuidar do próximo passo.
                    </p>
                </div>
                <span className={styles.small}>
                    LORRAINE SOUZA · ÁREA PRIVADA
                </span>
            </section>
            <section className={styles.loginForm}>
                <Monogram className="h-16 w-auto" />
                <div>
                    <span className={styles.eyebrow}>ACESSO RESTRITO</span>
                    <h2>
                        {sent ? "Confira seu e-mail." : "Bem-vindo ao CRM."}
                    </h2>
                    <p>
                        {sent
                            ? "Se este e-mail tem acesso, enviamos um código de seis dígitos. Ele é pessoal e expira em poucos minutos."
                            : "Entre com seu e-mail autorizado. Você receberá um código, sem precisar de senha."}
                    </p>
                </div>
                <form onSubmit={submit}>
                    <label className={styles.field}>
                        Seu e-mail
                        <input
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={sent || busy}
                            required
                            maxLength={200}
                        />
                    </label>
                    {sent && (
                        <label className={styles.field}>
                            Código de acesso
                            <input
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                pattern="[0-9]{6}"
                                maxLength={6}
                                value={code}
                                onChange={(e) =>
                                    setCode(e.target.value.replace(/\D/g, ""))
                                }
                                autoFocus
                                required
                                placeholder="000000"
                            />
                        </label>
                    )}
                    {error && (
                        <p role="alert" className={styles.error}>
                            {error}
                        </p>
                    )}
                    {demoCode && (
                        <div className={styles.notice}>
                            Caixa de entrada de demonstração · código{" "}
                            <strong>{demoCode}</strong>
                            <br />
                            Disponível apenas neste servidor local.
                        </div>
                    )}
                    <button className={styles.primary} disabled={busy}>
                        {busy
                            ? "Aguarde…"
                            : sent
                            ? "Entrar no CRM →"
                            : "Receber código por e-mail →"}
                    </button>
                    {sent && (
                        <div className={styles.inlineActions}>
                            <button
                                type="button"
                                disabled={busy}
                                onClick={(e) => submit(e, "send")}
                            >
                                Reenviar código
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setSent(false);
                                    setCode("");
                                    setDemoCode(null);
                                    setError("");
                                }}
                            >
                                Usar outro e-mail
                            </button>
                        </div>
                    )}
                </form>
                {demo && (
                    <p className={styles.notice}>
                        Demonstração local com pacientes fictícios.
                        <br />
                        Contas: alan@example.test e lorraine@example.test.
                    </p>
                )}
                <p className={styles.small}>
                    Uso exclusivo de Lorraine e Alan.
                </p>
            </section>
        </main>
    );
}
Login.isCRM = true;
