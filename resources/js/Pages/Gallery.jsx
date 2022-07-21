import { ImageProvider } from "@/Components/context/ImageContext";
import Image from "@/Components/Gallery/Image";
import ImageModal from "@/Components/Gallery/ImageModal";
import Pagination from "@/Components/Pagination/Pagination";
import React from "react";

function Gallery({ images, paginator }) {
    return (
        <div className="w-full pt-12 space-y-12">
            <h2 className="text-center font-semibold text-4xl">Galerie</h2>
            <Pagination
                pagination={paginator}
                headerClassName="px-8 sm:w-11/12 mx-auto"
            >
                <ImageProvider>
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 mb-8">
                        {paginator.data.map((img, idx) => (
                            <Image key={idx} img={img} />
                        ))}
                    </div>
                    <ImageModal />
                </ImageProvider>
            </Pagination>
        </div>
    );
}

export default Gallery;
