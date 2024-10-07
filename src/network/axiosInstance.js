import axios from "axios";
import {urlLogin, urlRefreshToken} from "./urls";

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 1000 * 10,
        responseType: 'json',
        transformResponse: []
    })
    // attach access token with all requests
    instance.interceptors.request.use(
        (config) => {
            // read access from storage
            const token = localStorage.getItem('access_token')
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {
            
            return Promise.reject(error);
        }
    );
    // access token is expired
    instance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== urlLogin && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const refreshToken = localStorage.getItem('refresh_token')
                        const rs = await instance.post(urlRefreshToken, {
                            refreshToken: refreshToken,
                        });

                        const {accessToken} = rs.data;

                        // storing new tokens
                        localStorage.setItem('access_token', accessToken)
                        localStorage.setItem('refresh_token', refreshToken)


                        return instance(originalConfig);
                    } catch (_error) {
                        localStorage.setItem('login', false)
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );
    return instance;
}


export default axiosInstance