import React, { useEffect, useState } from "react";

function Type({
    title,
    name,
    current,
    handleChange = () => {},
    disabled = false,
}) {
    const calcOrigin = (old) => {
        return title == "Hardcover"
            ? "after:origin-right"
            : title == "Spiralbindung"
            ? "after:origin-left"
            : current == "Hardcover"
            ? "after:origin-left"
            : current == "Spiralbindung"
            ? "after:origin-right"
            : current == "Softcover"
            ? old ?? "after:origin-left"
            : "after:origin-left";
    };

    const [origin, setOrigin] = useState(calcOrigin());
    const isChecked = title == current;

    useEffect(() => {
        setOrigin((old) => calcOrigin(old));
    }, [current, calcOrigin]);

    return (
        <label className="relative min-w-fit p-1 cursor-pointer" htmlFor={name}>
            <input
                id={name}
                type="radio"
                name="type"
                className="sr-only peer"
                defaultChecked={disabled ? false : isChecked}
                disabled={disabled}
                onChange={(e) => handleChange(title)}
            />
            <div
                className={`p-px relative w-full h-full rounded peer-focus-visible:p-0 peer-focus-visible:border-solid peer-focus-visible:border peer-focus-visible:border-accent-400/50 peer-focus-visible:ring peer-focus-visible:ring-accent-400 peer-focus-visible:ring-opacity-25 after:absolute after:left-0 after:-bottom-0.5 ${origin} after:w-full after:transform after:scale-x-0 after:bg-accent-400 after:h-px after:transition-transform after:duration-500 ${
                    isChecked && "after:scale-x-100"
                }`}
            >
                <span
                    className={`text-base sm:text-lg relative ${
                        disabled ? "text-gray-400" : "text-black"
                    }`}
                >
                    {title}
                </span>
            </div>
        </label>
    );
}

export default Type;
