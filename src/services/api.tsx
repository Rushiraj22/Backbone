import axios from 'axios';

let axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * interceptors
 */

const axiosObj = {
    get: axiosInstance.get,
    post: (url: any, data: any) => axiosInstance.post(url, data),
    put: (url: any, data: any) => axiosInstance.put(url, data),
    delete: axiosInstance.delete,
};

export default axiosObj;