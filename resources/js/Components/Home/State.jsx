import React from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";

function State({ title, subtitle, content }) {
    return (
        <div className="flex flex-col sm:flex-row lg:flex-col sm:gap-8 items-center w-4/5">
            <div className="w-min">
                <CheckCircleIcon className="w-20 h-20 text-accent-400" />
            </div>
            <div className="flex flex-col sm:items-start sm:text-left lg:items-center lg:text-center">
                <h2 className="mt-3 font-bold text-2xl uppercase">{title}</h2>
                <h3 className="mt-0.5 font-semibold text-xl text-gray-800">
                    {subtitle}
                </h3>
                <p className="mt-2 text-base">{content}</p>
            </div>
        </div>
    );
}

export default State;
