import React from "react";
import { CheckIcon } from "@heroicons/react/solid";

function Color({ name, color, current, hex, handleChange }) {
    const isChecked = name == current;
    return (
        <label
            className="relative min-w-fit p-1 cursor-pointer"
            htmlFor={color}
        >
            <input
                id={color}
                type="radio"
                name="color"
                className="sr-only peer"
                defaultChecked={isChecked}
                onChange={(e) => handleChange(name)}
            />
            <div
                className={`grid place-items-center relative w-9 h-9 rounded-full ${
                    color == "white" && "ring-1 ring-gray-400/40"
                } ${
                    isChecked &&
                    "border-2 border-white ring-2 ring-accent-400 child:block"
                } peer-focus-visible:ring-4 peer-focus-visible:ring-accent-400 peer-focus-visible:ring-opacity-40`}
                style={{ backgroundColor: hex }}
            >
                <CheckIcon
                    className={`hidden w-4 h-4 ${
                        color == "white" ? "text-black" : "text-white"
                    }`}
                />
            </div>
        </label>
    );
}

export default Color;
