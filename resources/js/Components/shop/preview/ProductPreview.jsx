import PreviewContext from "@/Components/context/PreviewContext";
import React, { useContext } from "react";
import LogoCanvas from "./canvas/LogoCanvas";
import ImageCanvas from "./canvas/ImageCanvas";
import Carousel from "@/Components/carousel/Carousel";
import ProductContext from "@/Components/context/ProductContext";
import CustomFrontCanvas from "./canvas/CustomFrontCanvas";

function ProductPreview({ className }) {
    const { frontImage, sideImage, sideHidden } = useContext(PreviewContext);
    const { product, changeLogo, showLogo, changeProduct } =
        useContext(ProductContext);
    const change = () => {
        // changeProduct("Hardcover", "Leder", "Dunkelblau");
        const schools = ["BG 13 Fichtnergasse", "HLTW 13 Bergheidengasse"];
        // changeLogo(!showLogo, schools[Math.floor(Math.random() * 2)]);
    };
    return (
        <div
            className={`w-full h-full flex items-start justify-center ${className}`}
            onClick={change}
        >
            <div className="relative w-full mx-auto flex justify-center">
                <Carousel id="previewCarousel" hideArrows={sideHidden}>
                    <div
                        className="duration-700 ease-in-out"
                        data-carousel-item="active"
                    >
                        <div className="w-full relative mx-auto">
                            <ImageCanvas
                                id="frontCanvas"
                                imageUrl={frontImage}
                                isFront={true}
                                text={
                                    product.embossing_options.front &&
                                    product.embossing_options.front_text
                                }
                                color={product.embossing_options.color}
                            />
                            {product.embossing_options.schoollogo &&
                                product.embossing && (
                                    <LogoCanvas
                                        className="absolute top-0 left-0"
                                        logo="BG 13 Fichtnergasse"
                                        color={product.embossing_options.color}
                                    />
                                )}
                            {product.embossing_options.custom &&
                                product.embossing_options.custom_options
                                    ?.name &&
                                product.embossing && (
                                    <CustomFrontCanvas
                                        className="absolute top-0 left-0"
                                        color={product.embossing_options.color}
                                    />
                                )}
                        </div>
                    </div>
                    {!sideHidden && (
                        <div
                            className="w-full duration-700 ease-in-out"
                            data-carousel-item
                        >
                            <div className="relative w-min mx-auto">
                                <ImageCanvas
                                    id="backCanvas"
                                    imageUrl={sideImage}
                                    title="side"
                                    text={
                                        product.embossing_options.back &&
                                        product.embossing_options.back_text
                                    }
                                    color={product.embossing_options.color}
                                />
                            </div>
                        </div>
                    )}
                </Carousel>
                {/* <div className="w-full h-96">
                    <Carousel
                        slide={false}
                        leftControl={<span>Hallo</span>}
                        rightControl="right"
                    >
                        <div className="flex h-full items-center justify-center">
                            <div className="relative w-min mx-auto">
                                <ImageCanvas
                                    imageUrl={frontImage}
                                    isFront={true}
                                    text={{
                                        first_line: {
                                            text: "DIPLOMARBEIT",
                                            size: "9mm",
                                        },
                                        second_line: {
                                            text: "5AHIF 2022",
                                            size: "9mm",
                                        },
                                        // third_line: { text: "BLIBLABLUB", size: "9mm" },
                                    }}
                                    color="Gold"
                                />
                                <LogoCanvas
                                    className="absolute top-0 left-0"
                                    logo="BG 13 Fichtnergasse"
                                    color="Gold"
                                />
                            </div>
                        </div>
                        <div className="flex h-full items-center justify-center">
                            Slide 2
                        </div>
                        <div className="flex h-full items-center justify-center">
                            Slide 3
                        </div>
                    </Carousel>
                </div> */}
                {/* <div>
                    
                    <div className="flex justify-center">
                        <ImageCanvas
                            imageUrl={sideImage}
                            title="side"
                            text={{
                                text: "DIPLOMARBEIT",
                                right: "5AHIF 2022",
                                size: "5.5mm",
                                position: "Linksbündig mit Rand",
                            }}
                        />
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default ProductPreview;
