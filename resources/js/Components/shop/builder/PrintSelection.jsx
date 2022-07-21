import ProductContext from "@/Components/context/ProductContext";
import Checkbox from "@/Components/Form/Checkbox";
import Hint from "@/Components/Hint";
import React, { useContext } from "react";
import Spacer from "../Spacer";

function PrintSelection() {
    const { product, changeProduct } = useContext(ProductContext);

    const change = (title) => changeProduct("print", title);

    return (
        <div className="w-full space-y-2">
            <div className="text-left flex flex-col -space-y-0.5">
                <div className="flex gap-4 items-start relative">
                    <span className="text-left text-xl">Druck</span>
                    <Hint placement="auto">
                        <p className="text-sm text-left w-[270px]">
                            Bitte auch bei doppelseitigem Druck die
                            Gesamtseitenanzahl angeben!
                        </p>
                    </Hint>
                    {/* <Hint
                        placement="auto"
                        content="Bitte auch bei doppelseitigem Druck die
                        Gesamtseitenanzahl angeben!"
                        contentClass="w-[200px]"
                    /> */}
                </div>
                <span className="text-left text-sm text-gray-500">
                    - Immer in Farbe -
                </span>
            </div>
            <Spacer className="xs:via-gray-300/30 xs:to-transparent" />

            <div
                className={`w-full flex xs:flex-col justify-start gap-6 xs:gap-2 sm:gap-5 px-2 pt-1`}
            >
                <Checkbox
                    type="radio"
                    id="einseitig"
                    name="print"
                    title="Einseitig"
                    checked={product.print == "Einseitig"}
                    handleChange={change}
                />
                <Checkbox
                    type="radio"
                    id="doppelseitig"
                    name="print"
                    title="Doppelseitig"
                    checked={product.print == "Doppelseitig"}
                    handleChange={change}
                />
            </div>
        </div>
    );
}

export default PrintSelection;
