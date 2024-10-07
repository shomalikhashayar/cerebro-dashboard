import React, {useState, useEffect} from 'react';
import { Input} from 'antd'

import {useNavigate} from "react-router-dom";
import {urlLogin, urlPermissions, urlUsers} from '../network/urls'
import {message} from 'antd';
import {useStateContext} from "../contexts/ContextProvider";
import axiosInstance from "../network/axiosInstance";
import {UserOutlined,SafetyOutlined } from '@ant-design/icons'
import ButtonB from "../components/ButtonB";
import {textHere, TTAlertTexts, TTButtons, TTForms, TTSettings, TTStates } from '../utils/intl';
import { logSomething } from '../utils/utils';

const logo = '/logo_light.png'
const jangal_logo = '/jangal_logo.png'

const Login = () => {


        const ax = axiosInstance()
        const navigate = useNavigate()

        const {setLogin,lang} = useStateContext()

        useEffect(() => {
            localStorage.setItem('login',false)
            setLogin(false)
        })

        const [isError, setError] = useState(null);
        const [isLoading, setIsLoading] = useState(false);
        const [messageApi, contextHolder] = message.useMessage();

        const [inputs, setInputs] = useState({username: null, password: null});


        const successMessage = () => {
            messageApi.open({
                type: 'success',
                content: 'ورود با موفقیت انجام شد',
            });
        };

        const errorMessage = (message) => {
            messageApi.open({
                type: 'error',
                content: message ?? 'خطایی رخ داده است',
            });
        };

        const loadingMessage = (message) => {
            messageApi.open({
                type: 'loading',
                content: message,
                duration: 0,
            });
            setTimeout(messageApi.destroy, 5000);
        }


        function onSuccessResponseLogin(response) {
            logSomething('onSuccessResponseLogin')
            const jsonResponse = JSON.parse(response.data)
            if (jsonResponse.access && jsonResponse.refresh) {

                // store tokens
                localStorage.setItem('access_token', jsonResponse.access)
                localStorage.setItem('refresh_token', jsonResponse.refresh)

                let url = urlUsers+`?username=${inputs.username}`
                ax.get(url).then(onSuccessResponseGetUserData)
                    .catch(onErrorGetUserData).finally(onFinallyGetUserData)
                ax.get(urlPermissions).then(onSuccessResponseGetAllPermissions)
                .catch(onErrorGetAllPermissions).finally(onFinallyGetAllPermissions)
            }
        }

        function onErrorLogin(error) {
            errorMessage(textHere(TTAlertTexts.error_login_credential))

            setError(error.code)
        }

        function onFinallyLogin() {

            setIsLoading(false)
        }
    
   
        function onSuccessResponseGetUserData(response) {
            logSomething('onSuccessResponseGetUserData')

            const jsonResponse = JSON.parse(response.data)
            if (Object.keys(jsonResponse?.data).length > 0) {
                const user = jsonResponse?.data?.results[0]
                localStorage.setItem('user_information', JSON.stringify(user))
                setLogin(true)
                localStorage.setItem('login', true)
                navigate('/anomaly')
            }
        }

        function onErrorGetUserData(error) {
            logSomething('onErrorGetUserData')
            setIsLoading(false)
            setError(error.code)
            
        }

        function onFinallyGetUserData() {
            logSomething('onFinallyGetUserData')
            setIsLoading(false)
        }


        function onSuccessResponseGetAllPermissions(response){
            const jsonResponse = JSON.parse(response.data)
            if (Object.keys(jsonResponse.data).length > 0) {
                const permissions = jsonResponse.data[0]
                localStorage.setItem('all_permissions', JSON.stringify(permissions))
                successMessage()
                setLogin(true)
                localStorage.setItem('login', true)
                navigate('/anomaly')
            }
        }

        function onErrorGetAllPermissions(error){
            
            setError(error.code)
        }

        function onFinallyGetAllPermissions(){
            setIsLoading(false)
        }

        function loginHandler() {
            if (inputs.username === null || inputs.username === '') {
                errorMessage(textHere(TTStates.error_empty_username,lang))
            } else if (inputs.password === null || inputs.password === '') {
                errorMessage(textHere(TTStates.error_empty_password,lang))
            } else {
                setIsLoading(true)
                setError(null)
                loadingMessage(textHere(TTStates.loging_in,lang))
                ax.post(urlLogin, inputs)
                    .then(onSuccessResponseLogin).catch(onErrorLogin).finally(onFinallyLogin)
            }
        }


        return (
            <>
                {contextHolder}
                <div key={1} className='flex h-full w-full items-center align-middle'>
                    <div key={2} className='m-auto items-center flex flex-col bg-white shadow-xl'>
                        <div key={3} className='grid grid-cols-2 w-96 m-5 items-center'>
                            <img key={4} src={logo} alt='سامانه پایش'/>
                            <img className='p-10' key={10} src={jangal_logo} alt='جنگال'/>
                        </div>
                        <div key={5} className='flex-none m-5'>
                            <Input key={6} placeholder={textHere(TTForms.credential_username,lang)}
                                   prefix={<UserOutlined />}
                                   size='large'
                                   onChange={(e) => {
                                       setInputs((prev) => ({username: e.target.value, password: prev.password}))
                                   }}
                            />
                        </div>
                        <div key={7} className='flex-none mb-5'>
                            <Input.Password key={8} placeholder={textHere(TTForms.credential_password,lang)}
                                            prefix={<SafetyOutlined />}
                                            size='large'
                                            onChange={(e) => {
                                                setInputs((prev) => ({username: prev.username, password: e.target.value}))
                                            }}
                            />
                        </div>
                        <div key={9} className='flex-2 m-10'>
                            <ButtonB
                            key={10}
                                className='w-52'
                                loading={false}
                                onClick={() => {
                                    loginHandler()
                                }}
                            >
                                <p>{textHere(TTButtons.login,lang)}</p>

                            </ButtonB>
                        </div>

                    </div>

                </div>
            </>
        );
    }
;

export default Login;
