import React, { useEffect, useRef, useState } from "react";
import { XIcon } from "@heroicons/react/outline";

function FileInput({
    title,
    multiple = false,
    text,
    hint,
    name,
    accept,
    containerClass,
    labelClass,
    required,
    isFocused,
    handleChange = () => {},
    onRemove = () => {},
}) {
    const input = useRef();
    const [files, setFiles] = useState({});

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const hasFiles = () => {
        return files && Object.entries(files).length > 0;
    };

    const fileChanged = (e) => {
        const dt = new DataTransfer();
        Object.entries(files).forEach(([orgKey, file], idx) => {
            dt.items.add(file);
        });
        Object.entries(input.current.files).forEach(([orgKey, file], idx) => {
            dt.items.add(file);
        });
        input.current.files = dt.files;
        setFiles(input.current.files);
        handleChange(e);
    };

    const removeFile = (e, key) => {
        e.preventDefault();
        const dt = new DataTransfer();
        Object.entries(input.current.files).forEach(([orgKey, file], idx) => {
            if (orgKey != key) dt.items.add(file);
        });
        input.current.files = dt.files;
        setFiles(input.current.files);
        onRemove(e, key);
    };

    const disabled = () => {
        return !multiple && hasFiles();
    };

    return (
        <div className={containerClass}>
            {title && (
                <label
                    className={`block text-sm font-medium text-gray-600 ${labelClass} ${
                        required ? "after:content-['*'] after:text-red-400" : ""
                    }`}
                >
                    {title}
                </label>
            )}
            <label
                htmlFor={name}
                className={`relative rounded-md font-medium text-accent-400 hover:text-accent-800 ${
                    disabled() ? "cursor-auto" : "cursor-pointer"
                }`}
            >
                <div
                    className={`mt-1 flex justify-center px-4 border-2 border-gray-300 border-dashed rounded-md focus-within:outline-none focus-within:border-solid focus-within:border focus-within:border-accent-400/50 focus-within:ring focus-within:ring-accent-400 focus-within:ring-opacity-25 shadow-sm ${
                        hasFiles() ? "pt-2" : "pt-5"
                    } ${multiple ? "pb-5" : hasFiles() ? "pb-2" : "pb-5"} ${
                        disabled() ? "bg-gray-300" : "bg-white"
                    }`}
                >
                    <div className="w-full space-y-1 text-center">
                        <div
                            className={`w-full flex flex-col text-sm text-gray-600`}
                        >
                            {hasFiles() && (
                                <div className="flex flex-col divide-y max-h-32 overflow-y-auto custom-scrollbar">
                                    {Object.entries(files).map(
                                        ([key, file], idx) => {
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`w-full flex justify-between px-2 py-2.5`}
                                                >
                                                    <span>{file.name}</span>
                                                    <XIcon
                                                        className="w-4 h-4 cursor-pointer"
                                                        onClick={(e) =>
                                                            removeFile(e, key)
                                                        }
                                                    />
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                            {!hasFiles() && (
                                <div>
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            )}
                            {(multiple || (!multiple && !hasFiles())) && (
                                <div>
                                    <span className="pt-2">{text}</span>
                                    <p className="text-xs text-gray-500">
                                        {hint}
                                    </p>
                                </div>
                            )}

                            <input
                                id={name}
                                name={name}
                                type="file"
                                className="sr-only"
                                multiple={multiple}
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

export default FileInput;
