import React, { createContext, useContext, useState } from "react";
import { logSomething } from "../utils/utils";


const StateContext = createContext()


export const ContextProvider = ({ children }) => {

    // reading local storage for basic parameters
    const login_ = localStorage.getItem('login')
    const lang_ = localStorage.getItem('lang')
    const [login, setLogin] = useState(login_ == null ? false : login_);
    const [lang, setLang] = useState(lang_ ?? 'fa' )
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const mode = localStorage.getItem('theme')
    logSomething(mode)
    const [theme, setTheme] = useState(mode ??  'light');


    return <StateContext.Provider
        value={{
            login, setLogin,
            sidebarCollapsed, setSidebarCollapsed,
            theme, setTheme,
            lang,setLang,
        }}
    >
        {children}
    </StateContext.Provider>
}

export const useStateContext = () => useContext(StateContext)
