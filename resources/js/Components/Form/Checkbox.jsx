import React, { useEffect, useState } from "react";

export default function Checkbox({
    id,
    name,
    handleChange = () => {},
    checked = false,
    type = "checkbox",
    title = "Placeholder",
    value = "",
    labelClass = "",
}) {
    return (
        <label
            htmlFor={id}
            className="flex items-center gap-3 cursor-pointer w-fit"
        >
            <div className="flex items-center h-5">
                <input
                    id={id}
                    name={name}
                    checked={checked}
                    value={value}
                    onChange={(e) => handleChange(title, e)}
                    type={type}
                    className="focus:border-solid focus:border focus:border-accent-400/50 focus:ring focus:ring-accent-400 focus:ring-opacity-25 h-4 w-4 text-accent-400 border-gray-300 rounded-full"
                />
            </div>
            <div className="text-left ">
                <span>{title}</span>
            </div>
        </label>
    );
}
