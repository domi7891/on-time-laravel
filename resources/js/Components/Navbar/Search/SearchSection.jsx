import React, { useContext, useEffect, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import Cart from "../Cart/Cart";
import CartContext from "../../context/CartContext";
import MobileSearch from "../Mobile/MobileSearch";

function SearchSection() {
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const { cart } = useContext(CartContext);

    const searchActive = () => {
        return search.length > 0;
    };

    useEffect(() => {
        if (cart?.items?.length == 0) {
            setOpenCart(false);
        }
    }, [cart]);

    return (
        <div className="flex-1 lg:flex-none flex lg:-mt-3 items-center gap-4 justify-end">
            <div className="w-auto sm:w-40 md:w-44 flex justify-end">
                <div
                    className={`relative w-auto hover:w-full flex justify-end items-center group after:bg-gray-800 after:h-px after:w-0 sm:hover:after:w-full after:absolute after:top-full transition-all duration-300 after:transition-all after:duration-300 focus-within:after:!w-full focus-within:!w-full ${
                        searchActive() ? "!w-full after:!w-full" : ""
                    }`}
                >
                    <div
                        className={`hidden sm:block w-0 active:w-full group-hover:w-full transition-all duration-300 overflow-hidden focus-within:!w-full ${
                            searchActive() ? "!w-full" : ""
                        }`}
                    >
                        <input
                            placeholder="Suchen..."
                            type="text"
                            className="w-full py-1 px-2 focus:outline-none focus:ring-0 outline-none border-none"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="hidden sm:block">
                        <SearchIcon className="h-7 w-7 text-gray-800 cursor-pointer" />
                    </button>
                    <button
                        className="sm:hidden"
                        onClick={() => setShowSearch(true)}
                    >
                        <SearchIcon className="h-7 w-7 text-gray-800 cursor-pointer" />
                    </button>
                </div>
            </div>
            <button
                className="relative cursor-pointer"
                onClick={() => setOpenCart(true)}
                tabIndex="0"
            >
                <ShoppingBagIcon className="h-7 text-gray-800" />
                {cart?.items?.length > 0 && (
                    <div className="absolute w-4 h-4 bg-accent-400 rounded-full -top-1 -right-1 flex items-center justify-center">
                        <span className="text-xs font-bold">
                            {cart.items.length}
                        </span>
                    </div>
                )}
            </button>
            <Cart open={openCart} setOpen={setOpenCart} />
            {showSearch && (
                <MobileSearch
                    isOpen={isSearchOpen}
                    setIsOpen={setIsSearchOpen}
                    setShowSearch={setShowSearch}
                />
            )}
        </div>
    );
}

export default SearchSection;
