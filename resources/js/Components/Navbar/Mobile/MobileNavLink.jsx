import { Link } from "@inertiajs/inertia-react";
import React, { useContext } from "react";
import NavigationContext from "../../context/NavigationContext";

function MobileNavLink({ href, title, closeMenu }) {
    const { currentActive, setCurrentActive } = useContext(NavigationContext);
    const active = currentActive == href;
    const linkClicked = () => {
        setCurrentActive(href);
        setTimeout(() => closeMenu(), 500);
    };
    return (
        <Link
            onClick={linkClicked}
            title={title}
            href={href}
            className={`w-full text-center relative text-lg text-black`}
            preserveState={true}
        >
            <div className="flex gap-2 items-center justify-center">
                <div
                    className={`${
                        active ? "w-7" : "w-0"
                    } h-[1px] bg-accent-400 transition-all duration-500`}
                ></div>
                <span
                    className={`${
                        active ? "font-bold" : ""
                    } transition-all duration-300`}
                >
                    {title}
                </span>
                <div
                    className={`${
                        active ? "w-7" : "w-0"
                    } h-[1px] bg-accent-400 transition-all duration-500`}
                ></div>
            </div>
        </Link>
    );
}

export default MobileNavLink;
