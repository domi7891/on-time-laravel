import Hint from "@/Components/Hint";
import React from "react";
import Spacer from "../Spacer";

function PrintSelection() {
    return (
        <div className="w-full space-y-2">
            <div className="text-left flex flex-col -space-y-0.5">
                <div className="flex gap-4 items-start relative">
                    <span className="text-left text-xl">Druck</span>
                    <Hint
                        placement="auto"
                        content="Bitte auch bei doppelseitigem Druck die
                        Gesamtseitenanzahl angeben!"
                    />
                </div>
                <span className="text-left text-sm text-gray-500">
                    - Immer in Farbe -
                </span>
            </div>
            <Spacer className="xs:via-gray-300/30 xs:to-transparent" />

            <div
                className={`w-full flex justify-start gap-3 sm:gap-5 overflow-x-auto`}
            ></div>
        </div>
    );
}

export default PrintSelection;
