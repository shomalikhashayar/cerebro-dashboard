import React, { useState } from 'react';
import LogoutButton from "../LogoutButton";
import { Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useStateContext } from '../../contexts/ContextProvider';
import { textHere, TTForms } from '../../utils/intl';
import { logSomething } from '../../utils/utils';


function readInfoFromStorage() {

    const userInfo = JSON.parse(!!localStorage.getItem('user_information')?localStorage.getItem('user_information'):'{}')
    logSomething(userInfo)
    if (!!userInfo) { 
        let name = `${userInfo.first_name ?? ''} ${userInfo.last_name ?? ''}`
        let img_url = userInfo.image ?? ''
        let work_code = userInfo.work_code ?? ''
        let military_rank = userInfo.rank ?? ''
        let part = userInfo.part ?? ''
        return {
            name, img_url, work_code, military_rank, part
        }
    }
}


const ProfilePopover = () => {

    const { lang } = useStateContext()
    const [accountOpen, setAccountOpen] = useState(false);
    const profile = readInfoFromStorage()


    return (
        <Popover
            overlayStyle={{
                width: "20vw",
            }}
            open={accountOpen}
            onOpenChange={(e) => {
                setAccountOpen(e)
            }}
            content={
                <div>
                    <div className='flex p-3 justify-around'>
                        <p>{textHere(TTForms.title_personnel_code,lang)}</p>
                        <p className='font-semibold'>{profile?.work_code ?? ''}</p>
                    </div>
                    <div className='flex p-3 justify-around'>
                        <p>{textHere(TTForms.title_militaty_rank,lang)}</p>
                        <p className='font-semibold'>{profile?.military_rank ?? ''}</p>
                    </div>
                    <div className='flex p-3 justify-around'>
                        <p>{textHere(TTForms.title_military_part,lang)}</p>
                        <p className='font-semibold'>{profile?.part ?? ''}</p>
                    </div>
                    <div className='flex justify-center'>
                        <LogoutButton />
                    </div>
                </div>
            }
        >
            <button>
                <div>
                    <div className='flex items-center'>
                        <p className='text-xl p-3'>{profile?.name ?? ''}</p>
                        <Avatar shape="square" size={44}  src={profile?.img_url} />
                    </div>
                </div>
            </button>
        </Popover>
    );
};

export default ProfilePopover;
