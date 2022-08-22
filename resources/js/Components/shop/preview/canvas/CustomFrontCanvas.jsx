import CartContext from "@/Components/context/CartContext";
import PreviewContext from "@/Components/context/PreviewContext";
import ProductContext from "@/Components/context/ProductContext";
import { EMBOSSING_COLORS } from "@/utils/constants";
import { changePdfColor } from "@/utils/helpers";
import React, { useContext, useEffect, useRef, useState } from "react";

function CustomFrontCanvas({ className = "", color = "Gold" }) {
    const canvasRef = useRef(null);
    const { frontSizes, sideSizes } = useContext(PreviewContext);
    const { product } = useContext(ProductContext);
    const { cart } = useContext(CartContext);
    const [show, setShow] = useState(false);
    const { red, green, blue } = EMBOSSING_COLORS[color];

    const changeColor = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        let iimg = canvas.toDataURL("image/png");
        let r;
        let g;
        let b;
        if (product.embossing_options.color == "Gold") {
            r = 212;
            g = 175;
            b = 55;
        } else if (product.embossing_options.color == "Silber") {
            r = 192;
            g = 192;
            b = 192;
        } else {
            r = 255;
            g = 255;
            b = 255;
        }
        changePdfColor(canvas, context, iimg, r, g, b, setShow);
    };

    const setPdf = async () => {
        const pdfJS = await import("pdfjs-dist/build/pdf");
        pdfJS.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
        const url = `/storage/uploads/${cart.folder_name}/praegungPdf.pdf`;
        const pdf = await pdfJS.getDocument(url).promise;

        const page = await pdf.getPage(1);
        console.log(page);

        const viewport = page.getViewport({ scale: 1 });

        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");
        let canvasWidth = viewport.width;
        let canvasHeight = viewport.height;
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;

        canvasContext.fillStyle = "rgb(212,175,55)";
        var renderContext = {
            canvasContext: canvasContext,
            background: "rgba(0,0,0,0)",
            viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
            changeColor();
        });
    };

    useEffect(() => {
        (async function () {
            if (
                product.embossing_options.custom &&
                product.embossing_options.custom_options
            ) {
                setShow(false);
                setPdf();
            } else {
                const canvas = canvasRef.current;
                const canvasContext = canvas.getContext("2d");
                canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            }
        })();
    }, [
        JSON.stringify(product.embossing_options.color),
        JSON.stringify(product.embossing_options.custom),
        JSON.stringify(product.embossing_options.custom_options),
    ]);

    return (
        <canvas
            className={`max-h-[300px] sm:max-h-canvas m-0 ${className} ${
                show ? "block" : "hidden"
            }`}
            height={frontSizes?.height}
            width={frontSizes?.width}
            ref={canvasRef}
        />
    );
}

export default CustomFrontCanvas;
