import { hasColor } from "@/utils/helpers";
import React from "react";

function Material({
    title,
    img,
    name,
    color,
    type,
    imgStyle = "",
    imgContainerStyle = "",
    handleChange = () => {},
    current,
}) {
    const isChecked = title == current;
    return (
        hasColor(type, title, color) && (
            <label
                htmlFor={name}
                className={`rounded relative h-[75px] min-w-[100px] w-[100px] sm:w-[125px] sm:min-w-[125px] sm:h-[85px] cursor-pointer overflow-hidden`}
            >
                <input
                    id={name}
                    type="radio"
                    name="material"
                    className="sr-only peer"
                    onChange={() => handleChange(title)}
                    defaultChecked={isChecked}
                />
                <div
                    title={title}
                    className={`w-full h-full peer-focus-visible:border peer-focus-visible:p-1 border-accent-400 after:absolute after:left-0 after:w-full ${
                        title == "Draht" || title == "Kunststoff"
                            ? "after:bg-gray-900/60"
                            : "after:bg-gray-400/40"
                    } after:h-full after:transform after:scale-y-0 after:origin-bottom after:transition-transform after:duration-700 after:top-0 before:absolute before:h-full before:w-full before:left-0 before:top-0 before:content-[attr(title)] before:flex before:items-center before:justify-center before:text-white before:z-10 before:opacity-0 before:transform before:translate-y-5 hover:before:translate-y-0 hover:before:opacity-100 before:transition before:duration-700 ${
                        isChecked &&
                        "after:scale-y-100 before:translate-y-0 before:opacity-100"
                    }`}
                >
                    <div
                        className={`relative h-full ${imgContainerStyle} overflow-hidden`}
                    >
                        <img
                            className={`absolute object-cover ${imgStyle} z-0`}
                            src={`/images/products/${img}`}
                            alt={`${type} ${title}`}
                        />
                    </div>
                </div>
            </label>
        )
    );
}

export default Material;
