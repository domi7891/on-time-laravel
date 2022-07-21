import { XIcon, DocumentIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import PdfIcon from "/public/images/pdf.svg";

function PdfUpload({
    text,
    name,
    accept,
    containerClass,
    required,
    isFocused,
    handleChange = () => {},
    onRemove = () => {},
}) {
    const input = useRef();
    const [file, setFile] = useState();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const fileChanged = (e) => {
        setFile(input.current.files[0]);
        handleChange(e);
    };

    const removeFile = (e) => {
        e.preventDefault();
        setFile(null);
        onRemove(e);
    };

    const disabled = () => {
        return file != null;
    };

    return (
        <div className={`w-full ${containerClass}`}>
            <label
                htmlFor={name}
                className={`w-full relative rounded-md font-medium text-accent-400 hover:text-accent-800 ${
                    disabled() ? "cursor-auto" : "cursor-pointer"
                }`}
            >
                <div
                    className={`w-full mt-1 flex justify-center px-4 py-2 border rounded-md focus-within:outline-none focus-within:border-solid focus-within:border focus-within:border-accent-400/50 focus-within:ring focus-within:ring-accent-400 focus-within:ring-opacity-25 shadow-sm ${
                        disabled()
                            ? "bg-gray-400/30 border-transparent"
                            : "bg-white border-gray-300"
                    }`}
                >
                    <div className="w-full space-y-1 text-center">
                        <div
                            className={`w-full flex flex-col text-sm text-gray-600`}
                        >
                            {disabled() && (
                                <div className="flex flex-col divide-y max-h-32 overflow-y-auto custom-scrollbar">
                                    <div
                                        className={`flex justify-between items-center gap-3 font-semibold`}
                                    >
                                        <span className="w-full truncate">
                                            {input?.current?.files[0].name}
                                        </span>
                                        <button onClick={(e) => removeFile(e)}>
                                            <XIcon className="w-4 h-4 cursor-pointer" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {!disabled() && (
                                <div className="w-full flex justify-between">
                                    <span>{text}</span>
                                    <img src={PdfIcon} className="w-5 h-5" />
                                </div>
                            )}
                            <input
                                id={name}
                                name={name}
                                type="file"
                                className="sr-only"
                                multiple={false}
                                required={required}
                                onChange={(e) => fileChanged(e)}
                                ref={input}
                                accept={accept}
                                disabled={disabled()}
                            />
                        </div>
                    </div>
                </div>
            </label>
        </div>
    );
}

export default PdfUpload;
