import "./bootstrap";
import "../css/app.css";

import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import Layout from "@/Layouts/Layout";
import { ToastProvider } from "./Components/context/ToastContext";
import { CartProvider } from "./Components/context/CartContext";
import { NavigationProvider } from "./Components/context/NavigationContext";
import { CookieProvider } from "./Components/context/CookieContext";

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        return render(
            <CookieProvider>
                <NavigationProvider>
                    <ToastProvider>
                        <CartProvider>
                            <Layout>
                                <App {...props} />
                            </Layout>
                        </CartProvider>
                    </ToastProvider>
                </NavigationProvider>
            </CookieProvider>,
            el
        );
    },
});

InertiaProgress.init({ color: "#e6b000" });
