import { PreviewProvider } from "@/Components/context/PreviewContext";
import ProductContext, {
    ProductProvider,
} from "@/Components/context/ProductContext";
import ProductPreview from "@/Components/shop/preview/ProductPreview";
import ProductInfo from "@/Components/shop/info/ProductInfo";
import React, { useContext, useEffect, useState } from "react";
import Product from "@/Components/shop/Product";
import TypeSelection from "@/Components/shop/builder/TypeSelection";
import MaterialSelection from "@/Components/shop/builder/MaterialSelection";
import ColorSelection from "@/Components/shop/builder/ColorSelection";
import PrintSelection from "@/Components/shop/builder/PrintSelection";
import WeightSelection from "@/Components/shop/builder/WeightSelection";
import PdfSelection from "@/Components/shop/builder/PdfSelection";
import { BASE_PRODUCT } from "@/utils/helpers";

function Shop({ facility, type }) {
    const product = BASE_PRODUCT;
    return (
        <ProductProvider type={type} initProduct={product}>
            <PreviewProvider>
                <div
                    id="shop"
                    className="w-full text-center h-full relative px-4 sm:px-10 grid grid-cols-1 lg:grid-cols-2 pt-5 gap-16 lg:pt-10"
                >
                    <div className="border-bottom border-green-500 row-start-1 lg:col-start-2 w-full relative">
                        <Product />
                    </div>
                    <div className="w-full space-y-5 lg:space-y-10">
                        <TypeSelection />
                        <MaterialSelection />
                        <ColorSelection />
                        <div className="flex flex-col xs:flex-row flex-between gap-5 xs:ga-0">
                            <PrintSelection />
                            <WeightSelection />
                        </div>
                        <PdfSelection />
                    </div>
                </div>
            </PreviewProvider>
        </ProductProvider>
    );
}

export default Shop;
