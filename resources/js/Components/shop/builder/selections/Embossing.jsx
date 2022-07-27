import ProductContext from "@/Components/context/ProductContext";
import Checkbox from "@/Components/Form/Checkbox";
import React, { useContext } from "react";
import EmbossingColor from "./embossing/EmbossingColor";
import EmbossingLogo from "./embossing/EmbossingLogo";
import EmbossingMethod from "./embossing/EmbossingMethod";
import EmbossingPosition from "./embossing/EmbossingPosition";

function Embossing() {
    const { product, changeProduct, checkHasLogo } = useContext(ProductContext);

    const changeEmbossing = (title, e) => {
        const value = e.target.value == "true";
        changeProduct("embossing", value);
    };
    return (
        <div className="w-full space-y-5 lg:space-y-10">
            <div className={`w-full flex justify-start gap-10 px-2 pt-1`}>
                <Checkbox
                    type="radio"
                    id="has_embossing_yes"
                    name="has_embossing"
                    title="Ja"
                    value={true}
                    checked={product.embossing}
                    handleChange={changeEmbossing}
                />
                <Checkbox
                    type="radio"
                    id="has_embossing_no"
                    name="has_embossing"
                    value={false}
                    title="Nein"
                    checked={!product.embossing}
                    handleChange={changeEmbossing}
                />
            </div>
            {product.embossing && (
                <>
                    <EmbossingColor />
                    <EmbossingMethod />
                    <EmbossingPosition />
                    {checkHasLogo() && <EmbossingLogo />}
                    {/* <EmbossingSchoolLogo current={product.embossing_options.color} /> */}
                </>
            )}
        </div>
    );
}

export default Embossing;
