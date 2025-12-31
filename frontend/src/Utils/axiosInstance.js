import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //Handiling common errors globally
        if (error.response) {
            if (error.response.status === 401 && !error.config.url.includes("/login")) {
                //Redirect to login page
                window.location.href = "/";
            } else if (error.response.status === 500) {
                console.error("Internal Server Error. Please try again later.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timed out. Please try again later.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

