import {
    BASE_PRODUCT,
    TOTALS,
    hasColor,
    materialByColor,
} from "@/utils/helpers";
import React, { useContext, useEffect, useState } from "react";
import { get, post } from "axios";

const ProductContext = React.createContext();

const BASE_FOLDER = "/images/products/";

export function ProductProvider({ type, initProduct, children }) {
    const [product, setProduct] = useState(initProduct);
    const [totals, setTotals] = useState(TOTALS);

    const embPermitted = () => {
        return (
            !product?.type?.toLowerCase().includes("softcover") &&
            !product?.type?.toLowerCase().includes("spiralbindung") &&
            !product?.material?.toLowerCase().includes("standard")
        );
    };

    const [hasEmbossing, setHasEmbossing] = useState(
        product.embossing && embPermitted()
    );
    const [showLogo, setShowLogo] = useState(
        product.embossing && product.embossing_options.schoollogo
    );
    const [logo, setLogo] = useState(
        product.embossing_options.schoollogo_options.name
    );

    useEffect(() => {
        post("/product/calculatePrice", product).then((res) => {
            if (res.error) {
                changeMaterial;
            }
            setTotals(res.data);
        });
    }, [product]);

    const changeHasEmbossing = (val) => {
        if (val) {
            setHasEmbossing(val);
        }
        setHasEmbossing(product.embossing && embPermitted());
    };

    const changeLogo = (show, newLogo) => {
        if ((!newLogo && !logo) || !hasEmbossing) {
            setShowLogo(false);
            return;
        }
        setShowLogo(show);
        setLogo(newLogo);
    };

    const changeType = (type) => {
        setProduct((oldValue) => {
            let { material, color, embossing, ...rest } = oldValue;
            embossing = false;
            if (type == "Hardcover") {
                material = "Standard";
                color =
                    color && hasColor(type, material, color)
                        ? color
                        : "Schwarz";
                return { ...rest, type, material, color, embossing };
            } else if (type == "Spiralbindung") {
                material = "Kunststoff";
                return { ...rest, type, material, embossing };
            } else {
                color =
                    color && hasColor(type, material, color)
                        ? color
                        : "Schwarz";
                return { ...rest, type, color, embossing };
            }
        });
    };

    const changeMaterial = (material) => {
        setProduct((oldValue) => {
            let { embossing, ...rest } = oldValue;
            if (
                material == "Standard" ||
                material == "Draht" ||
                material == "Kunststoff"
            ) {
                embossing = false;
            }
            return { ...rest, material, embossing };
        });
    };

    const changeColor = (color) => {
        setProduct((oldValue) => {
            let { ...rest } = oldValue;
            const material = materialByColor(
                oldValue.type,
                oldValue.material,
                color
            );
            console.log(material);
            return { ...rest, color, material };
        });
    };

    const changeProduct = (key, value) => {
        setProduct((oldValue) => {
            return { ...oldValue, [key]: value };
        });
    };

    const changeProductQty = (qty, setQty = false) => {
        let quantity = qty;
        const oldTotals = (product.totals = setProduct((oldValue) => {
            return { ...oldValue, quantity };
        }));
    };

    const changeEquipment = (equipment, selected, qty) => {
        const oldEquipment = product.equipment;
        oldEquipment[equipment].quantity = qty;
        oldEquipment[equipment].selected = selected;
        oldEquipment[equipment].total = oldEquipment[equipment].unitPrice * qty;
        setProduct((oldValue) => {
            return { ...oldValue, equipment: oldEquipment };
        });
    };

    return (
        <ProductContext.Provider
            value={{
                product,
                totals,
                hasEmbossing,
                changeHasEmbossing,
                logo,
                showLogo,
                changeLogo,
                changeProduct,
                changeType,
                changeMaterial,
                changeColor,
                changeProductQty,
                changeEquipment,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContext;
