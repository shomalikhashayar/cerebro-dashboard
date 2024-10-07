import React from "react";
import { useStateHeaderContext } from "../../contexts/ContextProviderHeader";
import { useStateContext } from "../../contexts/ContextProvider";
import { sidebarLinksEng,sidebarLinksFa } from "../../utils/sidebarLinks";
import { textHere,TTAlertTexts } from "../../utils/intl";
import FutureDevelopmentCenter from "../../components/FutureDevelopmentCenter";

const LeftoverDetection = ()=>{

    const {setHeaderContent} = useStateHeaderContext()
    const {lang} = useStateContext()
    setHeaderContent(lang==='eng'? sidebarLinksEng[6]:sidebarLinksFa[6])
    return (
         <FutureDevelopmentCenter 
        icon={sidebarLinksFa[5].icon}
        label={sidebarLinksFa[5].label}
        desc={textHere(TTAlertTexts.will_be_implemented_soon,lang)}
    />
    );
}


export default LeftoverDetection