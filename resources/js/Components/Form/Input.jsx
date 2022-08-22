import React, { useEffect, useRef } from "react";

export default function Input({
    type = "text",
    title,
    name,
    value,
    placeholder,
    containerClass,
    inputClass,
    labelClass,
    autoComplete,
    required,
    isFocused,
    handleChange = () => {},
    children,
    hasAddon = false,
    addonText,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className={`flex flex-col-reverse items-start ${containerClass}`}>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                className={
                    `peer border-gray-300 focus:border-accent-400/50 focus:ring focus:ring-accent-400 focus:ring-opacity-25 rounded-md shadow-sm block w-full mt-1 sm:text-sm ` +
                    inputClass
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
            <label
                htmlFor={name}
                className={
                    `block font-medium text-sm text-gray-600 peer-required:after:content-['*'] peer-required:after:text-red-400 ` +
                    labelClass
                }
            >
                {title ? title : children}
            </label>
        </div>
    );
}
