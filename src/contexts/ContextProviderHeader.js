import React, { createContext, useContext, useState } from "react";
import { logSomething } from "../utils/utils";

const StateContextHeader = createContext()



const initNotifications = { status: 'ready', items: [] }


// none - date - event_type
let initSortSettings = {
    anomaly: 'none',
    face: 'none',
    plate: 'none',
    report: 'none'
}

let initFilterSettings = {
    start_date: null,
    finish_date: null
}




export const ContextProviderHeader = ({ children }) => {


    const [notifications, setNotifications] = useState(initNotifications)
    const [sortSettings, setSortSettings] = useState(initSortSettings)
    const [filterSettings, setFilterSettings] = useState(initFilterSettings)
    const [headerContent, setHeaderContent] = useState({})



    // pass the interfaces in order to be used all over the app
    return <StateContextHeader.Provider
        value={{
            notifications, setNotifications,
            sortSettings, setSortSettings,
            filterSettings, setFilterSettings,
            headerContent, setHeaderContent,
        }}
    >
        {children}
    </StateContextHeader.Provider>
}

export const useStateHeaderContext = () => useContext(StateContextHeader)
