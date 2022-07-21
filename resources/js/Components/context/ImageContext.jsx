import React, { useState } from "react";

const ImageContext = React.createContext();

export function ImageProvider({ children }) {
    const [image, setImage] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const changeImage = (image) => {
        setImage(image);
    };
    const showImageModal = () => setIsOpen(true);
    const hideImageModal = () => setIsOpen(false);

    return (
        <ImageContext.Provider
            value={{
                image,
                isOpen,
                changeImage,
                showImageModal,
                hideImageModal,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
}

export default ImageContext;
