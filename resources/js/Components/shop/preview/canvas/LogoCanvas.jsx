import ProductContext from "@/Components/context/ProductContext";
import { EMBOSSING_COLORS } from "@/utils/constants";
import { calcFontSize, changeImageColor } from "@/utils/helpers";
import React, { useContext, useEffect, useRef, useState } from "react";
import PreviewContext from "../../../context/PreviewContext";

function LogoCanvas({ className = "", color = "Gold" }) {
    const canvasRef = useRef(null);
    const { frontSizes, sideSizes } = useContext(PreviewContext);
    const { product, logo } = useContext(ProductContext);
    const [logoImage, setLogoImage] = useState(new Image());
    logoImage.crossOrigin = "anonymous";
    const { red, green, blue } = EMBOSSING_COLORS[color];

    const drawLogo = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const wRatio = canvas.width / logoImage.width;
        const hRatio = canvas.height / logoImage.height;
        const ratio = Math.min(wRatio, hRatio) * 0.22;
        const imgWidth = logoImage.width * ratio;
        const imgHeight = Math.ceil(logoImage.height * ratio);
        const x = canvas.width / 2 - imgWidth / 2;
        const y = 40;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            logoImage,
            0,
            0,
            logoImage.width,
            logoImage.height,
            x,
            y,
            imgWidth,
            imgHeight
        );
        changeImageColor(canvas, context, x, y, { red, green, blue });
    };

    logoImage.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        let canvasWidth = logoImage.width;
        let canvasHeight = logoImage.height;
        if (frontSizes) {
            canvasWidth = frontSizes.width;
            canvasHeight = frontSizes.height;
        }
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        context.imageSmoothingQuality = "high";
        drawLogo();
    };

    useEffect(() => {
        logoImage.src =
            "/images/products/Schullogos/" + logo.replaceAll(" ", "_") + ".png";
    }, [
        sideSizes,
        frontSizes,
        JSON.stringify(product.embossing_options.schoollogo),
        logo,
    ]);

    useEffect(() => {
        if (logoImage.complete) drawLogo();
    }, [color]);

    return (
        <canvas
            className={`max-h-[300px] sm:max-h-canvas m-0 ${className} block`}
            height={frontSizes?.height}
            width={frontSizes?.width}
            ref={canvasRef}
        />
    );
}

export default LogoCanvas;
