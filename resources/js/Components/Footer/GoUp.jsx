import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/outline";

function GoUp() {
    const [showArrow, setShowArrow] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    useEffect(() => {
        const handleScroll = (event) => {
            if (window.scrollY <= 10) setShowArrow(false);
            else if (
                window.innerHeight + window.scrollY <=
                document.body.scrollHeight - 5
            ) {
                setShowArrow(true);
                setShowBackground(true);
            } else if (
                window.innerHeight + window.scrollY >
                document.body.scrollHeight - 5
            ) {
                setShowBackground(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
            className={`${
                showArrow ? "opacity-100 visible" : "opacity-0 invisible"
            } ${
                showBackground
                    ? "bg-gray-800/60 text-white"
                    : "bg-transparent text-black"
            } fixed bottom-2 right-2 pl-1 md:pl-3 pr-1.5 py-1 rounded cursor-pointe transition-all duration-300 cursor-pointer flex gap-1 items-center`}
        >
            <span className="hidden md:block font-bold uppercase text-sm">
                Nach Oben
            </span>
            <ChevronUpIcon className="w-8 h-8" />
        </div>
    );
}

export default GoUp;
