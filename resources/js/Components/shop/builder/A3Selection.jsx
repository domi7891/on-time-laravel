import ProductContext from "@/Components/context/ProductContext";
import Checkbox from "@/Components/Form/Checkbox";
import { PlusCircleIcon } from "@heroicons/react/solid";
import React, { useContext, useEffect, useState } from "react";
import Spacer from "../Spacer";
import A3 from "./selections/A3";

function A3Selection() {
    const { product, changeProduct, changeA3 } = useContext(ProductContext);
    const [sites, setSites] = useState(product.a3_sites);

    const changeHasA3 = (title, e) => {
        const value = e.target.value == "true";
        if (sites.length == 0 && value) {
            changeA3(0, 1, 2);
        }
        changeProduct("a3", value);
    };

    useEffect(() => {
        console.log("Sitets changed");
        setSites(product.a3_sites);
    }, [product.a3_sites]);

    const addA3 = () => {
        changeA3(sites.length, 1, 2);
    };

    console.log(sites);

    return (
        <div className="w-full space-y-2">
            <h3 className="text-left text-xl">A3-Seiten</h3>

            <Spacer />

            <div className="w-full space-y-5">
                <div className={`w-full flex justify-start gap-10 px-2 pt-1`}>
                    <Checkbox
                        type="radio"
                        id="has_a3_yes"
                        name="has_a3"
                        title="Ja"
                        value={true}
                        checked={product.a3}
                        handleChange={changeHasA3}
                    />
                    <Checkbox
                        type="radio"
                        id="has_a3_no"
                        name="has_a3"
                        value={false}
                        title="Nein"
                        checked={!product.a3}
                        handleChange={changeHasA3}
                    />
                </div>
                {product.a3 && (
                    <div className="w-full space-y-5 ml-2 overflow-x-auto">
                        {sites.map((value, idx) => (
                            <A3
                                max={product.pages}
                                key={idx}
                                from={value.from}
                                to={value.to}
                                idx={idx}
                            />
                        ))}
                        <button
                            className="w-fit flex items-center gap-3 cursor-pointer outline-none rounded-md focus-visible:border-solid border border-transparent focus-visible:border-accent-400/50 focus-visible:ring focus-visible:ring-accent-400 focus-visible:ring-opacity-25"
                            onClick={addA3}
                        >
                            <PlusCircleIcon className="w-6 h-6 text-accent-400" />
                            <span>Seiten hinzufügen</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default A3Selection;
