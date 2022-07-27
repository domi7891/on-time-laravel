import ProductContext from "@/Components/context/ProductContext";
import Checkbox from "@/Components/Form/Checkbox";
import Spacer from "@/Components/shop/Spacer";
import React, { useContext } from "react";

function EmbossingPosition() {
    const { product, changeEmbossingOptions } = useContext(ProductContext);

    const changePosition = (title, e) => {
        changeEmbossingOptions("position", e.target.value);
    };

    return (
        <div className="w-full space-y-2">
            <h3 className="text-left text-xl">Prägeposition</h3>

            <Spacer />

            <div
                className={`w-full flex flex-wrap justify-start gap-2 gap-x-5 xs:gap-x-10 overflow-x-auto px-2 py-1`}
            >
                <Checkbox
                    type="radio"
                    id="embossing_front"
                    name="embossing_position"
                    title="Buchvorderseite"
                    value="Buchvorderseite"
                    checked={
                        product.embossing_options.position == "Buchvorderseite"
                    }
                    handleChange={changePosition}
                />
                <Checkbox
                    type="radio"
                    id="embossing_back"
                    name="embossing_position"
                    value="Buchrücken"
                    title="Buchrücken"
                    checked={product.embossing_options.position == "Buchrücken"}
                    handleChange={changePosition}
                />
                <Checkbox
                    type="radio"
                    id="embossing_both"
                    name="embossing_position"
                    value="Beides"
                    title="Beides"
                    checked={product.embossing_options.position == "Beides"}
                    handleChange={changePosition}
                />
            </div>
        </div>
    );
}

export default EmbossingPosition;
