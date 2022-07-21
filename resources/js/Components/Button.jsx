import React from "react";

export default function Button({
    type = "submit",
    className = "",
    disabled,
    children,
    onClick,
}) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center justify-center px-4 py-2 bg-accent-400 border border-transparent rounded-md font-semibold text-sm text-black tracking-widest transition ease-in-out duration-150 ${
                    disabled
                        ? " opacity-25"
                        : "hover:bg-accent-800 active:bg-accent-800 hover:text-white active:text-white"
                } ` + className
            }
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
