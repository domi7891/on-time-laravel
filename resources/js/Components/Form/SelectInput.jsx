import React, { useEffect, useRef } from "react";

function SelectInput({
    type = "text",
    title,
    name,
    value,
    selectName,
    selectValue,
    selectTitle,
    selectDisable = false,
    placeholder,
    containerClass,
    inputClass,
    selectClass,
    labelClass,
    required,
    isFocused,
    handleChange = () => {},
    handleKeyDown = () => {},
    handleSelectChange = () => {},
    autoComplete = "off",
    children,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className={containerClass}>
            <label
                htmlFor={name}
                className={`block text-sm font-medium text-gray-600 ${labelClass} ${
                    required ? "after:content-['*'] after:text-red-400" : ""
                } `}
            >
                {title}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor={selectName} className="sr-only">
                        {selectTitle}
                    </label>
                    <select
                        disabled={selectDisable}
                        name={selectName}
                        id={selectName}
                        // defaultValue={selectValue}
                        value={selectValue}
                        onChange={(e) => handleSelectChange(e)}
                        className={`disabled:cursor-default cursor-pointer focus:border-accent-400/50 focus:ring focus:ring-accent-400 focus:ring-opacity-25 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md text-ellipsis max-w-[125px] sm:max-w-none ${selectClass}`}
                    >
                        {children}
                    </select>
                    <div className="w-px h-full bg-gray-300"></div>
                </div>
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    className={`focus:border-accent-400/50 focus:ring focus:ring-accent-400 focus:ring-opacity-25 block w-full pl-[136px] pr-5 sm:text-sm border-gray-300 rounded-md ${inputClass}`}
                    placeholder={placeholder}
                    ref={input}
                    autoComplete={autoComplete}
                    required={required}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
            </div>
        </div>
    );
}

export default SelectInput;
