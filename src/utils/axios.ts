/**
 * axios setup to use mock service
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { END_POINT } from "configs";
import { dispatch } from "store";
import { hideLoading, showLoading } from "store/slices/loading";

import auth_service from "./authService";

import { DefaultRootStateProps } from "types";

const item_axios: DefaultRootStateProps["axios"] = {
	baseURL: END_POINT.API_ENDPOINT ? END_POINT.API_ENDPOINT : "",
	timeout: 100000
};
const axiosServices = axios.create(item_axios);

let requestCount: number | 0 = 0;
function decreaseRequestCount(): void {
	requestCount = requestCount - 1;
	if (requestCount === 0) {
		dispatch(hideLoading());
	}
}
// interceptor for http
axiosServices.interceptors.request.use(
	(config: AxiosRequestConfig<any>) => {
		const accessToken: string = auth_service.getAccessToken();
		if (config.headers) {
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			if (config.headers.isShowLoading) {
				requestCount++;
				dispatch(showLoading());
			}
		}
		return config;
	},
	(err: any) => {
		if (err.config.headers.isShowLoading) {
			decreaseRequestCount();
		}
		return Promise.reject(err.response);
	}
);
axiosServices.interceptors.response.use(
	(res: AxiosResponse<any>) => {
		if (res.config && res.config.headers && res.config.headers.isShowLoading) {
			decreaseRequestCount();
		}
		return res;
	},
	(err: any) => {
		if (err.config.headers.isShowLoading) {
			decreaseRequestCount();
		}
		if (err.response?.status === 401) {
			window.localStorage.removeItem("accessToken");
		}
		return Promise.reject(err.response);
	}
);

export default axiosServices;
