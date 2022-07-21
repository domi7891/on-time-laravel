import React, { useEffect, useRef } from "react";

function Textarea({
    type = "text",
    title,
    id,
    name,
    value,
    rows,
    cols,
    resize = false,
    placeholder,
    containerClass,
    inputClass,
    labelClass,
    autoComplete,
    required,
    isFocused,
    handleChange = () => {},
    children,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className={`flex flex-col-reverse items-start ${containerClass}`}>
            <textarea
                id={id}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                className={`peer shadow-sm focus:border-accent-400/50 focus:ring focus:ring-accent-400 focus:ring-opacity-25 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md ${
                    !resize ? "resize-none" : ""
                } ${inputClass}`}
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

export default Textarea;
