import ProductContext from "@/Components/context/ProductContext";
import Checkbox from "@/Components/Form/Checkbox";
import Hint from "@/Components/Hint";
import React, { useContext } from "react";
import Spacer from "../Spacer";

function WeightSelection() {
    const { product, changeMaterial } = useContext(ProductContext);
    return (
        <div className="w-full space-y-2">
            <div className="text-left flex flex-col -space-y-0.5">
                <span className="hidden xs:block text-left text-sm text-gray-500 opacity-0">
                    Spacing
                </span>
                <div className="flex gap-4 items-start relative">
                    <span className="text-left text-xl">Grammatur</span>
                    <Hint placement="auto">
                        <p className="text-sm text-left w-[270px]">
                            Die übliche Papierstärke beträgt 80g. <br />
                            Wir bieten auch Blattstärken mit 100g an.
                        </p>
                    </Hint>
                </div>
            </div>
            <Spacer className="xs:via-gray-300/30 xs:to-transparent" />

            <div
                className={`w-full flex xs:flex-col justify-start gap-6 xs:gap-2 sm:gap-5 px-2 pt-1`}
            >
                <Checkbox
                    type="radio"
                    id="80g"
                    name="weight"
                    title="80g"
                    checked={product.paper_weight == "80g"}
                />
                <Checkbox
                    type="radio"
                    id="100g"
                    name="weight"
                    title="100g"
                    checked={product.paper_weight == "100g"}
                />
            </div>
        </div>
    );
}

export default WeightSelection;
