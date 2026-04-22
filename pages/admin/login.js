import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Stand-alone page (no Layout wrapper) — the marketing nav doesn't belong
// on an internal admin login screen.

export default function AdminLogin() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const next =
        typeof router.query.next === "string"
            ? router.query.next
            : "/admin/consultas";

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const r = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });
            if (!r.ok) {
                const body = await r.json().catch(() => ({}));
                setError(body.error || "Não foi possível entrar.");
                return;
            }
            router.push(next);
        } catch {
            setError("Erro de rede. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Admin · Dra. Lorraine Souza</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <main className="min-h-screen bg-[#FAF6F0] text-[#1C1917] flex items-center justify-center px-4">
                <div className="w-full max-w-sm">
                    <div className="text-xs uppercase tracking-[0.28em] text-[#9A4639] font-medium mb-5 text-center">
                        Área Restrita
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-light leading-[1.1] tracking-[-0.02em] mb-3 text-center text-balance">
                        Entrar no{" "}
                        <span className="italic text-[#9A4639]">painel</span>.
                    </h1>
                    <p className="text-center text-sm text-[#57534E] leading-relaxed mb-10">
                        Acesso exclusivo para a equipe da Dra. Lorraine.
                    </p>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-[0.24em] text-[#57534E] font-medium mb-3">
                                Senha
                            </label>
                            <input
                                type="password"
                                autoFocus
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b border-[#E7E2D9] focus:border-[#9A4639] outline-none py-3 text-base text-[#1C1917] placeholder:text-[#B8AFA3] transition-colors"
                                placeholder="••••••••••"
                            />
                        </div>

                        {error && (
                            <div className="text-sm text-[#9A4639] flex items-start gap-2">
                                <span aria-hidden="true">—</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="w-full bg-[#1C1917] hover:bg-[#9A4639] disabled:opacity-50 disabled:hover:bg-[#1C1917] text-[#FAF6F0] text-sm uppercase tracking-[0.28em] font-medium py-4 transition-colors"
                        >
                            {loading ? "Verificando…" : "Entrar"}
                        </button>
                    </form>

                    <p className="mt-12 text-center text-xs uppercase tracking-[0.24em] text-[#57534E]/70 font-medium">
                        Sessão válida por 24h
                    </p>
                </div>
            </main>
        </>
    );
}
