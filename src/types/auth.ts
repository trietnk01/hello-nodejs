// third-party
import firebase from "firebase/compat/app";

// project imports
export type FirebaseContextType = {
	isLoggedIn: boolean;
	isInitialized?: boolean;
	user?: UserProfile | null | undefined;
	logout: () => Promise<void>;
	login: () => void;
	firebaseRegister: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
	firebaseEmailPasswordSignIn: (email: string, password: string) => void;
	firebaseGoogleSignIn: () => Promise<firebase.auth.UserCredential>;
	resetPassword: (email: string) => Promise<void>;
	updateProfile: VoidFunction;
};
export type UserProfile = {
	id: number;
	display_name: string;
	email: string;
	phone: string;
	avatar: string;
	lang: string;
	currency: string;
};

export type JWTContextType = {
	isLoggedIn: boolean;
	isInitialized?: boolean;
	user?: UserProfile | null;
	logout: (userId: number) => void;
	login: (email: string, password: string) => void;
};

export interface InitialLoginContextProps {
	isLoggedIn: boolean;
	isInitialized?: boolean;
	user?: UserProfile | null;
}
