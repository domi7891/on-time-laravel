import CartContext from "@/Components/context/CartContext";
import ProductContext from "@/Components/context/ProductContext";
import NumberInput from "@/Components/Form/NumberInput";
import React, { useContext, useEffect, useState } from "react";
import Spacer from "../Spacer";

function PageSelection() {
    const { product, changeProduct } = useContext(ProductContext);
    const { cart } = useContext(CartContext);

    const [pages, setPages] = useState(product.pages);

    useEffect(() => setPages(product.pages), [product.pages]);

    const pagesChange = (e) => {
        setPages(e.target.value);
    };

    const handleBlur = (e) => {
        let val = pages;
        if (val == "") {
            val = 0;
            setPages(val);
        }
        changeProduct("pages", val);
    };

    return (
        <div className="w-full space-y-2">
            <h3 className="text-left text-xl">Seitenanzahl</h3>
            <Spacer />

            <div
                className={`w-full flex justify-start gap-3 sm:gap-5 overflow-x-auto p-1`}
            >
                <NumberInput
                    showStepper={false}
                    inputClass="!w-full !text-left"
                    containerClass="w-full sm:w-2/3 md:w-1/2 lg:w-2/3"
                    min={0}
                    max={595}
                    value={pages}
                    required={true}
                    handleChange={pagesChange}
                    handleBlur={handleBlur}
                    disabled={cart?.items?.length > 0 || product.pdf}
                />
            </div>
        </div>
    );
}

export default PageSelection;
