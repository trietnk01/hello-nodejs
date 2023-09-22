// third-party
import React, { createContext, useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import accountReducer from "store/accountReducer";
// reducer - state management
import { LOGIN, LOGOUT } from "store/actions";
import { openSnackbar } from "store/slices/snackbar";
import { InitialLoginContextProps, JWTContextType } from "types/auth";
// project imports
import useConfig from "hooks/useConfig";
import { store } from "store";
import { DefaultRootStateProps } from "types";
import Loader from "ui-component/Loader";
import auth_service from "utils/authService";
import axios from "utils/axios";
import useAuth from "hooks/useAuth";
// constant
const initialState: InitialLoginContextProps = {
	isLoggedIn: false,
	isInitialized: false,
	user: null
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);
interface JWTProviderProps {}
const JWTProvider: React.FC<React.PropsWithChildren<JWTProviderProps>> = ({ children }) => {
	const [state, dispatch] = useReducer(accountReducer, initialState);
	const { onChangeLocale, onChangeCurrency, onChangeDateFormat } = useConfig();
	const { i18n, t } = useTranslation();
	useEffect(() => {
		const init = () => {
			const accessToken: string = auth_service.getAccessToken();
			const checkedTokenParams: any = {
				token: accessToken
			};
			if (accessToken) {
				axios
					.post("/users/check-valid-token", checkedTokenParams)
					.then((res: any) => {
						const { status, user } = res.data;
						if (status) {
							const userItem: DefaultRootStateProps["user_profile"] | null = user;
							if (userItem) {
								const lang: string = userItem && userItem.lang ? userItem.lang : "vi";
								i18n.changeLanguage(lang);
								dispatch({
									type: LOGIN,
									payload: {
										isLoggedIn: true,
										user: userItem
									}
								});
							}
						} else {
							delete axios.defaults.headers.common.Authorization;
							auth_service.clearAccessToken();
							dispatch({ type: LOGOUT });
							store.dispatch(
								openSnackbar({
									open: true,
									message: t("Invalid token"),
									anchorOrigin: { vertical: "bottom", horizontal: "left" },
									variant: "alert",
									alert: {
										color: "error"
									},
									transition: "Fade",
									close: false
								})
							);
						}
					})
					.catch((err: any) => {
						delete axios.defaults.headers.common.Authorization;
						auth_service.clearAccessToken();
						dispatch({ type: LOGOUT });
						store.dispatch(
							openSnackbar({
								open: true,
								message: t("Error system"),
								anchorOrigin: { vertical: "bottom", horizontal: "left" },
								variant: "alert",
								alert: {
									color: "error"
								},
								transition: "Fade",
								close: false
							})
						);
					});
			} else {
				delete axios.defaults.headers.common.Authorization;
				auth_service.clearAccessToken();
				dispatch({ type: LOGOUT });
			}
		};
		init();
	}, []);
	const login = async (email: string, password: string) => {
		let params: any = {
			email,
			password
		};
		const res: any = await axios.post("/users/login", params, { headers: { isShowLoading: true } });
		const { status, token, user } = res.data;
		if (status) {
			let userItem: DefaultRootStateProps["user_profile"] | null = user;
			if (userItem) {
				auth_service.setAccessToken(token);
				const lang: string = userItem && userItem.lang ? userItem.lang : "vi";
				const currency: string = userItem && userItem.currency ? userItem.currency : "VND";
				const dateFormat: string = lang === "vi" ? "dd/MM/yyyy" : "MM/dd/yyyy";
				onChangeLocale(lang);
				onChangeCurrency(currency);
				onChangeDateFormat(dateFormat);
				i18n.changeLanguage(lang);
				dispatch({
					type: LOGIN,
					payload: {
						isLoggedIn: true,
						user: userItem
					}
				});
				store.dispatch(
					openSnackbar({
						open: true,
						message: t("Login successfully"),
						anchorOrigin: { vertical: "bottom", horizontal: "left" },
						variant: "alert",
						alert: {
							color: "success"
						},
						transition: "Fade",
						close: false
					})
				);
			}
		} else {
			store.dispatch(
				openSnackbar({
					open: true,
					message: t("Login failure"),
					anchorOrigin: { vertical: "bottom", horizontal: "left" },
					variant: "alert",
					alert: {
						color: "error"
					},
					transition: "Fade",
					close: false
				})
			);
		}
	};

	const logout = (userId: number) => {
		const params = {
			userId
		};
		axios
			.post(`/users/logout`, params, { headers: { isShowLoading: true } })
			.then((res: any) => {
				const { status } = res.data;
				if (status) {
					delete axios.defaults.headers.common.Authorization;
					auth_service.clearAccessToken();
					dispatch({ type: LOGOUT });
				}
			})
			.catch((err: any) => {
				store.dispatch(
					openSnackbar({
						open: true,
						message: t("Error system"),
						anchorOrigin: { vertical: "bottom", horizontal: "left" },
						variant: "alert",
						alert: {
							color: "error"
						},
						transition: "Fade",
						close: false
					})
				);
			});
	};

	if (state.isInitialized !== undefined && !state.isInitialized) {
		return <Loader />;
	}

	return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
};
export { JWTProvider };
export default JWTContext;
