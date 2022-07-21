import React from "react";
import Spacer from "../Spacer";

function WeightSelection() {
    return (
        <div className="w-full space-y-2">
            <h3 className="text-left text-xl">Farbe der Bindung</h3>
            <Spacer className="xs:via-gray-300/30 xs:to-transparent" />

            <div
                className={`w-full flex justify-start gap-3 sm:gap-5 overflow-x-auto`}
            ></div>
        </div>
    );
}

export default WeightSelection;
