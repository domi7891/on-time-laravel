import ProductContext from "@/Components/context/ProductContext";
import SelectInput from "@/Components/Form/SelectInput";
import Hint from "@/Components/Hint";
import Spacer from "@/Components/shop/Spacer";
import { ALLOWED_KEYS } from "@/utils/constants";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/outline";
import React, { useContext, useState } from "react";

function EmbossingTextFront() {
    const { product, changeEmbossingTextMulitple } = useContext(ProductContext);
    const [texts, setTexts] = useState(
        product.embossing_options.text.front_text
    );

    const length = () => Object.keys(texts).length;

    const handleKeyDown = (e, line, size) => {
        if (!ALLOWED_KEYS[size].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const handleChange = (e, line) => {
        let text = product.embossing_options.text.front_text;
        text[line].text = e.target.value;
        changeEmbossingTextMulitple({ front_text: text });
    };

    const handleSelectChange = (e, line) => {
        let text = product.embossing_options.text.front_text;
        text[line] = { text: "", size: e.target.value };
        if (length() > 2) {
            for (let i = 2; i <= length(); i++) {
                text[`${i}. Zeile`].size = e.target.value;
            }
        }
        changeEmbossingTextMulitple({ front_text: text });
    };

    const remove = (line) => {
        let text = product.embossing_options.text.front_text;
        delete text[line];
        changeEmbossingTextMulitple({ front_text: text });
    };

    const addLine = () => {
        const newLine = `${length() + 1}. Zeile`;
        let text = product.embossing_options.text.front_text;
        let size = "9mm";
        if (length() + 1 > 2) {
            size = text["1. Zeile"].size;
            if (length() + 1 > 3) size = "5.5mm";
            for (let i = 1; i <= length(); i++) {
                text[`${i}. Zeile`].size = size;
            }
        }
        text[newLine] = { text: "", size };
        changeEmbossingTextMulitple({ front_text: text });
    };

    return (
        <div className="w-full space-y-2">
            <div className="text-left flex flex-col -space-y-0.5">
                <div className="flex gap-4 items-start relative">
                    <h3 className="text-left text-xl">
                        Prägedetails Vorderseite
                    </h3>
                    <Hint placement="auto">
                        <div className="space-y-2">
                            <p className="text-sm text-left w-[270px]">
                                <b>Tiefenprägung</b>: Der gewünschte Text
                                und/oder Logo werden im Heißprägeverfahren
                                mittels Prägefolien (Silber oder Gold), Wärme
                                und Presskraft vertieft auf die Mappe
                                appleziert.
                            </p>
                            <p className="text-sm text-left w-[270px]">
                                <b>Digitalprägung</b>: Der gewünschte Text
                                und/oder Logo werden mittels digitaler
                                Heißprägung, Prägefolien (Silber oder Gold) und
                                Wärme exakt nach Vorlage flach auf die Mappe
                                gedruckt.
                            </p>
                        </div>
                    </Hint>
                </div>
            </div>
            <Spacer />
            <div className="pt-2 space-y-3 pl-2 overflow-x-auto">
                {Object.entries(texts).map(([key, value], idx) => {
                    console.log(value);
                    return (
                        <div
                            key={idx}
                            className="flex justify-start items-end gap-3 min-w-[275px]"
                        >
                            <SelectInput
                                containerClass="w-full sm:w-2/3 md:w-1/2 lg:w-full xl:w-2/3"
                                title={key}
                                type="text"
                                labelClass="text-left"
                                inputClass="pl-[100px] min-w-[250px]"
                                name={`emb_text_front_${idx}`}
                                value={value.text}
                                selectValue={value.size}
                                selectName={`emb_textsize_front_${idx}`}
                                selectDisable={
                                    (length() > 2 && idx > 0) || length() > 3
                                }
                                placeholder="... z.B.: Diplomarbeit"
                                handleKeyDown={(e) =>
                                    handleKeyDown(e, key, value.size)
                                }
                                handleChange={(e) => handleChange(e, key)}
                                handleSelectChange={(e) =>
                                    handleSelectChange(e, key)
                                }
                            >
                                <option value="5.5mm">5.5 mm</option>
                                <option value="9mm">9mm</option>
                            </SelectInput>
                            {idx > 0 && idx == length() - 1 && (
                                <button
                                    onClick={() => remove(key)}
                                    className="transform -translate-y-1/2"
                                >
                                    <TrashIcon className="cursor-pointer text-red-600 w-5 h-5" />
                                </button>
                            )}
                        </div>
                    );
                })}
                {length() < 5 && (
                    <button
                        className="w-fit flex items-center gap-3 cursor-pointer outline-none rounded-md focus-visible:border-solid border border-transparent focus-visible:border-accent-400/50 focus-visible:ring focus-visible:ring-accent-400 focus-visible:ring-opacity-25"
                        onClick={addLine}
                    >
                        <PlusCircleIcon className="w-6 h-6 text-accent-400" />
                        <span>Zeile hinzufügen</span>
                    </button>
                )}
                {/* <SelectInput
                    title="1. Zeile"
                    labelClass="text-left"
                    inputClass="pl-[100px]"
                    name="emb_text_front"
                    // value,
                    selectName="facility"
                    selectTitle="Einrichtung"
                    placeholder="... z.B.: Diplomarbeit"
                    containerClass="col-span-6 sm:col-span-3 sm:row-start-3"
                >
                    <option value="5.5mm">5.5 mm</option>
                    <option value="9mm">9mm</option>
                </SelectInput> */}
            </div>
        </div>
    );
}

export default EmbossingTextFront;
