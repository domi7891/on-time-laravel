import React, { useState } from "react";
import NavLink from "./NavLink";
import SearchSection from "./Search/SearchSection";
import { MenuIcon } from "@heroicons/react/outline";
import { Link } from "@inertiajs/inertia-react";
import MobileMenu from "./Mobile/MobileMenu";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="w-full pb-1 pt-3 xl:py-3 px-4 xl:px-8 flex items-center justify-center lg:justify-between max-w-max mx-auto">
            <div className="lg:hidden flex-1">
                <button onClick={() => setShowMenu(true)}>
                    <MenuIcon className="h-8 w-8 text-gray-800 cursor-pointer" />
                </button>
            </div>
            <div className=" 2xl:w-1/12 flex-1 flex justify-center items-center lg:flex-none">
                <NavLink
                    image={true}
                    href="/"
                    className="h-20 lg:h-[72px] xl:h-20 w-[130px]"
                >
                    <img
                        src="/images/onTimeLogo.jpg"
                        className="aspect-video h-full w-full cursor-pointer"
                    />
                </NavLink>
            </div>
            <div className="flex-initial flex-grow-0 flex-shrink-0  hidden lg:flex justify-center gap-4 xl:gap-8 2xl:gap-12 pt-8">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/companies">Unternehmen</NavLink>
                <NavLink href="/universities" breakText={true}>
                    Universitäten Fachhochschulen
                </NavLink>
                <NavLink href="/schools" breakText={true}>
                    Allgemeine &amp; Berufsbildende Schulen
                </NavLink>
                <NavLink href="/ratings">Bewertungen</NavLink>
                <NavLink href="/aboutus">Über uns</NavLink>
                <NavLink href="/gallery">Galerie</NavLink>
            </div>
            <SearchSection />
            {showMenu && (
                <MobileMenu
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    setShowMenu={setShowMenu}
                />
            )}
        </div>
    );
}

export default Navbar;
