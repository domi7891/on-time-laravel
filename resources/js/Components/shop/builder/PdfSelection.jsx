import FileInput from "@/Components/Form/FileInput";
import Input from "@/Components/Form/Input";
import PdfUpload from "@/Components/Form/PdfUpload";
import React, { useContext, useEffect, useState } from "react";
import Spacer from "../Spacer";
import { post } from "axios";
import ProductContext from "@/Components/context/ProductContext";
import CartContext from "@/Components/context/CartContext";
import ToastContext from "@/Components/context/ToastContext";
import Hint from "@/Components/Hint";

function PdfSelection() {
    const { product, changeProductMultiple } = useContext(ProductContext);
    const { cart } = useContext(CartContext);
    const { createToast } = useContext(ToastContext);

    const onAdd = async (e, setUpload) => {
        var config = {
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUpload({ progress: percentCompleted, uploading: true });
            },
        };
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("pdf", file);
        const res = await post("/product/pdf", formData, config);
        setUpload({ progress: 0, uploading: false });
        if (res.data.error) {
            createToast("Nicht Möglich!", res.data.msg, true);
        } else {
            console.log(res.data);
            changeProductMultiple({
                pdf: res.data.pdf,
                pages: res.data.pages,
            });
        }
    };

    const onRemove = async (e) => {
        const res = await post("/product/removePdf", {
            name: product.pdf.name,
        });
        changeProductMultiple({
            pdf: res.data.pdf,
            pages: res.data.pages,
        });
    };
    return (
        <div className="w-full space-y-2">
            <div className="text-left flex flex-col -space-y-0.5">
                <div className="flex gap-4 items-start relative">
                    <h3 className="text-left text-xl">PDF Upload</h3>
                    <Hint placement="auto">
                        <p className="text-sm text-left w-[270px]">
                            Bitte auch bei doppelseitigem Druck die
                            Gesamtseitenanzahl angeben!
                        </p>
                    </Hint>
                </div>
            </div>
            <Spacer />

            <div
                className={`w-full flex justify-start gap-3 sm:gap-5 overflow-x-auto p-1`}
            >
                <PdfUpload
                    type="pdf"
                    name="pdf"
                    text="PDF auswählen"
                    accept="application/pdf"
                    handleChange={onAdd}
                    onRemove={onRemove}
                    containerClass="sm:w-2/3 md:w-1/2 lg:w-2/3"
                    hasFile={cart?.items?.length > 0}
                    constantFile={cart?.items?.length > 0 ? cart.pdf : null}
                />
            </div>
        </div>
    );
}

export default PdfSelection;
