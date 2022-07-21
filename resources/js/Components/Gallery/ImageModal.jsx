import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext } from "react";
import ImageContext from "../context/ImageContext";
import { XIcon } from "@heroicons/react/outline";

function ImageModal() {
    const { image, isOpen, hideImageModal } = useContext(ImageContext);
    return (
        <Transition
            show={isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
            <Dialog onClose={() => hideImageModal()} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-black/80"
                        aria-hidden="true"
                    />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="relative zmx-auto w-full lg:w-2/3 max-w-5xl text-white text-center">
                            <div className="flex gap-2 justify-center items-center mb-4">
                                <Dialog.Title className="text-2xl flex-1">
                                    {image?.name}
                                </Dialog.Title>
                                <button
                                    className=""
                                    onClick={() => hideImageModal()}
                                >
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <img
                                src={image?.path}
                                className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-500"
                            />
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}

export default ImageModal;
