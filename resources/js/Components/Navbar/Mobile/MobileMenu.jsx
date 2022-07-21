import React, { useEffect } from "react";
import MobileNavLink from "./MobileNavLink";
import { XIcon } from "@heroicons/react/outline";

function MobileMenu({ isOpen, setIsOpen, setShowMenu }) {
    useEffect(() => {
        setIsOpen(true);
    }, []);

    const closeMenu = () => {
        setIsOpen(false);
        setTimeout(() => setShowMenu(false), 700);
    };
    return (
        <div
            className={`lg:hidden fixed h-screen w-screen top-0 bg-white ${
                isOpen ? "left-0" : "left-full"
            } bottom-0 transition-all duration-700 grid items-center z-20`}
        >
            <button
                className="absolute top-5 right-5 text-gray-600 hover:text-gray-800"
                onClick={() => closeMenu()}
            >
                <XIcon className="w-7 h-7 " />
            </button>
            <div className="flex flex-col justify-center items-center gap-4 w-full">
                <MobileNavLink closeMenu={closeMenu} title="Home" href="/" />
                <MobileNavLink
                    closeMenu={closeMenu}
                    title="Unternehmen"
                    href="/companies"
                />
                <MobileNavLink
                    closeMenu={closeMenu}
                    title="Universitäten Fachhochschulen"
                    href="/universities"
                />
                <MobileNavLink
                    closeMenu={closeMenu}
                    title=" Allgemeine &amp; Berufsbildende Schulen"
                    href="/schools"
                />
                <MobileNavLink
                    closeMenu={closeMenu}
                    title="Bewertungen"
                    href="/ratings"
                />
                <MobileNavLink
                    closeMenu={closeMenu}
                    title="Über uns"
                    href="/aboutus"
                />
                <MobileNavLink
                    closeMenu={closeMenu}
                    title="Galerie"
                    href="/gallery"
                />
            </div>
        </div>
    );
}

export default MobileMenu;
