import { Link } from "@inertiajs/inertia-react";
import React, { useContext } from "react";
import NavigationContext from "./context/NavigationContext";

function CustomLink({ href, className, children }) {
    const { setCurrentActive } = useContext(NavigationContext);
    return (
        <Link
            href={href}
            className={`text-black hover:text-accent-400 transition-colors duration-300 ${className}`}
            onClick={() => setCurrentActive(href)}
        >
            {children}
        </Link>
    );
}

export default CustomLink;
