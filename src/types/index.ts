import { UserProfile } from "./auth";
import AxiosProps from "./axios-config";
import { CartStateProps } from "./cart";
import { LoadingSpinnerStateProps } from "./loading";
import { SnackbarProps } from "./snackbar";
import DrawerStateProps from "./drawer";
import EndPointProps from "./end-point";

interface NavItemTypeProps {
	id: string;
	title: React.ReactNode;
	url: string;
}
interface StringColorProps {
	id?: string;
	label?: string;
	color?: string;
	primary?: string;
	secondary?: string;
}
interface MediaProps {
	id: number;
	name: string;
	path: string;
	type: string;
	file_name: string;
	file_size: string;
	lang: string;
	created_at: string;
	updated_at: string;
}
export type StringBoolFunc = (s: string) => boolean;
export type StringNumFunc = (s: string) => number;
export type NumbColorFunc = (n: number) => StringColorProps | undefined;
export type KeyedObject = {
	[key: string]: string | number | KeyedObject | any;
};

// material-ui

// ==============================|| SNACKBAR TYPES  ||============================== //

export interface DefaultRootStateProps {
	snackbar: SnackbarProps;
	loading: LoadingSpinnerStateProps;
	cart: CartStateProps;
	user_profile: UserProfile;
	axios: AxiosProps;
	MediaSource: MediaProps;
	NavItemType: NavItemTypeProps;
	drawer: DrawerStateProps;
}
export type { EndPointProps };
