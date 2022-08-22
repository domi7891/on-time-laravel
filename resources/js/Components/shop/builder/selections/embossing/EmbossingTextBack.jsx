import Hint from "@/Components/Hint";
import Spacer from "@/Components/shop/Spacer";
import React from "react";

function EmbossingTextBack() {
    return (
        <div className="w-full space-y-2">
            <div className="text-left flex flex-col -space-y-0.5">
                <div className="flex gap-4 items-start relative">
                    <h3 className="text-left text-xl">
                        Prägedetails Buchrücken
                    </h3>
                    <Hint placement="auto">
                        <div className="">
                            <p className="text-sm text-left w-[270px]">
                                Bitte die Prägevorschau beachten.
                            </p>
                            <p className="text-sm text-left w-[270px]">
                                Bitte beachten Sie die erlaubten Zeichen.
                                Klicken Sie auf{" "}
                                <a
                                    className="underline hover:text-accent-400 transition-colors duration-300"
                                    target="_blank"
                                    href="/downloads/Ziffern_Zeichen_DE_Standard_5_5mm.pdf"
                                >
                                    5.5mm
                                </a>{" "}
                                um diese zu sehen.
                            </p>
                        </div>
                    </Hint>
                </div>
            </div>
            <Spacer />
            <div className="pt-2 space-y-3 pl-2 overflow-x-auto"></div>
        </div>
    );
}

export default EmbossingTextBack;
