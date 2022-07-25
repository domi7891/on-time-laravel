import React, { useEffect, useRef } from "react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";

function NumberInput({
    name,
    value,
    title,
    min = 0,
    max,
    containerClass = "",
    inputClass = "",
    required,
    showStepper = true,
    isFocused,
    handleChange = () => {},
    handleStep = () => {},
    handleBlur = () => {},
    children,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const step = (step) => {
        if (value + step >= min) {
            if (step > 0 && !max) handleStep(step);
            if (step > 0 && max && value + step <= max) handleStep(step);
            if (step < 0) handleStep(step);
        }
    };

    const change = (e) => {
        if (value < min) {
            value = 1;
        }
        if (value > max) value = max;
        if (!isNaN(parseInt(value))) value = parseInt(value);
        else value = 1;

        handleBlur(e, value);
    };

    return (
        <div className={`${containerClass}`}>
            <label htmlFor={name} className="sr-only">
                {title}
            </label>
            <div className="border border-gray-300 rounded-md shadow-sm flex gap-2 items-center py-2 px-2 h-full focus-within:border-solid focus-within:border focus-within:border-accent-400/50 focus-within:ring focus-within:ring-accent-400 focus-within:ring-opacity-25">
                {showStepper && (
                    <button
                        onClick={(e) => step(-1)}
                        className="cursor-pointer"
                    >
                        <MinusSmIcon className="w-4 h-4" />
                    </button>
                )}
                <input
                    type="number"
                    min={min}
                    max={max}
                    id={name}
                    name={name}
                    value={value}
                    className={`w-9 h-full p-0 text-center border-none custom-number-input focus:border-transparent focus:ring-0 ${inputClass}`}
                    ref={input}
                    required={required}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => change(e)}
                />
                {/* <input type="number" style={{ appearance: "none" }} /> */}
                {showStepper && (
                    <button onClick={(e) => step(1)} className="cursor-pointer">
                        <PlusSmIcon className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default NumberInput;
