import { usePage } from "@inertiajs/inertia-react";
import React from "react";
import CustomLink from "../CustomLink";
import Hint from "../Hint";

function ProductCard({ product, currentUrl }) {
    const facility = currentUrl.replace("/", "");
    return (
        <div className="w-full flex flex-col gap-3 md:flex-row md:gap-8 xl:flex-col mx-auto">
            <CustomLink
                href={`/shop/${facility}/${product.props}`}
                className="w-full rounded-sm overflow-hidden group"
            >
                <img
                    className="w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    style={{ aspectRatio: "3/2" }}
                    src={product.imgSrc}
                ></img>
            </CustomLink>
            <div className="w-full text-left">
                <CustomLink href={`/shop/${facility}/${product.props}`}>
                    <h3 className="uppercase font-bold tracking-tightere text-lg">
                        {product.title}
                    </h3>
                </CustomLink>
                <p className="mt-2 text-gray-800 text-left mb-1">
                    {product.content}
                </p>
                {product.hint && (
                    <Hint>
                        <div className="space-y-2">
                            {product.hint.map((hint, idx) => (
                                <p key={idx} className="text-sm">
                                    <b>{hint.title}</b>: {hint.content}
                                </p>
                            ))}
                        </div>
                    </Hint>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
