import React from "react";

function Spacer({ className = "" }) {
    return (
        <div
            className={`w-full h-px bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 sm:via-gray-300/30 sm:to-transparent ${className}`}
        ></div>
    );
}

export default Spacer;
