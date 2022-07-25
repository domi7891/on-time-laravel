import React, { useState } from "react";

const ToastContext = React.createContext();

let newID = 1;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const createToast = (title, content, alert = false) => {
        // const lastId = toasts.map((toast) => toast.id);
        // console.log(lastId);
        // const newId = (lastId.length > 0 ? Math.max(...lastId) : 0) + 1;
        const toast = {
            id: newID,
            title: title,
            content: content,
            alert: alert,
        };
        newID++;
        addToast(toast);
    };

    const addToast = (toast) => {
        setToasts((prevState) => {
            return [...prevState, toast];
        });
    };
    const removeToast = (id) => {
        newID--;
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
