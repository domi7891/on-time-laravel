import { Popover, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

function Hint({
    content,
    children,
    placement = "auto-start",
    contentClass = "",
}) {
    let [referenceElement, setReferenceElement] = useState();
    let [popperElement, setPopperElement] = useState();
    let { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: placement,
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 10],
                },
            },
        ],
    });
    return (
        <Popover className="relative flex items-center z-40">
            <Popover.Button ref={setReferenceElement}>
                <QuestionMarkCircleIcon className="w-6 h-6 text-accent-400" />
            </Popover.Button>

            <Transition
                enter="transition duration-300 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition duration-150 ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Popover.Panel
                    className={`absolute bg-white p-3 drop-shadow-lg shadow-md`}
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {children}
                    {!children && content && (
                        <p className={`text-sm text-left ${contentClass}`}>
                            {content}
                        </p>
                    )}
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}

export default Hint;
