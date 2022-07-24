import ProductContext from "@/Components/context/ProductContext";
import { formatePrice, TOTALS } from "@/utils/helpers";
import React, { useContext } from "react";

function ProductDetails() {
    const { product, totals } = useContext(ProductContext);
    return (
        <div>
            <div className="divide-y divide-gray-400 space-y-1">
                <h3 className="text-lg">Bindung</h3>
                <div className="divide-y divide-gray-200 child:py-2">
                    <div>Stückzahl: {product.quantity}</div>
                    <div>
                        Bindung: {product.type}
                        <span className="float-right">
                            {formatePrice(totals.basePrice)}
                        </span>
                    </div>
                    {product.material && (
                        <div>
                            Material{" "}
                            {product.type.includes("Spiral") ? "der" : "des"}{" "}
                            {product.type}: {product.material}
                        </div>
                    )}
                    {product.color && (
                        <div>
                            Farbe des {product.type}: {product.color}
                        </div>
                    )}
                </div>
            </div>
            <div className="divide-y divide-gray-400 space-y-1">
                <h3 className="text-lg">Prägung</h3>
                <div className="divide-y divide-gray-200 child:py-2">
                    {!product.embossing && (
                        <p className="py-2">Keine Prägung</p>
                    )}
                    {product.embossing && (
                        <>
                            <div>
                                Prägung: {product.embossing_options.method}
                                {totals.extras.prägung && (
                                    <span className="float-right">
                                        + {formatePrice(totals.extras.prägung)}
                                    </span>
                                )}
                            </div>
                            <div>
                                Präge-Farbe: {product.embossing_options.color}
                            </div>
                            {product.embossing_options.custom && (
                                <div>
                                    Eigene Buchvorderseite:
                                    <br />
                                    <span className="pl-5">
                                        {
                                            product.embossing_options
                                                .custom_options.displayName
                                        }
                                    </span>
                                </div>
                            )}
                            {product.embossing_options.schoollogo && (
                                <div>
                                    Schullogo:{" "}
                                    {
                                        product.embossing_options
                                            .schoollogo_options.name
                                    }
                                    {totals.extras.logo && (
                                        <span className="float-right">
                                            + {formatePrice(totals.extras.logo)}
                                        </span>
                                    )}
                                </div>
                            )}
                            {product.embossing_options.text.front && (
                                <div>
                                    Vorderseite Text:
                                    {Object.entries(
                                        product.embossing_options.text
                                            .front_text
                                    ).map(([key, val], idx) => {
                                        return (
                                            <div key={idx}>
                                                <span className="pl-5">
                                                    {key}: {val.text},{" "}
                                                    {val.size}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {product.embossing_options.text.back && (
                                <div>
                                    Buchrücken Text:
                                    <br />
                                    <span className="pl-5">
                                        Position:{" "}
                                        {
                                            product.embossing_options.text
                                                .back_text.position
                                        }
                                    </span>
                                    {product.embossing_options.text.back_text
                                        .text && (
                                        <>
                                            <br />
                                            <span className="pl-5">
                                                Text:{" "}
                                                {
                                                    product.embossing_options
                                                        .text.back_text.text
                                                }
                                            </span>
                                        </>
                                    )}
                                    {product.embossing_options.text.back_text
                                        .left && (
                                        <>
                                            <br />
                                            <span className="pl-5">
                                                Linksbündig:{" "}
                                                {
                                                    product.embossing_options
                                                        .text.back_text.left
                                                }
                                            </span>
                                        </>
                                    )}
                                    {product.embossing_options.text.back_text
                                        .right && (
                                        <>
                                            <br />
                                            <span className="pl-5">
                                                Rechtsbündig:{" "}
                                                {
                                                    product.embossing_options
                                                        .text.back_text.right
                                                }
                                            </span>
                                        </>
                                    )}
                                    <br />
                                    <span className="pl-5">
                                        Schriftgröße:{" "}
                                        {
                                            product.embossing_options.text
                                                .back_text.size
                                        }
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="divide-y divide-gray-400 space-y-1">
                <h3 className="text-lg">Papier und Druck</h3>
                <div className="divide-y divide-gray-200 child:py-2">
                    <p>Bedruck: {product.print}</p>
                    <p>
                        Grammatur des Papiers: {product.paper_weight}
                        {totals.extras.weight && (
                            <span className="float-right">
                                + {formatePrice(totals.extras.weight)}
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <div className="divide-y divide-gray-400 space-y-1">
                <h3 className="text-lg">PDF</h3>
                <div className="divide-y divide-gray-200 child:py-2">
                    {product.pdf && (
                        <p className="truncate">{product.pdf.display_name}</p>
                    )}
                    <p>Seitenzahl: {product.pages}</p>
                </div>
            </div>

            {product.a3 && product.remarks && product.remarks.length > 0 && (
                <div className="divide-y divide-gray-400 space-y-1">
                    <h3 className="text-lg">Informationen</h3>
                    <div className="divide-y divide-gray-200 child:py-2">
                        {product.a3 && (
                            <div>
                                A3:
                                {totals.extras.a3 && (
                                    <span className="float-right">
                                        + {formatePrice(totals.extras.a3)}
                                    </span>
                                )}
                                {product.a3_sites.map((val, idx) => {
                                    return (
                                        <div key={idx}>
                                            von {val.from} bis {val.to}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {product.remarks && product.remarks.length > 0 && (
                            <p className="w-full">
                                Anmerkungen:
                                <br />
                                <span className="line-clamp-5">
                                    {product.remarks}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            )}

            {(product.equipment["CD"].selected ||
                product.equipment["USB"].selected) && (
                <div className="divide-y divide-gray-400 space-y-1">
                    <h3 className="text-lg">Extras</h3>
                    <div className="divide-y divide-gray-200 child:py-2">
                        {product.equipment["CD"].selected && (
                            <div>
                                CD: {product.equipment["CD"].quantity} Stück
                                <span className="float-right">
                                    +{" "}
                                    {formatePrice(totals.equipment["CD"].total)}
                                </span>
                            </div>
                        )}
                        {product.equipment["USB"].selected && (
                            <div>
                                USB: {product.equipment["USB"].quantity} Stück
                                <span className="float-right">
                                    +{" "}
                                    {formatePrice(
                                        totals.equipment["USB"].total
                                    )}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetails;
