import { Fragment, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import CartContext from "@/Components/context/CartContext";
import { formatePrice } from "@/utils/helpers";
import CartItem from "./CartItem";

export default function Cart({ open, setOpen }) {
    const { cart } = useContext(CartContext);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/80 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen sm:max-w-md">
                                    <div className="flex h-full flex-col bg-white shadow-xl">
                                        <div className="flex-1 flex flex-col overflow-y-hidden py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="uppercase text-lg font-medium text-gray-800">
                                                    Warenkrob
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 text-gray-600 hover:text-gray-800"
                                                        onClick={() =>
                                                            setOpen(false)
                                                        }
                                                    >
                                                        <span className="sr-only">
                                                            Close panel
                                                        </span>
                                                        <XIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex-1 mt-8 overflow-hidden">
                                                <div className="flow-root h-full overflow-hidden">
                                                    <ul
                                                        role="list"
                                                        className="h-full -my-6 divide-y divide-gray-200 flex flex-col overflow-x-hidden overflow-y-auto custom-scrollbar pr-2"
                                                    >
                                                        {cart?.items?.map(
                                                            (product, idx) => (
                                                                <CartItem
                                                                    setOpen={
                                                                        setOpen
                                                                    }
                                                                    idx={idx}
                                                                    key={idx}
                                                                    product={
                                                                        product
                                                                    }
                                                                    last={
                                                                        cart
                                                                            .items
                                                                            .length >
                                                                            5 &&
                                                                        idx ==
                                                                            cart
                                                                                .items
                                                                                .length -
                                                                                1
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p className="font-semibold">
                                                    Gesamtsumme
                                                </p>
                                                <p>
                                                    {formatePrice(
                                                        cart?.totals?.subtotal
                                                    )}
                                                </p>
                                            </div>
                                            <p className="-mt-0.5 text-sm text-gray-500">
                                                inklusive gesetzlicher Ust.
                                            </p>
                                            <div className="mt-6 flex gap-6">
                                                <a
                                                    href="#"
                                                    className="w-full flex items-center justify-center rounded-md bg-white border border-accent-400 py-2 text-base font-medium text-black shadow-sm hover:bg-accent-400 transition-colors duration-300"
                                                >
                                                    Warenkorb anzeigen
                                                </a>
                                                <a
                                                    href="#"
                                                    className="w-full flex items-center justify-center rounded-md bg-accent-400 py-2 text-base font-medium text-black shadow-sm hover:bg-accent-800 hover:text-white transition-colors duration-300"
                                                >
                                                    Kassa
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
