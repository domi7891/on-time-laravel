import { hasColor, materialByColor } from "@/utils/helpers";
import React, { useContext, useEffect, useState } from "react";
import { get, post } from "axios";
import ToastContext from "./ToastContext";
import { TOTALS } from "@/utils/constants";
import CartContext from "./CartContext";

const ProductContext = React.createContext();

export function ProductProvider({ type, initProduct, children }) {
    const [product, setProduct] = useState(initProduct);
    const [totals, setTotals] = useState(TOTALS);
    const [error, setError] = useState();

    const { cart } = useContext(CartContext);
    const { createToast } = useContext(ToastContext);

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
        product.embossing &&
            product.embossing_options.schoollogo &&
            product.embossing_options.method == "Tiefenprägung"
    );
    const [logo, setLogo] = useState(
        product.embossing_options.schoollogo_options.name
    );

    useEffect(() => {
        if (cart?.items?.length > 0 && cart.pdf && cart.pdf.pages) {
            changeProduct("pages", cart.pdf.pages);
            // initProduct.pages = cart.pdf.pages;
        }
    }, [cart]);

    useEffect(() => {
        checkInputs();
    }, [
        product.embossing,
        JSON.stringify(product.embossing_options),
        product.material,
    ]);

    useEffect(() => {
        const check = checkInputs();
        if (!check) return;
        post("/product/calculatePrice", {
            product: product,
            disabled: error ? error.disabled : null,
        }).then((res) => {
            let { disabled, showError, text, title, ...rest } = res.data.error;
            if (!disabled) disabled = [];
            setError({ disabled });
            if (showError) {
                text.forEach((val) => {
                    createToast(title ?? "Achtung!", val, true);
                });
            }
            if (!rest?.success) {
                const { change, ...other } = rest;
                if (change) changeProductMultiple(change);
            } else {
                setTotals(res.data.totals);
            }
        });
    }, [
        product.type,
        product.material,
        product.paper_weight,
        product.embossing,
        JSON.stringify(product.embossing_options.method),
        JSON.stringify(product.embossing_options.position),
        JSON.stringify(product.embossing_options.schoollogo),
        product.pages,
        product.quantity,
        product.a3,
        JSON.stringify(product.a3_sites),
        JSON.stringify(product.equipment),
    ]);

    useEffect(() => {
        changeHasEmbossing();
    }, [product.embossing]);

    /* CHECK EMBOSSING OPTIONS */

    const checkInputs = () => {
        checkEmbossingColor();
        checkEmbossingPosition();
        checkEmbossingType();
        const logoCheck = checkLogo();
        changeLogo(product.embossing_options.schoollogo_options.name, showLogo);
        return logoCheck;
    };

    const checkEmbossingType = () => {
        if (
            product.embossing_options.method == "Digitalprägung" &&
            product.embossing_options.custom
        ) {
            changeEmbossingOptions("front", false);
        }
        // else {
        //     changeEmbossingOptions("front", true);
        // }
    };

    const checkEmbossingColor = () => {
        if (
            product.embossing_options.color == "Weiß" &&
            (product.material != "Leinen" ||
                product.embossing_options.method != "Digitalprägung")
        ) {
            changeEmbossingOptions("color", "Gold");
        }
    };

    const checkEmbossingPosition = () => {
        if (product.embossing_options.position == "Buchvorderseite") {
            changeEmbossingTextMulitple({ front: true, back: false });
        } else if (product.embossing_options.position == "Buchrücken") {
            changeEmbossingTextMulitple({ front: false, back: true });
        } else if (product.embossing_options.position == "Beides") {
            changeEmbossingTextMulitple({ front: true, back: true });
        }
    };

    const checkLogo = () => {
        if (
            product.embossing_options.method == "Digitalprägung" ||
            product.embossing_options.position == "Buchrücken"
        ) {
            if (product.embossing_options.schoollogo) {
                changeEmbossingOptions("schoollogo", false);
                return false;
            }
        }
        // else if (product.embossing_options.schoollogo_options.logoSelected) {
        //     if (!product.embossing_options.schoollogo) {
        //         changeEmbossingOptions("schoollogo", true);
        //         return false;
        //     }
        // }
        return true;
    };

    const checkHasLogo = () => {
        return (
            product.embossing &&
            product.embossing_options.method == "Tiefenprägung" &&
            product.embossing_options.position != "Buchrücken"
        );
    };

    const checkHasCustom = () => {
        return (
            product.embossing_options.method == "Digitalprägung" &&
            product.embossing_options.custom
        );
    };

    /* CHANGE PRODUCT PROPS */

    const changeHasEmbossing = (val) => {
        if (val) {
            setHasEmbossing(val);
        }
        setHasEmbossing(product.embossing && embPermitted());
    };

    const changeLogo = (newLogo, show) => {
        if (product.embossing && product.embossing_options.schoollogo) {
            setShowLogo(true);
        } else {
            setShowLogo(false);
        }
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
                material = error?.disabled.includes("Kunststoff")
                    ? "Draht"
                    : "Kunststoff";
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
            let { embossing, ...rest } = oldValue;
            const material = materialByColor(
                oldValue.type,
                oldValue.material,
                color
            );
            if (material == "Standard") embossing = false;
            return { ...rest, color, material, embossing };
        });
    };

    const changeProduct = (key, value) => {
        setProduct((oldValue) => {
            return { ...oldValue, [key]: value };
        });
    };

    const changeEmbossingOptions = (key, value) => {
        setProduct((oldValue) => {
            const { embossing_options } = oldValue;
            embossing_options[key] = value;
            return { ...oldValue, embossing_options };
        });
    };

    const changeEmbossingText = (key, value) => {};

    const changeEmbossingLogo = (key, value) => {
        setProduct((oldValue) => {
            const { embossing_options } = oldValue;
            const { schoollogo_options } = embossing_options;
            schoollogo_options[key] = value;
            embossing_options["schoollogo_options"] = schoollogo_options;
            return { ...oldValue, embossing_options };
        });
    };

    const changeEmbossingTextMulitple = (newVals) => {
        setProduct((oldValue) => {
            let { embossing_options } = oldValue;
            embossing_options = {
                ...embossing_options,
                ...newVals,
            };
            return { ...oldValue, embossing_options };
        });
    };

    const removeKey = (key) => {
        let { ...rest } = oldValue;
        setProduct((oldValue) => {
            delete oldValue[key];
            return { ...oldValue };
        });
    };

    const changeProductMultiple = (newVals) => {
        setProduct((oldValue) => {
            const newObj = { ...oldValue, ...newVals };
            return newObj;
        });
    };

    const changeA3 = (idx, from, to, remove = false) => {
        setProduct((oldValue) => {
            let { a3_sites } = oldValue;
            if (!remove) {
                a3_sites[idx] = { from, to };
            } else {
                a3_sites.splice(idx, 1);
            }
            return { ...oldValue, a3_sites };
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
                error,
                hasEmbossing,
                changeHasEmbossing,
                logo,
                showLogo,
                changeLogo,
                checkHasLogo,
                checkHasCustom,
                changeEmbossingOptions,
                changeEmbossingLogo,
                changeEmbossingText,
                changeEmbossingTextMulitple,
                changeProduct,
                changeProductMultiple,
                removeKey,
                changeType,
                changeMaterial,
                changeColor,
                changeA3,
                changeProductQty,
                changeEquipment,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContext;
