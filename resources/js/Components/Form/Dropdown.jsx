import React, { useState, useContext, Fragment } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

const Trigger = ({ className, children }) => {
    return (
        <div
            className={`py-1 px-2 flex items-center justify-between gap-3.5 cursor-pointer ${className}`}
        >
            {children}
            <ChevronDownIcon className="w-4 h-4 text-gray-600" />
        </div>
    );
};

const Content = ({ children }) => {
    return children;
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Dropdown = ({
    width = "48",
    maxHeight = "32",
    contentClasses = "",
    buttonClasses = "",
    noScrollbar = false,
    pos = "bottom",
    children,
    change = () => {},
    childArray = Array(10),
}) => {
    const button = React.Children.toArray(children).filter(
        (child) => child.type.name == "Trigger"
    );
    return (
        <Menu>
            <Menu.Button
                className={`rounded border border-gray-300 outline-none focus-visible:border-solid focus-visible:border focus-visible:border-accent-400/50 focus-visible:ring focus-visible:ring-accent-400 focus-visible:ring-opacity-25 ${buttonClasses}`}
            >
                {button}
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items
                    className={`flex flex-col absolute left-0 ${
                        pos == "top"
                            ? "bottom-full mb-2 origin-bottom-left"
                            : "top-full mt-2 origin-top-left"
                    }  divide-y divide-gray-100 rounded-md bg-white shadow ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto custom-scrollbar max-h-32 z-30 ${contentClasses}`}
                >
                    {Array.from(childArray).map((value, i) => {
                        return (
                            <Menu.Item key={i}>
                                {({ active }) => (
                                    <button
                                        tabIndex={0}
                                        onClick={() => change(value)}
                                        className={`${
                                            active
                                                ? "bg-accent-400"
                                                : "bg-white"
                                        } min-w-fit px-3 py-1 w-full text-left cursor-pointer hover:bg-accent-400/75 transition-colors duration-300 `}
                                    >
                                        {value}
                                    </button>
                                )}
                            </Menu.Item>
                        );
                    })}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;

export default Dropdown;
