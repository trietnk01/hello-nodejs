import React, { createContext, useEffect, useReducer } from "react";

// third-party
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// action - state management
import { LOGIN, LOGOUT } from "store/actions";
import accountReducer from "store/accountReducer";
import { DefaultRootStateProps } from "types";
import { store } from "store";
import { openSnackbar } from "store/slices/snackbar";
// project imports
import Loader from "ui-component/Loader";
import { FIREBASE_API } from "config";
import { FirebaseContextType, InitialLoginContextProps } from "types/auth";
import axios from "utils/axios";
import auth_service from "utils/authService";
import { useTranslation } from "react-i18next";
// firebase initialize
if (!firebase.apps.length) {
	firebase.initializeApp(FIREBASE_API);
}

// const
const initialState: InitialLoginContextProps = {
	isLoggedIn: false,
	isInitialized: false,
	user: null
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({ children }: { children: React.ReactElement }) => {
	const [state, dispatch] = useReducer(accountReducer, initialState);
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

	const firebaseEmailPasswordSignIn = async (email: string, password: string) => {
		let params: any = {
			email,
			password
		};
		const res: any = await axios.post("/users/login", params, { headers: { isShowLoading: true } });
		const { status, user } = res.data;
		if (status) {
			const token: string = user.user.stsTokenManager.accessToken;
			let userItem: DefaultRootStateProps["user_profile"] | null = {
				id: user.user.uid,
				display_name: user.user.providerData.displayName,
				email,
				phone: user.user.providerData.phoneNumber,
				avatar: "",
				lang: "",
				currency: ""
			};
			if (userItem) {
				auth_service.setAccessToken(token);
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

	const firebaseGoogleSignIn = () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		return firebase.auth().signInWithPopup(provider);
	};

	const firebaseRegister = async (email: string, password: string) => firebase.auth().createUserWithEmailAndPassword(email, password);

	const logout = () => firebase.auth().signOut();

	const resetPassword = async (email: string) => {
		await firebase.auth().sendPasswordResetEmail(email);
	};

	const updateProfile = () => {};
	if (state.isInitialized !== undefined && !state.isInitialized) {
		return <Loader />;
	}

	return (
		<FirebaseContext.Provider
			value={{
				...state,
				firebaseRegister,
				firebaseEmailPasswordSignIn,
				login: () => {},
				firebaseGoogleSignIn,
				logout,
				resetPassword,
				updateProfile
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};

export default FirebaseContext;
