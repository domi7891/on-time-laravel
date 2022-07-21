import React, { useState } from "react";

const ToastContext = React.createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const createToast = (title, content, alert = false) => {
        const lastId = toasts.map((toast) => toast.id);
        const newId = (lastId.length > 0 ? Math.max(...lastId) : 0) + 1;
        const toast = {
            id: newId,
            title: title,
            content: content,
            alert: alert,
        };
        addToast(toast);
    };

    const addToast = (toast) => {
        setToasts((prevState) => {
            return [...prevState, toast];
        });
    };
    const removeToast = (id) => {
        setToasts((prevState) => {
            let newarr = [...prevState];
            newarr = newarr.filter((toast) => toast.id != id);
            return newarr;
        });
    };
    return (
        <ToastContext.Provider value={{ toasts, createToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export default ToastContext;
