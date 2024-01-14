import axios, { AxiosRequestConfig, Method } from 'axios';
import Constants from "expo-constants";

const { manifest } = Constants
const apiUrl = (typeof manifest?.packagerOpts === `object`) && manifest.packagerOpts.dev
    ? manifest.debuggerHost?.split(`:`).shift()?.concat(`:3000`)
    : `api.example.com`


const axiosInstance = axios.create({
    // You can set base URL and other default config here
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        // Any other default headers
    },
});

const makeRequest = async<T=any> (
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
) => {
    try {
        const response = await axiosInstance.request<T>({
            method,
            url,
            data,
            ...config,
        });
        return response;
    } catch (error) {
        // Handle or throw error
        if (axios.isAxiosError(error) && error.response) {
            // Axios error with response (e.g., 4xx, 5xx response)
            throw error.response;
        } else {
            // Other errors (e.g., network error, timeout)
            throw error;
        }
    }
};

export default makeRequest;
