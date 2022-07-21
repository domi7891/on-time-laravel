import { Head, Link, usePage } from "@inertiajs/inertia-react";
import React, { useContext } from "react";
import { ArrowSmRightIcon } from "@heroicons/react/outline";
import Layout from "@/Layouts/Layout";
import { Inertia } from "@inertiajs/inertia";
import NavigationContext from "@/Components/context/NavigationContext";
import CustomLink from "@/Components/CustomLink";

function NotFound() {
    const { setCurrentActive } = useContext(NavigationContext);
    return (
        <>
            <Head title="OnTime | 404 Not Found" />
            <div className="flex-1 mx-auto flex flex-col items-center justify-center w-full self-center">
                <div className="hidden sm:block w-1/4 -mt-40 xl:-mt-72">
                    <img
                        src="/images/onTimeLogo.jpg"
                        onClick={() => Inertia.visit(url)}
                    ></img>
                </div>
                <div className="text-center -mt-40 sm:mt-10">
                    <p className="uppercase text-gray-600 font-semibold text-lg">
                        404 Error
                    </p>
                    <p className="text-black font-extrabold text-5xl  mt-2">
                        Seite nicht gefunden.
                    </p>
                    <p className="text-gray-600 font-semibold text-lg mt-2">
                        Dies Seite die Sie suchen konnte nicht gefunden werden.
                    </p>
                    <CustomLink href="/">
                        <div className="flex text-accent-400 items-center justify-center mt-4">
                            Zurück zu Startseite
                            <ArrowSmRightIcon className="h-6 w-6" />
                        </div>
                    </CustomLink>
                </div>
            </div>
        </>
    );
}

export default NotFound;
