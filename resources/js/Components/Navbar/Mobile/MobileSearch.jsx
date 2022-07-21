import React, { useEffect } from "react";
import { XIcon } from "@heroicons/react/outline";

function MobileSearch({ isOpen, setIsOpen, setShowSearch }) {
    useEffect(() => {
        setIsOpen(true);
    }, []);

    const closeSearch = () => {
        setIsOpen(false);
        setTimeout(() => setShowSearch(false), 700);
    };
    return (
        <div
            className={`lg:hidden fixed h-screen w-screen top-0 bg-white ${
                isOpen ? "left-0" : "left-full"
            } bottom-0 transition-all duration-700 grid items-center z-10`}
        >
            <button
                className="absolute top-5 right-5 text-gray-600 hover:text-gray-800"
                onClick={() => closeSearch()}
            >
                <XIcon className="w-7 h-7" />
            </button>
            <div className="flex flex-col justify-center items-center gap-4 w-full"></div>
        </div>
    );
}

export default MobileSearch;
