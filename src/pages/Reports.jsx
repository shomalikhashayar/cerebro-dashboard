import React, { useCallback, useEffect, useState } from 'react';
import { sidebarLinksFa, sidebarLinksEng } from "../utils/sidebarLinks";
import axiosInstance from "../network/axiosInstance";
import { urlReportAll, urlReportAllByCameraId } from "../network/urls";
import LoadingIndicator from "../components/LoadingIndicator";
import ResultForm from "../components/ResultForm";
import { Button ,Space} from "antd";
import ListItemExpandable from "../components/ListItemExanpable";
import { useStateHeaderContext } from "../contexts/ContextProviderHeader";
import { permissionTaged, isPermissionAllowed, logSomething } from '../utils/utils'
import ButtonB from '../components/ButtonB';
import { useStateContext } from '../contexts/ContextProvider';
import { textHere, TTAlertTexts, TTPermissions, TTStates } from '../utils/intl';
import ChipTagCustom from '../components/ChipTagCustom';
import { useRecoilState } from 'recoil';
import {filterCameraAtom} from '../utils/logic/StateManager'


const Reports = () => {


    const isAllowed2ViewAnomaly = isPermissionAllowed(permissionTaged.anomaly_view)
    const isAllowed2ViewFace = isPermissionAllowed(permissionTaged.face_view)
    const isAllowed2ViewPlate = isPermissionAllowed(permissionTaged.plate_view)

    const { lang } = useStateContext()
   
    
    

    const [filterCamera, setFilterCamera] = useRecoilState(filterCameraAtom)
    useEffect(() => {
        console.log(filterCamera)           
      }, [filterCamera])

    const { setHeaderContent } = useStateHeaderContext()
    setHeaderContent(lang === 'eng' ? sidebarLinksEng[7] : sidebarLinksFa[7])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [listIsNotEmpty, setListIsNotEmpty] = useState(false)

    const [listItems, setListItems] = useState([])


    function onError(error) {
        setLoading(false)
        setError(error)
    }

    function onSuccessResponse(response) {
        const jsonResponse = JSON.parse(response.data)
        logSomething(jsonResponse)

        if (Object.keys(jsonResponse?.data?.results).length > 0) {
            if (jsonResponse?.data?.results?.length > 0) {

                var items = jsonResponse?.data?.results
                logSomething(items)
                setListItems(items)
                setListIsNotEmpty(true)
            }
        } else {

        }
        setLoading(false)
        setError(null)
    }


    const requestHandler=useCallback(()=> {
        setLoading(true)
        setError(null)
        const ax = axiosInstance()

        var url = urlReportAll
        if(filterCamera!==null){
            // url = urlReportAllByCameraId(filterCamera.id)
        }
        logSomething(url)
        ax.get( url)
            .then(onSuccessResponse)
            .catch(onError)
    },[filterCamera])
    useEffect(() => {
      requestHandler()
    
      
    }, [requestHandler])
    



    function loadingPart() {
        return <div className='h-full flex justify-center'>
            <LoadingIndicator text={textHere(TTStates.loading, lang)} />
        </div>;
    }

    const errorPart=useCallback(()=> {
        return <ResultForm
            type='error'
            title={textHere(TTStates.fail, lang)}
            subtitle={textHere(TTAlertTexts.error_try_again, lang)}
            extras={<div>
                <ButtonB
                    onClick={requestHandler}
                >
                    {textHere(TTStates.try_again, lang)}
                </ButtonB>
            </div>}
        />;
    },[lang,requestHandler])

    const emptyListResultForm=useCallback(()=> {
        return <ResultForm
            type='info'
            title={textHere(TTStates.empty, lang)}
            subtitle={textHere(TTStates.try_again, lang)}
        />;
    },[lang])

    const notAllowedResultForm=useCallback(()=> {
        return <ResultForm
            type='warning'
            title={textHere(TTPermissions.you_dont_have_permission, lang)}
            subtitle={textHere(TTPermissions.you_dont_have_permission_desc, lang)}
        />;
    },[lang])

    const listWithItems= useCallback(()=> {
        return <>
            {!!filterCamera?.id && <Space>
                 <ChipTagCustom camera={filterCamera.id} onClosePressed={() => {
                 setFilterCamera(null)   
            }} />
            </Space>
            }
            {listItems.map((resultItem, index) => {
                return <ListItemExpandable  item={resultItem} onClickCameraName={() => {
                    setFilterCamera({title:resultItem.camera.title,id:resultItem.camera.title})
                }} />
            })}
        </>;
    },[filterCamera,listItems,setFilterCamera])

    const  allowed2SeeScreen = useCallback(()=> {
        return <div className='h-[calc(100%_-_1rem)] overflow-auto scroll-auto p-3'>
            {listIsNotEmpty ? listWithItems() : emptyListResultForm()}</div>;
    },[listWithItems,emptyListResultForm,listIsNotEmpty])

    // todo: fix permissions
    const mainBody = useCallback(()=> {
        return <>{true ? allowed2SeeScreen() : notAllowedResultForm()}</>

    },[allowed2SeeScreen,notAllowedResultForm])



    return (loading ? loadingPart() : <>{error != null ? errorPart() : mainBody()}</>)
};

export default Reports;