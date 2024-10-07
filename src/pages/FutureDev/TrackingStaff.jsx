import React from "react";
import { useStateHeaderContext } from "../../contexts/ContextProviderHeader";
import { useStateContext } from "../../contexts/ContextProvider";
import { sidebarLinksEng,sidebarLinksFa } from "../../utils/sidebarLinks";
import { textHere,TTAlertTexts } from "../../utils/intl";
import FutureDevelopmentCenter from "../../components/FutureDevelopmentCenter";

const TrackingStaff = ()=>{

    const {setHeaderContent} = useStateHeaderContext()
    const {lang} = useStateContext()
    setHeaderContent(lang==='eng'? sidebarLinksEng[5]:sidebarLinksFa[5])
    return (
          <FutureDevelopmentCenter 
        icon={sidebarLinksFa[4].icon}
        label={sidebarLinksFa[4].label}
        desc={textHere(TTAlertTexts.will_be_implemented_soon,lang)}
    />
    );
}


export default TrackingStaff