import ProductContext from "@/Components/context/ProductContext";
import SelectInput from "@/Components/Form/SelectInput";
import Hint from "@/Components/Hint";
import Spacer from "@/Components/shop/Spacer";
import { ALLOWED_KEYS } from "@/utils/constants";
import React, { useContext, useState } from "react";

function EmbossingTextFront() {
    const { product, changeEmbossingTextMulitple } = useContext(ProductContext);
    const [texts, setTexts] = useState(
        product.embossing_options.text.front_text
    );

    const handleKeyDown = (e, line, size) => {
        // console.log(ALLOWED_KEYS[size]);
        // console.log(e.key, size);
        if (!ALLOWED_KEYS[size].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
        }

        // console.log(e, line);
    };

    const handleChange = (e, line) => {
        let text = product.embossing_options.text.front_text;
        text[line].text = e.target.value;
        changeEmbossingTextMulitple({ front_text: text });
    };

    const handleSelectChange = (e, line) => {
        console.log(line, e.target.value);
        let text = product.embossing_options.text.front_text;
        text[line] = { text: "", size: e.target.value };
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
            <div className="pt-2 space-y-3">
                {Object.entries(texts).map(([key, value], idx) => {
                    return (
                        <SelectInput
                            key={idx}
                            title={key}
                            type="text"
                            labelClass="text-left"
                            inputClass="pl-[100px]"
                            name={`emb_text_front_${idx}`}
                            value={value.text}
                            selectValue={value.size}
                            selectName={`emb_textsize_front_${idx}`}
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
                    );
                })}
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
