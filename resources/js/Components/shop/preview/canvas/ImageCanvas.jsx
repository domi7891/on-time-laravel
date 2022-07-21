import PreviewContext from "@/Components/context/PreviewContext";
import ProductContext from "@/Components/context/ProductContext";
import {
    calcFontSize,
    changeImageColor,
    drawFrontText,
    drawSideText,
} from "@/utils/helpers";
import React, { useContext, useEffect, useRef } from "react";

const COLORS = {
    Gold: { red: 212, green: 175, blue: 55 },
    Silber: { red: 192, green: 192, blue: 192 },
    Weiß: { red: 255, green: 255, blue: 255 },
};

function ImageCanvas({
    imageUrl,
    className = "",
    text,
    isFront = false,
    color = "Gold",
}) {
    const canvasRef = useRef(null);
    const {
        setSideHidden,
        frontSizes,
        sideSizes,
        setCanvasSize,
        setFrontLoaded,
        setSideLoaded,
    } = useContext(PreviewContext);
    const { product, hasEmbossing, showLogo } = useContext(ProductContext);
    let canvas, context;
    let canvasImage = new Image();
    canvasImage.crossOrigin = "anonymous";
    let posTop = 0;
    const { red, green, blue } = COLORS[color];

    const draw = (text) => {
        const lines = Object.entries(text).length;
        if (isFront) {
            posTop = drawFrontText(
                canvas,
                context,
                lines,
                text,
                { red, green, blue },
                posTop
            );
        } else {
            drawSideText(canvas, context, text, { red, green, blue });
        }
    };

    const hide = () => {
        return noBack() && !isFront;
    };

    const noBack = () => {
        return product?.type?.toLowerCase().includes("softcover");
    };

    useEffect(() => {
        if (noBack()) {
            setSideHidden(true);
        } else {
            setSideHidden(false);
        }
        if (hide()) return;
        canvas = canvasRef.current;
        context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvasImage.onload = function () {
            let canvasWidth = canvasImage.width;
            let canvasHeight = canvasImage.height;
            if (isFront && !frontSizes) {
                setCanvasSize(canvasHeight, canvasWidth, true);
            }
            if (!isFront && !sideSizes) {
                setCanvasSize(canvasHeight, canvasWidth, false);
            }
            canvas.height = canvasHeight;
            canvas.width = canvasWidth;
            context.drawImage(canvasImage, 0, 0, canvas.width, canvas.height);

            posTop = showLogo ? canvas.height / 3.1 : canvas.height / 4.5;
            if (hasEmbossing && text) {
                if (isFront) {
                    Object.entries(text).forEach(([key, value], idx) => {
                        draw(value);
                    });
                } else {
                    draw(text);
                }
            }
            setFrontLoaded(true);
            setSideLoaded(true);
        };
        canvasImage.src = imageUrl;
        // }, [imageUrl, sideSizes, frontSizes, showLogo, text, color, hasEmbossing]);
    }, [imageUrl, sideSizes, frontSizes, showLogo]);

    return (
        !hide() && (
            <canvas
                className={`max-h-[300px] sm:max-h-canvas m-0 ${className}`}
                height={isFront ? frontSizes?.height : sideSizes?.height}
                width={isFront ? frontSizes?.width : sideSizes?.width}
                ref={canvasRef}
            />
        )
    );
}

export default ImageCanvas;
