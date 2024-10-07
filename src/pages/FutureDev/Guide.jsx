import React from 'react';
import {sidebarLinksFa,sidebarLinksEng} from "../../utils/sidebarLinks";
import {useStateHeaderContext} from "../../contexts/ContextProviderHeader";
import { useStateContext } from '../../contexts/ContextProvider';
import { textHere, TTAlertTexts } from '../../utils/intl';
import FutureDevelopmentCenter from '../../components/FutureDevelopmentCenter';

const Guide = () => {
    const {setHeaderContent} = useStateHeaderContext()
    const {lang} = useStateContext()
    setHeaderContent(lang==='eng'? sidebarLinksEng[11]:sidebarLinksFa[11])

    return <FutureDevelopmentCenter 
        icon={sidebarLinksFa[10].icon}
        label={sidebarLinksFa[10].label}
        desc={textHere(TTAlertTexts.will_be_implemented_soon,lang)}
    />
    
};

export default Guide;
