import React from "react";

function Toggle({ name, children, checked = false, disabled = false }) {
    return (
        <div className="flex justify-between items-center">
            {children}
            <label
                className={`relative text-xl ${!disabled && "cursor-pointer"}`}
            >
                <input
                    id={name}
                    name={name}
                    type="checkbox"
                    className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md invisible opacity-0"
                    disabled={disabled}
                    defaultChecked={checked}
                />
                <span
                    className={`w-12 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 peer-disabled:bg-opacity-50`}
                ></span>
            </label>
        </div>
    );
}

export default Toggle;
