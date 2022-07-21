import React, { useEffect, useState } from "react";
import { get, post } from "axios";
import { createCookie, getCookie } from "@/utils/helpers";

const CookieContext = React.createContext();

export function CookieProvider({ children }) {
    const [accepted, setAccepted] = useState(false);
    const [cookieSettings, setCookieSettings] = useState(false);

    useEffect(() => {
        let consent = getCookie("cookieInfoConsent");
        if (consent === "accepted") {
            setAccepted(true);
        }
    }, [setAccepted]);

    const acceptCookies = (functional = false) => {
        createCookie("cookieInfoNecessary", true);
        createCookie("cookieInfoFunctional", functional);
        createCookie("cookieInfoConsent", "accepted");
        setAccepted(true);
        window.location.reload(true);
    };

    return (
        <CookieContext.Provider
            value={{
                accepted,
                setAccepted,
                cookieSettings,
                setCookieSettings,
                acceptCookies,
            }}
        >
            {children}
        </CookieContext.Provider>
    );
}

export default CookieContext;
