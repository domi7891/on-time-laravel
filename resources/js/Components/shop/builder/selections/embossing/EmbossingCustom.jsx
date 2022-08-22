import ProductContext from "@/Components/context/ProductContext";
import Checkbox from "@/Components/Form/Checkbox";
import PdfUpload from "@/Components/Form/PdfUpload";
import Hint from "@/Components/Hint";
import Spacer from "@/Components/shop/Spacer";
import React, { useContext, useEffect } from "react";
import { post } from "axios";
import CartContext from "@/Components/context/CartContext";

function EmbossingCustom() {
    const { product, changeEmbossingOptions } = useContext(ProductContext);
    const { reloadCart } = useContext(CartContext);

    const changeCustom = (title, e) => {
        const value = e.target.value == "true";
        changeEmbossingOptions("custom", value);
    };

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
        const res = await post("/product/custom", formData, config);
        setUpload({ progress: 0, uploading: false });
        if (res.data.error) {
            createToast("Nicht Möglich!", res.data.msg, true);
        } else {
            if (res.data.folder_created) {
                await reloadCart();
            }
            changeEmbossingOptions("custom_options", res.data.custom);
        }
    };

    const onRemove = async (e) => {
        const res = await post("/product/removeCustom", {
            name: product.embossing_options.custom_options.name,
        });
        changeEmbossingOptions("custom_options", res.data.custom);
    };

    return (
        <div className="w-full space-y-2">
            <div className="text-left flex flex-col -space-y-0.5">
                <div className="flex gap-4 items-start relative">
                    <h3 className="text-left text-xl">
                        Eigene Buchvorderseite
                    </h3>
                    <Hint placement="auto">
                        <div className="space-y-2">
                            <p className="text-sm text-left w-[270px]">
                                Bitte beachten Sie, dass die PDF Datei für die
                                personalisierte Prägung nur in Schwarz/Weiß sein
                                darf. Wenn Sie Grafiken in der Datei verwenden,
                                achten Sie bitte darauf, dass diese eine
                                Mindestauflösung von 400dpi haben.
                            </p>
                        </div>
                    </Hint>
                </div>
            </div>

            <Spacer />

            <div className="w-full space-y-5">
                <div className={`w-full flex justify-start gap-10 px-2 pt-1`}>
                    <Checkbox
                        type="radio"
                        id="has_emb_custom_yes"
                        name="has_emb_custom"
                        title="Ja"
                        value={true}
                        checked={product.embossing_options.custom}
                        handleChange={changeCustom}
                    />
                    <Checkbox
                        type="radio"
                        id="has_emb_custom_no"
                        name="has_emb_custom"
                        value={false}
                        title="Nein"
                        checked={!product.embossing_options.custom}
                        handleChange={changeCustom}
                    />
                </div>
                {product.embossing_options.custom && (
                    <div
                        className={`w-full flex justify-start gap-3 sm:gap-5 overflow-x-auto p-1`}
                    >
                        <PdfUpload
                            type="pdf"
                            name="custom_pdf"
                            text="PDF auswählen"
                            accept="application/pdf"
                            handleChange={onAdd}
                            onRemove={onRemove}
                            containerClass="sm:w-2/3 md:w-1/2 lg:w-2/3"
                            hasFile={
                                product.embossing_options.custom &&
                                product.embossing_options.custom_options?.name
                            }
                            constantFile={
                                product.embossing_options.custom_options
                            }
                            canRemove={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmbossingCustom;
