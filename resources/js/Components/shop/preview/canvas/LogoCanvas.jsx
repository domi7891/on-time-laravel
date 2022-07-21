import ProductContext from "@/Components/context/ProductContext";
import { calcFontSize, changeImageColor } from "@/utils/helpers";
import React, { useContext, useEffect, useRef } from "react";
import PreviewContext from "../../../context/PreviewContext";

const LINE_SPACING = 0.04;
const COLORS = {
    Gold: { red: 212, green: 175, blue: 55 },
    Silber: { red: 192, green: 192, blue: 192 },
    Weiß: { red: 255, green: 255, blue: 255 },
};

function LogoCanvas({ className = "", isFront = false, color = "Gold" }) {
    const canvasRef = useRef(null);
    const {
        frontImage,
        frontSizes,
        sideSizes,
        setCanvasSize,
        frontLoaded,
        sideLoaded,
    } = useContext(PreviewContext);
    const { hasEmbossing, logo, showLogo } = useContext(ProductContext);
    let canvas, context;
    let logoImage = new Image();
    logoImage.crossOrigin = "anonymous";
    let posTop = 0;
    const { red, green, blue } = COLORS[color];
    const hide = () => {
        return !frontImage.includes("hardcover");
    };

    const loadLogo = () => {
        logoImage.onload = () => {
            context.imageSmoothingQuality = "high";
            const wRatio = canvas.width / logoImage.width;
            const hRatio = canvas.height / logoImage.height;
            const ratio = Math.min(wRatio, hRatio) * 0.22;
            const imgWidth = logoImage.width * ratio;
            const imgHeight = Math.ceil(logoImage.height * ratio);
            const x = canvas.width / 2 - imgWidth / 2;
            const y = 40;
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
        logoImage.src =
            "/images/products/Schullogos/" + logo.replaceAll(" ", "_") + ".png";
    };

    useEffect(() => {
        if (!showLogo || !logo || !hasEmbossing) return;
        canvas = canvasRef.current;
        context = canvas.getContext("2d");
        let canvasWidth = logoImage.width;
        let canvasHeight = logoImage.height;
        if (frontSizes) {
            canvasWidth = frontSizes.width;
            canvasHeight = frontSizes.height;
        }
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        context.clearRect(0, 0, canvas.width, canvas.height);
        posTop = logo ? canvas.height / 3.1 : canvas.height / 4.5;
        loadLogo();
    }, [sideSizes, frontSizes, frontLoaded, sideLoaded, showLogo, logo, color]);
    return (
        showLogo &&
        hasEmbossing && (
            <canvas
                className={`max-h-[300px] sm:max-h-canvas m-0 ${className} ${
                    frontLoaded ? "block" : "hidden"
                }`}
                height={frontSizes?.height}
                width={frontSizes?.width}
                ref={canvasRef}
            />
        )
    );
}

export default LogoCanvas;
