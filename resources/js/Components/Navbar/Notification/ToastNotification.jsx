import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    ExclamationCircleIcon,
    CheckCircleIcon,
    XIcon,
} from "@heroicons/react/outline";
import ToastContext from "@/Components/context/ToastContext";

// const TOAST_TIME = 7500;
const TOAST_TIME = 10000;
const TOAST_SIZE = 400;

function ToastNotification({ idx, toast }) {
    const { removeToast } = useContext(ToastContext);
    const width = useRef();
    const [size, setSize] = useState(TOAST_SIZE);
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(size);
    let time = TOAST_TIME;
    let interval;
    const { id, title, content, alert } = toast;

    useEffect(() => {
        setSize(width.current.clientWidth);
        setTimeout(() => setShow(true), 50);
    }, []);

    useEffect(() => {
        update();
        return () => {
            clearInterval(interval);
        };
    }, [show]);

    const update = () => {
        if (show) {
            interval =
                !interval &&
                setInterval(() => {
                    time -= 50;
                    setProgress(
                        size - ((TOAST_TIME - time) / TOAST_TIME) * size
                    );
                    if (time <= 0) {
                        setShow(false);
                        setTimeout(() => {
                            removeToast(id);
                        }, 750);
                        clearInterval(interval);
                    }
                }, 50);
        }
    };

    const close = (idx) => {
        setShow(false);
        clearInterval(interval);
        setTimeout(() => {
            removeToast(id);
        }, 750);
    };

    const calcWidth = () => {
        return progress + "px";
    };

    return (
        <div
            id={idx}
            key={idx}
            className={`w-full relative transform transition-all ease-in-out duration-1000 ${
                show ? "translate-x-0" : "translate-x-full"
            } flex justify-center sm:justify-end px-5`}
        >
            <div
                className={`relative w-full sm:w-[400px] py-3 px-5 overflow-hidden shadow-xl rounded-md bg-white border z-10 ${
                    alert ? "border-red-500/30" : "border-green-500/30"
                }`}
                ref={width}
            >
                <div className="flex items-start gap-4">
                    <div>
                        {alert && (
                            <ExclamationCircleIcon
                                className="h-6 w-6 text-red-500"
                                aria-hidden="true"
                            />
                        )}
                        {!alert && (
                            <CheckCircleIcon
                                className="h-6 w-6 text-green-500"
                                aria-hidden="true"
                            />
                        )}
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-between">
                        <h2 className="text-base font-bold text-gray-900">
                            {title}
                        </h2>
                        <p className="text-gray-500">{content}</p>
                    </div>
                    <div className="flex h-7 items-center">
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => close(idx)}
                        >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div
                    className={`absolute h-px w-full ${
                        alert ? "bg-red-500" : "bg-green-500"
                    } bottom-0 left-0`}
                    style={{
                        width: calcWidth(),
                        transition: "all",
                        transitionDuration: "150ms",
                    }}
                ></div>
            </div>
        </div>
    );
}

export default ToastNotification;
