import axios from 'axios';
import { base_url } from './base_url';

const getToken = () => {
    return localStorage.getItem('token');
}

const AxiosInstance = axios.create({
    baseURL: base_url,
});

AxiosInstance.interceptors.request.use(function (config:any) {
    config.headers.Authorization = 'Bearer ' + getToken();
    return config;
});

export { AxiosInstance };