import ProductContext from "@/Components/context/ProductContext";
import Checkbox from "@/Components/Form/Checkbox";
import React, { useContext } from "react";
import Spacer from "../Spacer";

function A3Selection() {
    const { product, changeProduct } = useContext(ProductContext);

    const changeHasA3 = (title, e) => {
        const value = e.target.value == "true";
        changeProduct("a3", value);
    };

    return (
        <div className="w-full space-y-2">
            <h3 className="text-left text-xl">A3-Seiten</h3>

            <Spacer />

            <div className="w-full space-y-5">
                <div className={`w-full flex justify-start gap-10 px-2 pt-1`}>
                    <Checkbox
                        type="radio"
                        id="has_a3_yes"
                        name="has_a3"
                        title="Ja"
                        value={true}
                        checked={product.a3}
                        handleChange={changeHasA3}
                    />
                    <Checkbox
                        type="radio"
                        id="has_a3_no"
                        name="has_a3"
                        value={false}
                        title="Nein"
                        checked={!product.a3}
                        handleChange={changeHasA3}
                    />
                </div>
            </div>
        </div>
    );
}

export default A3Selection;
