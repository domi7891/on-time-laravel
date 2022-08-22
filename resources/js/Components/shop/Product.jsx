import { formatePrice } from "@/utils/helpers";
import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../Button";
import ProductContext from "../context/ProductContext";
import NumberInput from "../Form/NumberInput";
import Equipment from "./info/Equipment";
import ProductInfo from "./info/ProductInfo";
import ProductPreview from "./preview/ProductPreview";
import { post } from "axios";
import CartContext from "../context/CartContext";

function Product() {
    const [open, setIsOpen] = useState(true);
    const [inititalHeight, setInititalHeight] = useState(0);
    const { product, totals, changeProductQty } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);
    const preview = useRef();
    const resizeObserver = new ResizeObserver((entries) => {
        setInititalHeight(document.querySelector("#shop").clientHeight);
    });

    const handleScroll = (event) => {
        if (open) return;
        const prev = preview.current;
        if (prev.clientHeight > inititalHeight) {
            return;
        }
        if (window.scrollY + prev.clientHeight > inititalHeight) {
            prev.style.top = inititalHeight - prev.clientHeight - 20 + "px";
            return;
        }
        if (window.scrollY > 70) {
            prev.style.top = window.scrollY - 60 + "px";
        } else {
            prev.style.top = 0 + "px";
        }
    };

    useEffect(() => {
        preview.current.style.top = 0 + "px";
        setInititalHeight(document.querySelector("#shop").clientHeight);
        resizeObserver.observe(document.body);
        return () => {
            resizeObserver.unobserve(document.body);
        };
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [open]);

    const addProduct = () => {
        const frontData = document.querySelector("#frontCanvas").toDataURL();

        const backCanvas = document.querySelector("#backCanvas");
        let backData = null;
        if (backCanvas) backData = backCanvas.toDataURL();

        const logoCanvas = document.querySelector("#logoCanvas");
        let logoData = null;
        if (logoCanvas) logoData = logoCanvas.toDataURL();

        const customCanvas = document.querySelector("#customCanvas");
        let customData = null;
        if (customCanvas) customData = customCanvas.toDataURL();

        addToCart(product, frontData, backData, logoData, customData);
    };

    return (
        <div
            ref={preview}
            id="preview"
            className="static lg:relative right-0 w-full sm:w-3/4 lg:w-full mx-auto transition-all duration-[50ms] space-y-10 divide-y"
        >
            <ProductPreview />
            <div className="md:mx-5 md:px-5">
                <div className="pt-6 sm:pt-3 mb-4">
                    <span className="float-right font-bold text-[1.7rem]">
                        {formatePrice(totals.total)}
                    </span>
                    <div className="w-full flex justify-between items-center pt-3 gap-8">
                        <NumberInput
                            name="productQty"
                            value={product.quantity}
                            handleChange={(e) => {
                                changeProductQty(e.target.value);
                            }}
                            handleBlur={(e, value) => {
                                changeProductQty(value, true);
                            }}
                            handleStep={(step) => {
                                changeProductQty(product.quantity + step);
                            }}
                            min={1}
                        />
                        <Button
                            className="uppercase font-bold flex-1 text-xs px-0.5 sm:text-sm sm:px-8 sm:flex-none"
                            disabled={false}
                            onClick={() => addProduct()}
                        >
                            In den Warenkorb
                        </Button>
                    </div>
                </div>
                <ProductInfo
                    preview={preview}
                    open={open}
                    setIsOpen={setIsOpen}
                />
                <div className="mt-6 w-full">
                    <Equipment />
                </div>
            </div>
        </div>
    );
}

export default Product;
