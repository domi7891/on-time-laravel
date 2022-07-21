import ProductContext from "@/Components/context/ProductContext";
import { COLORS, getColors } from "@/utils/helpers";
import React, { useContext, useEffect, useState } from "react";
import Spacer from "../Spacer";
import Color from "./selections/Color";

function ColorSelection() {
    const { product, changeColor } = useContext(ProductContext);
    const [colors, setColors] = useState([]);
    console.log("Colors", product.color);
    useEffect(() => {
        const cols = getColors(product.type, product.material);
        setColors(cols);
    }, [product.type]);

    return product.type == "Spiralbindung" ? null : (
        <div className="w-full space-y-2">
            <h3 className="text-left text-xl">Farbe der Bindung</h3>
            <Spacer />

            <div
                className={`w-full flex justify-start gap-3 sm:gap-5 overflow-x-auto`}
            >
                {colors.map(([name, color], idx) => (
                    <Color
                        key={idx}
                        name={name}
                        hex={color.hex}
                        color={color.name}
                        current={product.color}
                        handleChange={(color) => changeColor(color)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ColorSelection;
