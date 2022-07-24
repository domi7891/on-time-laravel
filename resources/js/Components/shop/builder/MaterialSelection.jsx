import ProductContext from "@/Components/context/ProductContext";
import { hasColor, mapColor } from "@/utils/helpers";
import React, { useContext, useEffect } from "react";
import Spacer from "../Spacer";
import Material from "./selections/Material";

function MaterialSelection() {
    const { product, error, changeMaterial } = useContext(ProductContext);

    useEffect(() => {}, [product.color]);

    return product.type == "Softcover" ? null : (
        <div className="space-y-2">
            <h3 className="text-left text-xl">Optik der Bindung</h3>
            <Spacer />
            {product.type == "Hardcover" && (
                <div
                    className={`flex justify-start gap-3 sm:gap-5 overflow-x-auto`}
                >
                    <Material
                        name="standard"
                        title="Standard"
                        img={`Material/standard_${mapColor(
                            product.color ?? "Schwarz"
                        )}.jpg`}
                        current={product.material}
                        color={product.color}
                        type="Hardcover"
                        imgStyle="-left-[20%]"
                        imgContainerStyle="w-[125%]"
                        handleChange={(title) => changeMaterial(title)}
                    />
                    <Material
                        name="leder"
                        title="Leder"
                        img={`Material/leder_${mapColor(
                            product.color ?? "Schwarz"
                        )}.jpg`}
                        type="Hardcover"
                        color={product.color}
                        current={product.material}
                        imgStyle="-left-[20%]"
                        imgContainerStyle="w-[125%]"
                        handleChange={(title) => changeMaterial(title)}
                    />
                    <Material
                        name="leinen"
                        title="Leinen"
                        img={`Material/leinen_${mapColor(
                            product.color ?? "Schwarz"
                        )}.jpg`}
                        type="Hardcover"
                        color={product.color}
                        current={product.material}
                        imgStyle="-left-[20%]"
                        imgContainerStyle="w-[125%]"
                        handleChange={(title) => changeMaterial(title)}
                    />
                </div>
            )}
            {product.type == "Spiralbindung" && (
                <div className={`flex gap-5 overflow-x-auto"`}>
                    {!error?.disabled.includes("Draht") && (
                        <Material
                            name="draht"
                            title="Draht"
                            img="Material/draht.jpg"
                            type="Spiralbindung"
                            current={product.material}
                            imgStyle="-bottom-6"
                            handleChange={(title) => changeMaterial(title)}
                        />
                    )}
                    {!error?.disabled.includes("Kunststoff") && (
                        <Material
                            name="kunststoff"
                            title="Kunststoff"
                            img="Material/kunststoff.jpg"
                            type="Spiralbindung"
                            current={product.material}
                            imgStyle="-bottom-3"
                            handleChange={(title) => changeMaterial(title)}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default MaterialSelection;
