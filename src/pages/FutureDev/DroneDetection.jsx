import React from "react";
import { useStateHeaderContext } from "../../contexts/ContextProviderHeader";
import { useStateContext } from "../../contexts/ContextProvider";
import { sidebarLinksEng,sidebarLinksFa } from "../../utils/sidebarLinks";
import { textHere,TTAlertTexts } from "../../utils/intl";
import FutureDevelopmentCenter from "../../components/FutureDevelopmentCenter";
const DroneDetection = ()=>{

    const {setHeaderContent} = useStateHeaderContext()
    const {lang} = useStateContext()
    setHeaderContent(lang==='eng'? sidebarLinksEng[4]:sidebarLinksFa[4])
    return (
        <FutureDevelopmentCenter 
        icon={sidebarLinksFa[3].icon}
        label={sidebarLinksFa[3].label}
        desc={textHere(TTAlertTexts.will_be_implemented_soon,lang)}
    />
    );
}


export default DroneDetection