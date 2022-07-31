import ProductContext from "@/Components/context/ProductContext";
import Textarea from "@/Components/Form/Textarea";
import React, { useContext } from "react";
import Spacer from "../Spacer";

function RemarkSelection() {
    const { product, changeProduct } = useContext(ProductContext);

    const onChange = (e) => {
        changeProduct("remarks", e.target.value);
    };

    return (
        <div className="w-full space-y-2">
            <h3 className="text-left text-xl">Anmerkungen</h3>

            <Spacer />

            <div className="w-full space-y-5">
                <Textarea
                    name="remarks"
                    id="remarks"
                    value={product.remarks}
                    rows={5}
                    placeholder="Ihre Anmerkungen..."
                    required={true}
                    handleChange={onChange}
                />
            </div>
        </div>
    );
}

export default RemarkSelection;
