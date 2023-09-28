import axios from 'axios';
import { refreshToken } from 'src/redux/reducers/authReducer';
import { getAccessToken, saveAccessToken } from 'src/utils/helper';

/**
 * created axiosInstance using axios
 */
let axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Passed API authorization
 */
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Refresh token logic using interceptors
 */
axiosInstance.interceptors.response.use(
    (res: any) => {
        return res;
    },
    async (err: any) => {
        const originalConfig = err.config;
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await refreshToken();
                    const { access } = rs.data;
                    saveAccessToken("accessToken", access);
                    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
                    return axiosInstance(originalConfig);
                } catch (_error: any) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }
                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }
        return Promise.reject(err);
    }
);

/**
 * Created axiosObjects using axiosInstance
 */
const axiosObj = {
    get: axiosInstance.get,
    post: (url: any, data: any) => axiosInstance.post(url, data),
    put: (url: any, data: any) => axiosInstance.put(url, data),
    delete: axiosInstance.delete,
};

export default axiosObj;