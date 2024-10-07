import React, {useEffect, useState} from 'react';
import {sidebarLinksFa,sidebarLinksEng} from "../utils/sidebarLinks";
import LastItemTopEvent from "../components/LastItemTopEvent";
import ListItemExpandable from "../components/ListItemExanpable";
import ResultForm from "../components/ResultForm";
import LoadingIndicator from "../components/LoadingIndicator";
import axiosInstance from "../network/axiosInstance";
import {urlMainAnomaly} from "../network/urls";
import {useStateHeaderContext} from "../contexts/ContextProviderHeader";
import {permissionTaged,isPermissionAllowed, logSomething}from '../utils/utils'
import  ButtonB  from '../components/ButtonB';
import { useStateContext } from '../contexts/ContextProvider';
import { TemplateTexts, textHere, TTAlertTexts, TTButtons, TTPermissions, TTStates } from '../utils/intl';

const AnomalyScreen = () => {
    const isAllowed2ViewAnomaly = isPermissionAllowed(permissionTaged.anomaly_view)
    const {lang}  = useStateContext()
    const ax = axiosInstance()
    const {setHeaderContent,filterSettings} = useStateHeaderContext()
    setHeaderContent(lang==='eng'? sidebarLinksEng[0]:sidebarLinksFa[0])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [listIsNotEmpty, setListIsNotEmpty] = useState(true)


    const [listItems, setListItems] = useState([])


    function onError(error) {
        setLoading(false)
        setError(error)

    }


    function onSuccessResponse(response) {

        const jsonResponse = JSON.parse(response.data)
        
        
        if (Object.keys(jsonResponse?.data?.results).length > 0) {
            setListItems(jsonResponse?.data?.results)
        } else {
            setListIsNotEmpty(false)
        }

        setLoading(false)
        setError(null)
    }


    function requestHandler() {
        setLoading(true)
        setError(null)

        ax.get(urlMainAnomaly)
            .then(onSuccessResponse)
            .catch(onError)
    }


    useEffect(() => {
        requestHandler()
    }, [])


    function loadingPart() {
        return <div className='h-full flex justify-center'>
            <LoadingIndicator text={textHere(TTStates.loading,lang)}/>
        </div>;
    }

    function errorPart() {
        return <ResultForm
            type='error'
            title={textHere(TTStates.fail,lang)}
            subtitle={textHere(TTAlertTexts.error_try_again,lang)}
            extras={<div>
                <ButtonB
                    onClick={requestHandler}
                >
                    {textHere(TTStates.try_again,lang)}
                </ButtonB>
            </div>}
        />;
    }

    function emptyListResultForm() {
        return <ResultForm
            type='info'
            title={textHere(TTStates.empty,lang)}
            subtitle={textHere( TTStates.try_again,lang)}
        />;
    }

    function notAllowedResultForm() {
        return <ResultForm
            type='warning'
            title={textHere(TTPermissions.you_dont_have_permission,lang)}
            subtitle={textHere(TTPermissions.you_dont_have_permission_desc,lang)}
        />;
    }

    logSomething(listItems)
    function listWithItems() {
        return <>
            <LastItemTopEvent key={listItems?.at(-1).id} item={listItems?.at(-1)} type='anomaly'/>
            {listItems.map((item, index) => {
                if (index === 0) {
                    return (<></>)
                } else {
                    return <ListItemExpandable key={item.id} item={item} type='anomaly'/>
                }
            })}
        </>;
    }

    function allowed2SeeScreen() {
        return <div className='h-[calc(100%_-_1rem)] overflow-auto scroll-auto p-3'>
            {listIsNotEmpty ? listWithItems() : emptyListResultForm()}</div>;
    }

    function mainBody() {
        return <>{isAllowed2ViewAnomaly ? allowed2SeeScreen() : notAllowedResultForm()}</>

    }

    return (loading ? loadingPart() : <>{error != null ? errorPart() : mainBody()}</>)

};

export default AnomalyScreen;


