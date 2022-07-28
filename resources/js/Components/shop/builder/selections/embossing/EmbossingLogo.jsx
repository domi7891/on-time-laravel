import ProductContext from "@/Components/context/ProductContext";
import Checkbox from "@/Components/Form/Checkbox";
import Dropdown from "@/Components/Form/Dropdown";
import Spacer from "@/Components/shop/Spacer";
import { formatePrice } from "@/utils/helpers";
import React, { useContext } from "react";

const arr = ["BG 13 Fichtnergasse", "HLTW 13 Bergheidengasse"];

function EmbossingLogo() {
    const { product, changeEmbossingLogo, changeEmbossingOptions } =
        useContext(ProductContext);

    const changeHasLogo = (title, e) => {
        const value = e.target.value == "true";
        changeEmbossingOptions("schoollogo", value);
    };

    const changeLogo = (logo) => {
        changeEmbossingLogo("name", logo);
    };

    return (
        <div className="w-full space-y-2">
            <h3 className="text-left text-xl">Schullogo</h3>

            <Spacer />

            <div className="w-full space-y-5">
                <div className={`w-full flex justify-start gap-10 px-2 pt-1`}>
                    <Checkbox
                        type="radio"
                        id="has_logo_yes"
                        name="has_logo"
                        title="Ja"
                        value={true}
                        checked={product.embossing_options.schoollogo}
                        handleChange={changeHasLogo}
                    />
                    <Checkbox
                        type="radio"
                        id="has_logo_no"
                        name="has_logo"
                        value={false}
                        title="Nein"
                        checked={!product.embossing_options.schoollogo}
                        handleChange={changeHasLogo}
                    />
                </div>
                {product.embossing_options.schoollogo && (
                    <div className="relative text-left w-full">
                        <Dropdown
                            contentClasses="flex flex-col divide-y"
                            buttonClasses="w-full xs:w-auto"
                            width="20"
                            maxHeight="40"
                            childArray={arr}
                            change={(logo) => changeLogo(logo)}
                        >
                            <Dropdown.Trigger className="py-1 w-full xs:min-w-[260px]">
                                <span>
                                    {
                                        product.embossing_options
                                            .schoollogo_options.name
                                    }
                                </span>
                            </Dropdown.Trigger>
                        </Dropdown>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmbossingLogo;
