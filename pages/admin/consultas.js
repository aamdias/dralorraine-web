export async function getServerSideProps(ctx) {
    const clean =
        ctx.req.headers.host ===
        new URL(process.env.ADMIN_SITE_URL || "https://admin.dralorraine.com")
            .host;
    const query =
        typeof ctx.query.consulta === "string"
            ? `?consulta=${encodeURIComponent(ctx.query.consulta)}`
            : "";
    return {
        redirect: {
            destination: `${clean ? "" : "/admin"}/online${query}`,
            permanent: false
        }
    };
}
export default function LegacyConsultas() {
    return null;
}
LegacyConsultas.isCRM = true;
