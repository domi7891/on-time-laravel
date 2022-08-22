import React, { useContext, useEffect, useState } from "react";
import { get, post } from "axios";
import ToastContext from "./ToastContext";
import { Inertia } from "@inertiajs/inertia";

const CartContext = React.createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({});

    const { createToast } = useContext(ToastContext);

    useEffect(() => {
        get("/basket/get").then((res) => {
            setCart(res.data);
        });
    }, []);

    const reloadCart = () => {
        get("/basket/get").then((res) => {
            setCart(res.data);
        });
    };

    const addToCart = (product) => {
        post("/basket/addProduct", product).then((res) => {
            if (!res.data.success || res.data.error) {
                createToast("Achtung!", res.data.error, true);
            } else {
                const { success, ...data } = res.data;
                setCart(data.cart);
                createToast(
                    "Neues Produkt hinzugefügt!",
                    "Ihr Produkt wurde zum Warenkorb hinzugefügt"
                );
                Inertia.get(window.location.href);
            }
        });
    };

    const removeProduct = (id) => {
        post("/basket/removeProduct", {
            id,
        }).then((res) => {
            const { success, ...data } = res.data;
            setCart(data.cart);
        });
    };

    const changeProduct = (product) => {
        let url = "/basket/changeProduct";
        post(url, product).then((res) => {
            const { success, ...data } = res.data;
            setCart(data.cart);
        });
    };

    const productCount = () => {
        return cart.items?.length;
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeProduct,
                reloadCart,
                changeProduct,
                productCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
