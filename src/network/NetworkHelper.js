import axiosInstance from "./axiosInstance";
import { urlReportAll, UrlManager } from "./urls";

class NetworkHelper {

    constructor() {
        this.ax = axiosInstance()
        this.urlManager = new UrlManager()
    }

    #defaultNullResponse = { status: 'failed', data: null }
    #defaultLoadingResponse = { status: 'loading', data: null }


    // network requests using axios instance 
    /**
     * 
     * @param {string} url full get url with query params
     * @param {*} responseListener callback method for handling response and error
     */
    GetRequest(url, responseListener) {
        responseListener(this.#defaultLoadingResponse)
        this.ax.get(url)
            .then((res) => { responseListener(this.#handleResponseData({ response: res })) })
            .catch((err) => { })
            .finally(() => { })
    }

    /**
     * 
     * @param {string} url 
     * @param {object} body 
     * @param {*} responseListener 
     */

    PostRequest(url, body, responseListener) {
        responseListener(this.#defaultLoadingResponse)
        this.ax.post(url, body)
            .then((res) => { responseListener(this.#handleResponseData({ response: res })) })
            .catch((err) => { })
    }

    /**
     * 
     * @param {string} url 
     * @param {object} body 
     * @param {*} responseListener 
     */

    PatchRequest(url, body, responseListener) {
        responseListener(this.#defaultLoadingResponse)
        this.ax.patch(url, body)
            .then((res) => { responseListener(this.#handleResponseData({ response: res })) })
            .catch((err) => { })
    }

    /**
     * 
     * @param {string} url 
     * @param {*} responseListener 
     */
    DeleteRequest(url, responseListener) {
        responseListener(this.#defaultLoadingResponse)
        this.ax.delete(url)
            .then((res) => { responseListener(this.#handleResponseData({ response: res })) })
            .catch((err) => { })
    }


    /**
     * status: 'success' | 'failed' | 'loading'
     * data: any
     * 
     * @param  response raw response from server for get request
     * @returns {status,data} response model for using in the app
     */

    #handleResponseData({ response = null, err = null }) {
        if (err === null && response !== null) {
            return this.#responseObjGetReq(response)
        } else if (response === null && err !== null) {
            return this.#responseDataFromError(err)
        } else {
            return this.#defaultNullResponse
        }
    }

    /**
     * checking status code and parse json
     * @param {*} response 
     * @returns 
     */
    #responseObjGetReq(response) {
        if (response.status >= 200 && response.status <= 299) {
            const jsonResponse = JSON.parse(response.data)
            return this.#responseDataFromJson(jsonResponse)
        }
        return this.#defaultNullResponse
    }

    /**
     * check for results in data
     * @param {*} jsonResponse 
     * @returns 
     */
    #responseDataFromJson(jsonResponse) {
        if (jsonResponse?.data?.count > 0) {
            return { status: 'success', data: jsonResponse.data.results }
        }
        return this.#defaultNullResponse
    }

    /**
     * wrapper for error to guide it through
     * @param {*} error 
     * @returns 
     */
    #responseDataFromError(error) {
        if (error?.response?.data) {
            return { status: 'failed', data: error.response.data }
        }
        return this.#defaultNullResponse
    }


    

}








