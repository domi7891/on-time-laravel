import ProductContext from "@/Components/context/ProductContext";
import Dropdown from "@/Components/Form/Dropdown";
import Input from "@/Components/Form/Input";
import SelectInput from "@/Components/Form/SelectInput";
import Hint from "@/Components/Hint";
import Spacer from "@/Components/shop/Spacer";
import { ALLOWED_KEYS } from "@/utils/constants";
import React, { useContext } from "react";

const arr = [
    "Rechtsbündig",
    "Linksbündig",
    "Links- und Rechtsbündig",
    "Linksbündig mit 5cm Abstand",
    "Zentriert",
];

function EmbossingTextBack() {
    const { product, changeEmbossingBack } = useContext(ProductContext);

    const changeBackPosition = (position) => {
        changeEmbossingBack({ position });
    };

    const handleKeyDown = (e) => {
        if (!ALLOWED_KEYS["5.5mm"].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleChange = (e, key) => {
        let text = e.target.value;
        changeEmbossingBack({ [key]: text });
    };

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
            <div className="pt-2 space-y-5">
                <div className="relative text-left w-full">
                    <p className="block text-base font-medium text-gray-600 mb-0.5">
                        Position
                    </p>
                    <Dropdown
                        contentClasses="flex flex-col divide-y"
                        buttonClasses="w-full xs:w-auto"
                        width="20"
                        maxHeight="40"
                        childArray={arr}
                        change={(pos) => changeBackPosition(pos)}
                    >
                        <Dropdown.Trigger className="py-1 w-full xs:min-w-[260px]">
                            <span>
                                {product.embossing_options.back_text.position}
                            </span>
                        </Dropdown.Trigger>
                    </Dropdown>
                </div>
                {product.embossing_options.back_text.position ==
                "Links- und Rechtsbündig" ? (
                    <div className="space-y-2">
                        <SelectInput
                            containerClass="w-full sm:w-2/3 md:w-1/2 lg:w-full xl:w-2/3"
                            type="text"
                            inputClass="pl-[115px] min-w-[250px]"
                            name="emb_back_left"
                            value={product.embossing_options.back_text.left}
                            selectClass="w-[105px] pr-0 bg-none text-black opacity-100"
                            selectValue="Text"
                            selectDisable={true}
                            placeholder="... z.B.: Diplomarbeit"
                            handleKeyDown={(e) => handleKeyDown(e)}
                            handleChange={(e) => handleChange(e, "left")}
                            // handleSelectChange={(e) => handleSelectChange(e, key)}
                        >
                            <option value="Linksbündig">Linksbündig</option>
                        </SelectInput>
                        <SelectInput
                            containerClass="w-full sm:w-2/3 md:w-1/2 lg:w-full xl:w-2/3"
                            type="text"
                            inputClass="pl-[115px] min-w-[250px]"
                            name="emb_back_right"
                            value={product.embossing_options.back_text.right}
                            selectClass="w-[105px] pr-0 bg-none text-black opacity-100"
                            selectValue="Text"
                            selectDisable={true}
                            placeholder="... z.B.: Diplomarbeit"
                            handleKeyDown={(e) => handleKeyDown(e)}
                            handleChange={(e) => handleChange(e, "right")}
                            // handleSelectChange={(e) => handleSelectChange(e, key)}
                        >
                            <option value="Rechtsbündig">Rechtsbündig</option>
                        </SelectInput>
                    </div>
                ) : (
                    <SelectInput
                        containerClass="w-full sm:w-2/3 md:w-1/2 lg:w-full xl:w-2/3"
                        type="text"
                        inputClass="pl-[60px] min-w-[250px]"
                        name="emb_back_text"
                        value={product.embossing_options.back_text.text}
                        selectClass="bg-none text-black pr-2 opacity-100"
                        selectValue="Text"
                        selectDisable={true}
                        placeholder="... z.B.: Diplomarbeit"
                        handleKeyDown={(e) => handleKeyDown(e)}
                        handleChange={(e) => handleChange(e, "text")}
                        // handleSelectChange={(e) => handleSelectChange(e, key)}
                    >
                        <option value="Text">Text</option>
                    </SelectInput>
                )}
            </div>
        </div>
    );
}

export default EmbossingTextBack;
