import React, { useEffect, useState } from "react";
import { get, post } from "axios";

const NavigationContext = React.createContext();

export function NavigationProvider({ children }) {
    const [currentActive, setCurrentActive] = useState(
        window.location.pathname
    );

    return (
        <NavigationContext.Provider value={{ currentActive, setCurrentActive }}>
            {children}
        </NavigationContext.Provider>
    );
}

export default NavigationContext;
