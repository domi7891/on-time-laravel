import PreviewContext from "@/Components/context/PreviewContext";
import ProductContext from "@/Components/context/ProductContext";
import { EMBOSSING_COLORS } from "@/utils/constants";
import {
    calcFontSize,
    changeImageColor,
    drawFrontText,
    drawSideText,
} from "@/utils/helpers";
import React, { useContext, useEffect, useRef, useState } from "react";

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
        frontLoaded,
        sideLoaded,
    } = useContext(PreviewContext);
    const { product } = useContext(ProductContext);
    const [canvasImage, setCanvasImage] = useState(new Image());
    canvasImage.crossOrigin = "anonymous";
    let posTop = 0;
    const { red, green, blue } = EMBOSSING_COLORS[color];

    const draw = (line_text, canvas, context) => {
        const lines = Object.entries(text).length;
        if (isFront) {
            posTop = drawFrontText(
                canvas,
                context,
                lines,
                line_text,
                { red, green, blue },
                posTop
            );
        } else {
            drawSideText(canvas, context, line_text, { red, green, blue });
        }
    };

    const noBack = () => {
        return product?.type?.toLowerCase().includes("softcover");
    };

    const drawImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(canvasImage, 0, 0, canvas.width, canvas.height);
        posTop = product.embossing_options.schoollogo
            ? canvas.height / 3.1
            : canvas.height / 4.5;
        if (product.embossing && product.embossing_options.has_text && text) {
            if (isFront) {
                Object.entries(text).forEach(([key, value], idx) => {
                    draw(value, canvas, context);
                });
            } else {
                draw(text, canvas, context);
            }
        }
    };

    canvasImage.onload = function () {
        let canvasWidth = canvasImage.width;
        let canvasHeight = canvasImage.height;
        if (isFront && !frontSizes) {
            setCanvasSize(canvasHeight, canvasWidth, true);
        }
        if (!isFront && !sideSizes) {
            setCanvasSize(canvasHeight, canvasWidth, false);
        }
        canvasRef.current.height = canvasHeight;
        canvasRef.current.width = canvasWidth;
        setFrontLoaded(true);
        setSideLoaded(true);
        drawImage();
    };

    useEffect(() => {
        if (noBack()) {
            setSideHidden(true);
        } else {
            setSideHidden(false);
        }
        canvasImage.src = imageUrl;
    }, [imageUrl, sideSizes, frontSizes]);

    useEffect(() => {
        if ((isFront && frontLoaded) || (!isFront && sideLoaded)) {
            drawImage();
        }
    }, [
        JSON.stringify(product.embossing_options),
        product.material,
        color,
        text,
        product.embossing,
    ]);

    return (
        <canvas
            className={`max-h-[300px] sm:max-h-canvas m-0 ${className}`}
            height={isFront ? frontSizes?.height : sideSizes?.height}
            width={isFront ? frontSizes?.width : sideSizes?.width}
            ref={canvasRef}
        />
    );
}

export default ImageCanvas;
