import React, { useContext, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
// import { createCookie, getCookie } from "utils/utils";
import Toggle from "./Form/Toggle";
import CookieContext from "./context/CookieContext";
import { createCookie, getCookie } from "@/utils/helpers";

function CookiesModal() {
    const { setCookieSettings, acceptCookies } = useContext(CookieContext);
    const [showAll, setShowAll] = useState(false);
    const [showNeccesaryHint, setShowNeccesaryHint] = useState(false);
    const [showFunctionalHint, setShowFunctionalHint] = useState(false);
    let functional = getCookie("cookieInfoFunctional") === "true";

    const saveSettings = (all = false) => {
        const functional = all
            ? true
            : document.querySelector("#functional").checked;
        acceptCookies(functional);
        window.location.reload(true);
    };

    return (
        <div className="z-30 fixed inset-0 h-screen grid place-items-center">
            <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setCookieSettings(false)}
            ></div>
            <div className="relative w-11/12 max-w-lg bg-white p-5">
                <div
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={() => setCookieSettings(false)}
                >
                    <XIcon className="w-7 h-7 sm:w-6 sm:h-6" />
                </div>
                <div>
                    <div className="max-h-96 overflow-y-auto">
                        <h3 className="font-semibold">Cookie Einstellungen</h3>
                        <div className="mt-4">
                            <p
                                className={`${
                                    !showAll && "max-h-[72px]"
                                } overflow-hidden mb-2`}
                            >
                                Diese Webseite nutzt Cookies die Ihnen den
                                Umgang damit erleichtern sollen und uns dabei
                                helfen, unseren Service zu verbessern. Die
                                meisten Cookies sind notwendig um die
                                Basisfunktionalität unserer Webseite
                                gewährleisten zu können, andere werden von
                                Drittanbietern angeboten, um die
                                Nutzerfreundlichkeit zu stärken. Diese Cookies
                                werden nur mit Ihrer Erlaubnis erstellt und Sie
                                haben die Möglichkeit einige davon abzuwählen.
                                Bitte bedenken Sie, dass dies die Funktionalität
                                der Webseite beeinflussen kann.
                            </p>
                            <span
                                className="underline text-sm cursor-pointer"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? "Weniger" : "Mehr"} Anzeigen
                            </span>
                        </div>
                        <div className="mt-4">
                            <div>
                                <Toggle
                                    name="necessary"
                                    checked={true}
                                    disabled={true}
                                >
                                    <div
                                        className="flex gap-2 items-center"
                                        onClick={() =>
                                            setShowNeccesaryHint(
                                                !showNeccesaryHint
                                            )
                                        }
                                    >
                                        <span>Notwendig</span>
                                        <QuestionMarkCircleIcon className="w-5 cursor-pointer" />
                                    </div>
                                </Toggle>
                                {showNeccesaryHint && (
                                    <p className="mt-2 text-sm">
                                        Notwendige Cookies sind absolut
                                        notwendig, damit die Webseite
                                        ordnungsgemäß funktioniert. Diese
                                        Cookies gewährleisten anonym
                                        grundlegende Funktionalitäten und
                                        Sicherheitsmerkmale der Website.
                                    </p>
                                )}
                            </div>
                            <div className="mt-4">
                                <Toggle name="functional" checked={functional}>
                                    <div
                                        className="flex gap-2 items-center"
                                        onClick={() =>
                                            setShowFunctionalHint(
                                                !showFunctionalHint
                                            )
                                        }
                                    >
                                        <span>Funktional</span>
                                        <QuestionMarkCircleIcon className="w-5 cursor-pointer" />
                                    </div>
                                </Toggle>
                                {showFunctionalHint && (
                                    <p className="mt-2 text-sm">
                                        Funktionale Cookies helfen dabei,
                                        bestimmte Funktionen auszuführen, wie z.
                                        B. das Teilen des Inhalts der Website
                                        auf Social-Media-Plattformen, das
                                        Sammeln von Rückmeldungen und andere
                                        Funktionen von Drittanbietern.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="text-sm w-full flex mt-2 sm:mt-6 gap-4">
                        <button
                            className="min-w-fit inline ring-1 ring-black px-6 py-1.5 mt-4 lg:mt-0 rounded hover:text-white font-semibold hover:bg-black transition-colors duration-300"
                            onClick={() => saveSettings()}
                        >
                            Speichern
                        </button>
                        <button
                            className="min-w-fit inline px-6 py-1.5 mt-4 lg:mt-0 rounded font-semibold ring-black hover:ring-1 transition-all duration-300"
                            onClick={() => saveSettings(true)}
                        >
                            Alle Akzeptieren
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CookiesModal;
