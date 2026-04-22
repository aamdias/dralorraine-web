/**
 * Dra. Lorraine Souza wordmark — "L·S·S"
 *
 * Editorial typographic mark. Inline SVG so the <text> glyphs
 * pick up Inter from the page's stylesheet (fonts on external
 * .svg files don't inherit from the host document).
 *
 * Usage:
 *   <Logo />                     // dark text, default
 *   <Logo variant="light" />     // cream text for dark backgrounds
 *   <Logo className="h-8" />     // size via className (CSS height)
 */
export const Logo = ({
    variant = "dark",
    className = "h-6 w-auto",
    ariaLabel = "Dra. Lorraine Souza"
}) => {
    const ink = variant === "light" ? "#FAF6F0" : "#1C1917";
    const accent = variant === "light" ? "#E4B5AC" : "#9A4639";

    return (
        <svg
            viewBox="0 0 108 32"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label={ariaLabel}
            className={className}
        >
            <g
                style={{
                    fontFamily:
                        "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
                    fontWeight: 300,
                    fontSize: "24px",
                    letterSpacing: "0.02em"
                }}
                fill={ink}
            >
                <text x="3" y="23">L</text>
                <text x="34" y="23">S</text>
                <text x="68" y="23">S</text>
            </g>
            <circle cx="24" cy="20" r="1.6" fill={accent} />
            <circle cx="58" cy="20" r="1.6" fill={accent} />
            <circle cx="92" cy="20" r="1.6" fill={accent} />
        </svg>
    );
};
