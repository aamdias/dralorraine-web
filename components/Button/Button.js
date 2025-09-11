import { Icon } from "@iconify/react";
import Link from "next/link";
import clsx from "clsx";

const ButtonVariant = {
    primary: "btn--primary",
    secondary: "btn--secondary",
    outline: "btn--outline",
    black: "btn--black"
};

export const Button = ({
    children,
    icon,
    href = "",
    type = "link",
    variant = "primary",
    className = "",
    asButton = false,  // New prop to force button rendering
    onClick // Add onClick prop
}) => {
    // Determine the correct element type to render
    const Element = type === "button" || asButton ? "button" : Link;
    const variantClass = ButtonVariant[variant];
    const buttonClass = clsx("btn", variantClass, className);

    // Use <button> or <a> tag based on the Element resolved
    if (Element === "button") {
        return (
            <button className={buttonClass} type="button" onClick={onClick}>
                {children}
                {icon && <Icon icon={icon} />}
            </button>
        );
    } else {
        return (
            <Link 
                href={href} 
                role="button" 
                className={buttonClass}
                onClick={(e) => {
                    if (onClick) {
                        onClick(e);
                    }
                }}
            >
                {children}
                {icon && <Icon icon={icon} />}
            </Link>
        );
    }
};
