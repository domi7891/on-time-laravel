import ToastContext from "@/Components/context/ToastContext";
import React, { useContext } from "react";
import ToastNotification from "./ToastNotification";

function ToastWrapper() {
    const { toasts } = useContext(ToastContext);
    return (
        <div className="fixed w-full top-4 right-0 flex flex-col gap-2 z-50">
            {toasts &&
                toasts.map((toast, idx) => {
                    return (
                        <ToastNotification
                            key={toast.id}
                            idx={idx}
                            toast={toast}
                        />
                    );
                })}
        </div>
    );
}

export default ToastWrapper;
