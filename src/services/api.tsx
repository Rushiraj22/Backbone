import axios from 'axios';
import { refreshToken } from 'src/redux/reducers/authReducer';
import { getAccessToken } from 'src/utils/helper';

let axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = getAccessToken();
//         console.log('axxToken');
//         console.log(token);
//         if (token) {
//             config.headers["Authorization"] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (res: any) => {
//         return res;
//     },
//     async (err: any) => {
//         const originalConfig = err.config;
//         console.log('start')
//         if (err.response) {
//             // Access Token was expired
//             if (err.response.status === 401 && !originalConfig._retry) {
//                 originalConfig._retry = true;
//                 try {
//                     const rs = await refreshToken();
//                     console.log('responseRefresh');
//                     console.log(rs);
//                     const { access } = rs.data;
//                     window.localStorage.setItem("accessToken", access);
//                     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
//                     return axiosInstance(originalConfig);
//                 } catch (_error: any) {
//                     if (_error.response && _error.response.data) {
//                         return Promise.reject(_error.response.data);
//                     }
//                     return Promise.reject(_error);
//                 }
//             }

//             if (err.response.status === 403 && err.response.data) {
//                 return Promise.reject(err.response.data);
//             }
//         }
//         console.log('end')
//         return Promise.reject(err);
//     }
// );

/**
 * Created axiosObjects
 */
const axiosObj = {
    get: axiosInstance.get,
    post: (url: any, data: any) => axiosInstance.post(url, data),
    put: (url: any, data: any) => axiosInstance.put(url, data),
    delete: axiosInstance.delete,
};

export default axiosObj;