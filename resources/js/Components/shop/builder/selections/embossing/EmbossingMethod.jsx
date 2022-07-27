import ProductContext from "@/Components/context/ProductContext";
import Checkbox from "@/Components/Form/Checkbox";
import Hint from "@/Components/Hint";
import Spacer from "@/Components/shop/Spacer";
import React, { useContext } from "react";

function EmbossingMethod() {
    const { product, changeEmbossingOptions } = useContext(ProductContext);

    const changeMethod = (title, e) => {
        changeEmbossingOptions("method", e.target.value);
    };
    return (
        <div className="w-full space-y-2">
            <div className="text-left flex flex-col -space-y-0.5">
                <div className="flex gap-4 items-start relative">
                    <h3 className="text-left text-xl">Prägemethode</h3>
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

            <div
                className={`w-full flex justify-start gap-2 gap-x-5 xs:gap-10 flex-wrap overflow-x-auto px-2 py-1`}
            >
                <Checkbox
                    type="radio"
                    id="embossing_tiefen"
                    name="embossing_method"
                    title="Tiefenprägung"
                    value="Tiefenprägung"
                    checked={
                        product.embossing_options.method == "Tiefenprägung"
                    }
                    handleChange={changeMethod}
                />
                <Checkbox
                    type="radio"
                    id="embossing_digital"
                    name="embossing_method"
                    value="Digitalprägung"
                    title="Digitalprägung"
                    checked={
                        product.embossing_options.method == "Digitalprägung"
                    }
                    handleChange={changeMethod}
                />
            </div>
        </div>
    );
}

export default EmbossingMethod;
