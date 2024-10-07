import React, {useState,useEffect} from 'react';
import LastItemTopEvent from "../components/LastItemTopEvent";
import ResultForm from "../components/ResultForm";
import axiosInstance from "../network/axiosInstance";
import {sidebarLinksFa,sidebarLinksEng} from "../utils/sidebarLinks";
import { urlMainLicensePlate} from "../network/urls";
import LoadingIndicator from "../components/LoadingIndicator";
import {Button} from "antd";
import ListItemExpandable from "../components/ListItemExanpable";
import {useStateHeaderContext} from "../contexts/ContextProviderHeader";
import {permissionTaged,isPermissionAllowed}from '../utils/utils'
import { useStateContext } from '../contexts/ContextProvider';
import { textHere, TTAlertTexts, TTPermissions, TTStates } from '../utils/intl';


const VehicleModelScreen = () => {

    const isAllowed2ViewPlates = isPermissionAllowed(permissionTaged.plate_view)
    const {lang} = useStateContext()

    const ax = axiosInstance()
    const {setHeaderContent} = useStateHeaderContext()
    setHeaderContent(lang==='eng'? sidebarLinksEng[3]:sidebarLinksFa[3])

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

        ax.get(urlMainLicensePlate)
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
                <Button
                    onClick={requestHandler}
                >
                    {textHere(TTStates.try_again,lang)}
                </Button>
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

    function listWithItems() {
        return <>
            <LastItemTopEvent key={listItems.at(-1).id} item={listItems.at(-1)} type='plate'/>
            {listItems.map((item, index) => {
                if (index === 0) {
                    return (<></>)
                } else {
                    return <ListItemExpandable key={item.id} item={item} type='plate'/>
                }
            })}
        </>;
    }

    function allowed2SeeScreen() {
        return <div className='h-[calc(100%_-_1rem)] overflow-auto scroll-auto p-3'>
            {listIsNotEmpty ? listWithItems() : emptyListResultForm()}</div>;
    }

    function mainBody() {
        return <>{isAllowed2ViewPlates ? allowed2SeeScreen() : notAllowedResultForm()}</>

    }

    return (loading ? loadingPart() : <>{error != null ? errorPart() : mainBody()}</>)
};

export default VehicleModelScreen;
