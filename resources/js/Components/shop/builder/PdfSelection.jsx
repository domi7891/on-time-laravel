import FileInput from "@/Components/Form/FileInput";
import Input from "@/Components/Form/Input";
import PdfUpload from "@/Components/Form/PdfUpload";
import React from "react";
import Spacer from "../Spacer";

function PdfSelection() {
    const onAdd = (e) => {
        console.log(e);
    };

    const onRemove = (e, key) => {
        console.log("File Removed");
    };
    return (
        <div className="w-full space-y-2">
            <h3 className="text-left text-xl">PDF Upload</h3>
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
                />
            </div>
        </div>
    );
}

export default PdfSelection;
