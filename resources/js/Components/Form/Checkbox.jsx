import React from "react";

export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded border-gray-300 text-accent-400 shadow-sm focus:border-accent-400 focus:ring focus:ring-accent-400/50 focus:ring-opacity-50"
            onChange={(e) => handleChange(e)}
        />
    );
}
