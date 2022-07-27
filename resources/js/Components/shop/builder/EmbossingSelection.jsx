import ProductContext from "@/Components/context/ProductContext";
import Hint from "@/Components/Hint";
import React, { useContext } from "react";
import Spacer from "../Spacer";
import Embossing from "./selections/Embossing";

function EmbossingSelection() {
    const { product } = useContext(ProductContext);
    return product.type == "Hardcover" ? (
        <div className="w-full space-y-2">
            <div className="text-left flex flex-col -space-y-0.5">
                <div className="flex gap-4 items-start relative">
                    <h3 className="text-left text-xl">Prägung</h3>
                    <Hint placement="auto">
                        <p className="text-sm text-left w-[270px]">
                            Um ein optimales Prägeergebnis zu garantieren, ist
                            eine Prägung nur in Leder- oder Leinenvariante
                            möglich!
                        </p>
                    </Hint>
                </div>
            </div>
            <Spacer />

            <div className={`w-full flex justify-start gap-3 sm:gap-5 p-1`}>
                {product.material == "Standard" ? (
                    <p className="text-left">
                        Prägungen sind nur in Leder- und Leinenoptik möglich!
                    </p>
                ) : (
                    <Embossing />
                )}
            </div>
        </div>
    ) : null;
}

export default EmbossingSelection;
