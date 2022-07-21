import React, { useContext } from "react";
import ImageContext from "../context/ImageContext";

function Image({ img }) {
    const { changeImage, showImageModal } = useContext(ImageContext);
    const showImage = () => {
        changeImage(img);
        showImageModal();
    };
    return (
        <button
            className="relative col-span-1 w-full aspect-square overflow-hidden group cursor-pointer"
            onClick={() => {
                showImage();
            }}
        >
            <div className="opacity-0 group-focus:opacity-100 group-hover:opacity-100 absolute w-full h-full bg-black/75 top-0 left-0 z-10 transition-opacity duration-500 grid place-items-center">
                <span className="transform scale-[25%] group-hover:scale-100 group-focus:scale-100 transition-transform duration-500 z-20 text-white text-center px-8">
                    {img.name}
                </span>
            </div>
            <img
                src={img.path}
                className="w-full h-full object-cover transform group-hover:scale-125 group-focus:scale-125 transition-transform duration-500"
            />
        </button>
    );
}

export default Image;
