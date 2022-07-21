import ProductContext from "@/Components/context/ProductContext";
import React, { useContext, useState } from "react";
import Spacer from "../Spacer";
import Type from "./selections/Type";

function TypeSelection() {
    const { product, changeType } = useContext(ProductContext);
    return (
        <div className="space-y-2">
            <h3 className="text-left text-xl">Bindungsart</h3>
            <Spacer />
            <div className="flex justify-start gap-5 sm:gap-10 overflow-x-auto">
                <Type
                    title="Hardcover"
                    name="hardcover"
                    current={product.type}
                    handleChange={(title) => changeType(title)}
                />
                <Type
                    name="softcover"
                    title="Softcover"
                    current={product.type}
                    handleChange={(title) => changeType(title)}
                />
                <Type
                    name="spiralbindung"
                    title="Spiralbindung"
                    current={product.type}
                    handleChange={(title) => changeType(title)}
                />
            </div>
        </div>
    );
}

export default TypeSelection;
