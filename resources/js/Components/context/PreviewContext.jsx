import { BASE_FOLDER, buildUrl, capitalizeFirstLetter } from "@/utils/helpers";
import React, { useContext, useEffect, useState } from "react";
import ProductContext from "./ProductContext";

const PreviewContext = React.createContext();

export function PreviewProvider({ children }) {
    const { product, changeHasEmbossing } = useContext(ProductContext);
    let imagePath = `Produktfotos ${capitalizeFirstLetter(product.type)}`;
    switch (product.type.toLowerCase()) {
        case "hardcover":
            imagePath += " Standard/Small/hardcover_standard_front_black.jpg";
            break;
        case "softcover":
            imagePath += "/Small/softcover_front_black.jpg";
            break;
        case "spiralbindung":
            imagePath += "/Small/spiral_plastic_front.jpg";
            break;
    }
    const [frontImage, setFrontImage] = useState(BASE_FOLDER + imagePath);
    const [sideImage, setSideImage] = useState(
        BASE_FOLDER + imagePath.replace("front", "side")
    );
    const [sideHidden, setSideHidden] = useState(false);
    const [frontSizes, setFrontSizes] = useState();
    const [sideSizes, setSideSizes] = useState();
    const [frontLoaded, setFrontLoaded] = useState(false);
    const [sideLoaded, setSideLoaded] = useState(false);

    useEffect(() => {
        changeImage();
        changeHasEmbossing();
    }, [product]);

    const changeImage = () => {
        const { type, material, color } = product;
        const newFrontUrl = buildUrl(type, material, color);
        const newSideUrl = buildUrl(type, material, color, false);
        if (newFrontUrl === frontImage) {
            return;
        }
        setFrontLoaded(false);
        setSideLoaded(false);
        setFrontImage(newFrontUrl);
        setSideImage(newSideUrl);
    };

    const setCanvasSize = (height, width, front) => {
        if (front) {
            setFrontSizes({ height, width });
        } else {
            setSideSizes({ height, width });
        }
    };

    return (
        <PreviewContext.Provider
            value={{
                frontImage,
                sideImage,
                sideHidden,
                setSideHidden,
                changeImage,
                frontSizes,
                sideSizes,
                setCanvasSize,
                frontLoaded,
                setFrontLoaded,
                sideLoaded,
                setSideLoaded,
            }}
        >
            {children}
        </PreviewContext.Provider>
    );
}

export default PreviewContext;
