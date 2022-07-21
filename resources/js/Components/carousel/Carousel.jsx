import React, { useContext, useEffect, useState } from "react";
import PreviewContext from "../context/PreviewContext";

function Carousel({ id, children, hideArrows }) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [elements, setElements] = useState([]);
    const [currentActive, setCurrentActive] = useState();
    const { sideHidden } = useContext(PreviewContext);

    useEffect(() => {
        setElements(document.querySelectorAll("[data-carousel-item]"));
        setCurrentActive(
            document.querySelector("[data-carousel-item='active']")
        );

        elements.forEach((element, idx) => {
            if (idx == currentIdx) {
                element.classList.remove("hidden");
            } else {
                element.classList.add("hidden");
            }
        });
    }, [currentIdx, currentActive]);

    useEffect(() => {
        setCurrentIdx(0);
        const elems = document.querySelectorAll("[data-carousel-item]");
        setElements(elems);
        setCurrentActive(elems[0]);

        elems.forEach((element, idx) => {
            if (idx == 0) {
                element.classList.remove("hidden");
                element.style.transform = "translateX(0)";
            } else {
                element.classList.add("hidden");
            }
        });
    }, [sideHidden]);

    const next = () => {
        let newIdx = currentIdx + 1;
        if (newIdx == elements.length) {
            newIdx = 0;
        }
        goTo(newIdx, true);
    };

    const prev = () => {
        let newIdx = currentIdx - 1;
        if (newIdx < 0) {
            newIdx = elements.length - 1;
        }
        goTo(newIdx);
    };

    const goTo = (idx, next = false) => {
        if (elements.length == 1) return;
        let newIdx = idx;
        currentActive.dataset.carouselItem = "true";
        if (next) {
            currentActive.style.transform = "translateX(-100%)";
            elements[newIdx].style.transform = "translateX(0)";
        } else {
            currentActive.style.transform = "translateX(100%)";
            elements[newIdx].style.transform = "translateX(0)";
        }
        elements[newIdx].dataset.carouselItem = "active";
        setTimeout(() => setCurrentIdx(newIdx), 700);
    };

    return (
        <div
            id={id}
            className="relative w-full max-w-[215px] sm:max-w-[320px]"
            data-carousel="static"
        >
            <div className="relative h-full overflow-hidden flex justify-center">
                {children}
            </div>
            {!hideArrows && (
                <button
                    type="button"
                    className="absolute top-0 right-full z-10 flex items-center justify-center h-full px-2 sm:px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev
                    onClick={prev}
                >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black/40  group-hover:bg-black/75 group-focus:bg-black/75 group-focus:ring-4 group-focus:ring-black/50  group-focus:outline-none transition duration-300">
                        <svg
                            className="w-5 h-5 text-white sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                        <span className="hidden">Previous</span>
                    </span>
                </button>
            )}
            {!hideArrows && (
                <button
                    type="button"
                    className="absolute top-0 left-full z-10 flex items-center justify-center h-full px-2 sm:px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next
                    onClick={next}
                >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black/40 group-hover:bg-black/75 group-focus:bg-black/75 group-focus:ring-4 group-focus:ring-black/50 group-focus:outline-none transition duration-300">
                        <svg
                            className="w-5 h-5 text-white sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            ></path>
                        </svg>
                        <span className="hidden">Next</span>
                    </span>
                </button>
            )}
            <div className="absolute z-10 flex space-x-3 -translate-x-1/2 translate-y-3 top-full left-1/2">
                {React.Children.toArray(children).map((el, idx) => {
                    return (
                        <button
                            key={idx}
                            type="button"
                            className={`transition-colors duration-500 w-6 h-1 ${
                                currentIdx == idx
                                    ? "bg-gray-700"
                                    : "bg-gray-200"
                            }`}
                            aria-current="false"
                            aria-label={
                                idx == 0 ? "Front Preview" : "SidePreview"
                            }
                            data-carousel-slide-to={idx}
                            onClick={() => goTo(idx)}
                        ></button>
                    );
                })}
            </div>
        </div>
    );
}

export default Carousel;
