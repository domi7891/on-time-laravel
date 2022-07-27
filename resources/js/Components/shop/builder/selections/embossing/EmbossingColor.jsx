import Spacer from "@/Components/shop/Spacer";
import React, { useContext, useEffect, useState } from "react";
import { EMBOSSING_COLORS } from "@/utils/helpers";
import Color from "../Color";
import ProductContext from "@/Components/context/ProductContext";
import Hint from "@/Components/Hint";

function EmbossingColor() {
    const { product, changeEmbossingOptions } = useContext(ProductContext);
    const [colors, setColors] = useState(EMBOSSING_COLORS);

    const changeEmbossingColor = (color) => {
        changeEmbossingOptions("color", color);
    };

    useEffect(() => {
        const newCols = Object.entries(EMBOSSING_COLORS).filter(
            ([name, color]) => {
                if (color.name == "white") {
                    return (
                        product.material == "Leinen" &&
                        product.embossing_options.method == "Digitalprägung"
                    );
                }
                return true;
            }
        );
        setColors(Object.fromEntries(newCols));
    }, [product.material, product.embossing_options.method]);

    return (
        <div className="w-full space-y-2">
            <div className="text-left flex flex-col -space-y-0.5">
                <div className="flex gap-4 items-start relative">
                    <h3 className="text-left text-xl">Farbe der Bindung</h3>
                    <Hint placement="auto">
                        <p className="text-sm text-left w-[270px]">
                            Prägungen sind in <b>Gold</b>, <b>Silber</b> oder
                            für <b>Leinen Digitalprägung</b> auch in <b>Weiß</b>{" "}
                            möglich.
                        </p>
                    </Hint>
                </div>
            </div>
            <Spacer />

            <div
                className={`w-full flex justify-start gap-3 sm:gap-5 overflow-x-auto`}
            >
                {Object.entries(colors).map(([name, color], idx) => (
                    <Color
                        key={idx}
                        inputName="emb_color"
                        id={`emb_color_${color.name}`}
                        name={name}
                        hex={color.hex}
                        color={color.name}
                        current={product.embossing_options.color}
                        handleChange={(color) => changeEmbossingColor(color)}
                    />
                ))}
            </div>
        </div>
    );
}

export default EmbossingColor;
