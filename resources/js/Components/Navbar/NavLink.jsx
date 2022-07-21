import React, { useContext, useEffect, useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import NavigationContext from "../context/NavigationContext";

export default function NavLink({
    href,
    image,
    className,
    breakText,
    children,
}) {
    const { currentActive, setCurrentActive } = useContext(NavigationContext);
    const active = currentActive == href;

    return (
        <Link
            preserveState
            href={href}
            className={`text-xs xl:text-[0.9rem] uppercase font-semibold text-black ${
                breakText ? "w-min" : "w-max"
            } text-center`}
            onClick={() => setCurrentActive(href)}
        >
            {image && <div className={className}>{children}</div>}
            {!image && (
                <div
                    className={`relative after:absolute after:h-px after:bg-accent-400 after:-bottom-0.5 after:left-0 after:transition-all after:duration-500 ${
                        active ? "after:w-full " : "after:w-0 "
                    }`}
                >
                    <span className="leading-[1.125rem]">{children}</span>
                </div>
            )}
        </Link>
    );
}
