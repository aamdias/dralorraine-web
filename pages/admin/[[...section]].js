import CRM from "@components/CRM/CRM";
import { currentUser } from "@utils/crm/auth.mjs";
import { snapshot } from "@utils/crm/store.mjs";
import { privateHeaders, safeNext } from "@utils/crm/runtime.mjs";

const SECTIONS = [
    "pacientes",
    "atendimentos",
    "retornos",
    "reativacao",
    "aniversarios",
    "ranking",
    "online"
];
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
    if (!user)
        return {
            redirect: {
                destination: `${
                    adminHost ? "/login" : "/admin/login"
                }?next=${encodeURIComponent(
                    safeNext(
                        ctx.resolvedUrl.startsWith("/admin")
                            ? ctx.resolvedUrl
                            : `/admin${
                                  ctx.resolvedUrl === "/" ? "" : ctx.resolvedUrl
                              }`
                    )
                )}`,
                permanent: false
            }
        };
    const parts = ctx.params.section || [];
    if (
        parts.length &&
        (!SECTIONS.includes(parts[0]) ||
            parts.length > 2 ||
            (parts.length === 2 && parts[0] !== "pacientes"))
    )
        return { notFound: true };
    try {
        return {
            props: {
                initialData: await snapshot(user.email),
                user,
                adminHost,
                section: parts[0] || "overview",
                patientId: parts[1] || null,
                error: null
            }
        };
    } catch {
        return {
            props: {
                initialData: {
                    patients: [],
                    appointments: [],
                    intakes: [],
                    demo: false
                },
                user,
                adminHost,
                section: parts[0] || "overview",
                patientId: parts[1] || null,
                error: "Não foi possível carregar o CRM. Verifique a conexão e execute a migração 003_crm.sql."
            }
        };
    }
}
CRM.isCRM = true;
export default CRM;
