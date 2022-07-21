import React, { useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/outline";
import ProductDetails from "./ProductDetails";

function ProductInfo({ setTop, setIsOpen, open }) {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!open) return;
        const newHeight =
            document.querySelector("#price_info>div").clientHeight;
        setIsOpen(false);

        setTimeout(() => {
            setHeight(newHeight);
        }, 750);
    }, []);

    useEffect(() => {
        const prev = document.querySelector("#preview");
        const divHeight = document.querySelector("#shop").clientHeight;
        if (open) {
            setTop(0);
            window.scrollTo({
                behavior: "smooth",
                top: 0,
            });
            // if (top + prev.clientHeight + height > divHeight) {
            //     const newTop = divHeight - prev.clientHeight - height - 10;
            //     window.scrollTo({
            //         behavior: "smooth",
            //         top: window.scrollY + (newTop - top),
            //     });
            //     setTop(newTop < 0 ? 0 : newTop);
            // }
        } else {
            setTimeout(() => {
                const newTop = window.scrollY - 60;
                setTop(newTop < 0 ? 0 : newTop);
            }, 750);
        }
    }, [open]);
    return (
        <Disclosure>
            {({}) => {
                return (
                    <>
                        <Disclosure.Button
                            onClick={() => setIsOpen(!open)}
                            className="flex w-full justify-between items-center bg-white px-2 py-2 text-left font-semibold text-xl text-black focus:outline-none border-b"
                        >
                            <span>Preisberechnung</span>
                            <ChevronUpIcon
                                className={`transition-transform transform duration-500 ${
                                    !open ? "scale-y-100" : "-scale-y-100"
                                } h-5 w-5 text-black`}
                            />
                        </Disclosure.Button>

                        <div
                            className={`overflow-hidden text-sm ${
                                height == 0 ? "max-h-0" : "max-h-fit"
                            }`}
                            id="price_info"
                        >
                            <Transition
                                show={open}
                                enter="transition-all duration-700 ease-in-out overflow-hidden origin-top transform"
                                enterFrom="max-h-0"
                                enterTo="max-h-[1200px]"
                                leave="transition-all duration-700 ease-in-out overflow-hidden origin-top"
                                leaveFrom="max-h-[1200px]"
                                leaveTo="max-h-0"
                            >
                                <Disclosure.Panel
                                    className={`px-4 pt-4 text-gray-700 bg-white text-left space-y-4`}
                                >
                                    <ProductDetails />
                                </Disclosure.Panel>
                            </Transition>
                        </div>
                    </>
                );
            }}
        </Disclosure>
    );
}

export default ProductInfo;
