import React, { useContext, useState } from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import ToastWrapper from "@/Components/Navbar/Notification/ToastWrapper";
import CookiesModal from "@/Components/CookieModal";
import CookieContext from "@/Components/context/CookieContext";

export default function Layout({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { cookieSettings, accepted, acceptCookies, setCookieSettings } =
        useContext(CookieContext);

    return (
        <div className="min-h-screen bg-white flex flex-col w-full overflow-x-hidden">
            <Navbar />
            <ToastWrapper />

            <main className="max-w-max mx-auto flex flex-col flex-1 items-start w-full">
                {children}
            </main>

            <Footer />

            {!accepted && (
                <form className="fixed bottom-0 w-full bg-black/90 text-white text-sm px-10 py-5 lg:py-9 lg:flex lg:gap-20 items-start">
                    <p className="">
                        Diese Seite verwendet Cookies. Diese Cookies sind zum
                        einen Notwendige Cookies, das bedeutet sie werden
                        benötigt, damit die Webseite ordnungsgemäß funktioniert.
                        Außerdem werden Funktionale Cookies gespeichert, die
                        dabei helfen die Nutzerfreundlichkeit zu verbessern.
                    </p>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setCookieSettings(true)}
                            className="min-w-fit inline px-6 py-1.5 mt-4 lg:mt-0 rounded font-semibold ring-white hover:ring-1 transition-all duration-300"
                        >
                            Einstellungen
                        </button>
                        <button
                            type="button"
                            onClick={() => acceptCookies(true, true)}
                            className="min-w-fit inline ring-1 ring-white px-6 py-1.5 mt-4 lg:mt-0 rounded hover:text-black font-semibold hover:bg-white transition-colors duration-300"
                        >
                            Alle Akzeptieren
                        </button>
                    </div>
                </form>
            )}
            {cookieSettings && <CookiesModal />}
        </div>
    );
}
