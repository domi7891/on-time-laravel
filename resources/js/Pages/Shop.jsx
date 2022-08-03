import { PreviewProvider } from "@/Components/context/PreviewContext";
import ProductContext, {
    ProductProvider,
} from "@/Components/context/ProductContext";
import React, { useContext, useEffect, useState } from "react";
import Product from "@/Components/shop/Product";
import TypeSelection from "@/Components/shop/builder/TypeSelection";
import MaterialSelection from "@/Components/shop/builder/MaterialSelection";
import ColorSelection from "@/Components/shop/builder/ColorSelection";
import PrintSelection from "@/Components/shop/builder/PrintSelection";
import WeightSelection from "@/Components/shop/builder/WeightSelection";
import PdfSelection from "@/Components/shop/builder/PdfSelection";
import { BASE_PRODUCT } from "@/utils/constants";
import PageSelection from "@/Components/shop/builder/PageSelection";
import EmbossingSelection from "@/Components/shop/builder/EmbossingSelection";
import A3Selection from "@/Components/shop/builder/A3Selection";
import RemarkSelection from "@/Components/shop/builder/RemarkSelection";

function Shop({ facility, type }) {
    const product = BASE_PRODUCT;
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 1000);
    });
    return (
        <ProductProvider type={type} initProduct={product}>
            <PreviewProvider>
                {show && (
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
                            <PageSelection />
                            <EmbossingSelection />
                            <A3Selection />
                            <RemarkSelection />
                        </div>
                    </div>
                )}
                {!show && (
                    <div className="flex items-center justify-center space-x-2 w-full flex-1">
                        <div
                            className="border-[6px] border-accent-400 border-b-transparent animate-spin inline-block w-36 h-36 rounded-full"
                            role="status"
                        >
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
            </PreviewProvider>
        </ProductProvider>
    );
}

export default Shop;
