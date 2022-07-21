import { formatePrice } from "@/utils/helpers";
import React, { useContext, useEffect, useState } from "react";
import Button from "../Button";
import ProductContext from "../context/ProductContext";
import NumberInput from "../Form/NumberInput";
import Equipment from "./info/Equipment";
import ProductInfo from "./info/ProductInfo";
import ProductPreview from "./preview/ProductPreview";
import { post } from "axios";
import CartContext from "../context/CartContext";

function Product() {
    const [top, setTop] = useState(0);
    const [open, setIsOpen] = useState(true);
    const [inititalHeight, setInititalHeight] = useState(0);
    const { product, totals, changeProductQty } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        setInititalHeight(document.querySelector("#shop").clientHeight);
        const handleScroll = (event) => {
            if (open) return;
            const prev = document.querySelector("#preview");
            if (prev.clientHeight > inititalHeight) {
                return;
            }
            if (window.scrollY + prev.clientHeight > inititalHeight) {
                setTop(inititalHeight - prev.clientHeight - 20);
                return;
            }
            if (window.scrollY > 70) setTop(window.scrollY - 60);
            else {
                setTop(0);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [setTop, top, inititalHeight]);

    const addProduct = () => {
        addToCart(product);
    };

    return (
        <div
            id="preview"
            className="static lg:relative right-0 w-full sm:w-3/4 lg:w-full mx-auto transition-all duration-[50ms] space-y-10 divide-y"
            style={{ top: top }}
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
                    setTop={setTop}
                    top={top}
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
