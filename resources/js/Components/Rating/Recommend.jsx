import React from "react";

function Recommend() {
    return (
        <fieldset>
            <div className="w-min mx-auto sm:mx-0 mt-4 space-x-6 flex items-center">
                <label
                    htmlFor="recommend-yes"
                    className="flex items-center cursor-pointer font-medium text-gray-700"
                >
                    <input
                        id="recommend-yes"
                        name="recommend"
                        type="radio"
                        className="focus:ring-accent-400 h-4 w-4 text-accent-400 border-gray-300 cursor-pointer"
                        defaultChecked={true}
                        value="yes"
                    />
                    <span className="ml-3 ">Ja</span>
                </label>
                <label
                    htmlFor="recommend-no"
                    className="flex items-center cursor-pointer font-medium text-gray-700"
                >
                    <input
                        id="recommend-no"
                        name="recommend"
                        type="radio"
                        value="no"
                        className="focus:ring-accent-400 h-4 w-4 text-accent-400 border-gray-300 cursor-pointer"
                    />
                    <span className="ml-3">Nein</span>
                </label>
            </div>
        </fieldset>
    );
}

export default Recommend;
