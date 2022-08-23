import CartContext from "@/Components/context/CartContext";
import CustomLink from "@/Components/CustomLink";
import Dropdown from "@/Components/Form/Dropdown";
import { formatePrice } from "@/utils/helpers";
import { Transition } from "@headlessui/react";
import React, { useContext, useEffect, useState } from "react";

function CartItem({ idx, product, last = false, setOpen }) {
    const { cart, removeProduct, changeProduct } = useContext(CartContext);
    const [isShowing, setIsShowing] = useState(true);

    useEffect(() => {
        setIsShowing(true);
    }, [cart]);

    const remove = (productId) => {
        setIsShowing(false);
        setTimeout(() => {
            removeProduct(productId);
        }, 450);
    };

    const changeQty = (qty) => {
        const newProd = { ...product, quantity: qty };
        changeProduct(newProd);
    };
    return (
        <li className="relative">
            <Transition
                className={`relative flex py-6 `}
                as="div"
                show={isShowing}
                // enter="transform transition-transform duration-500"
                // enterFrom="translate-x-full"
                // enterTo="translate-x-0"
                leave="transform transition-transform duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
            >
                <div className="relative h-32 object-contain flex-shrink-0 overflow-hidden border border-gray-200">
                    <img
                        src={`/storage/uploads/${cart.folder_name}/${product.images.front}`}
                        // alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                    />
                    {product.images.logo && (
                        <img
                            src={`/storage/uploads/${cart.folder_name}/${product.images.logo}`}
                            // alt={product.imageAlt}
                            className="absolute top-0 left-0 h-full w-full object-cover object-center"
                        />
                    )}
                    {product.images.custom && (
                        <img
                            src={`/storage/uploads/${cart.folder_name}/${product.images.custom}`}
                            // alt={product.imageAlt}
                            className="absolute top-0 left-0 h-full w-full object-cover object-center"
                        />
                    )}
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <CustomLink
                                href={`/shop/${product.productId}`}
                                onClick={() => setOpen(false)}
                            >
                                <h3>
                                    {product.type} {product.material} -{" "}
                                    {product.color}
                                </h3>
                            </CustomLink>
                            <p className="ml-4 min-w-fit">
                                {formatePrice(product.totals.total)}
                            </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                        </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm ">
                        <div className="relative">
                            <Dropdown
                                contentClasses="flex flex-col divide-y"
                                width="20"
                                maxHeight="40"
                                pos={last ? "top" : "bottom"}
                                change={changeQty}
                            >
                                <Dropdown.Trigger>
                                    <span>{product.quantity}</span>
                                </Dropdown.Trigger>
                            </Dropdown>
                        </div>

                        <div className="flex">
                            <button
                                type="button"
                                className="font-medium text-accent-400 hover:text-accent-800 transition-colors duration-300"
                                onClick={() => remove(product.productId)}
                            >
                                Entfernen
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </li>
    );
}

export default CartItem;
