import { lazy } from "react";

// project imports
import GuestGuard from "utils/route-guard/GuestGuard";

import Loadable from "ui-component/Loadable";

// login routing
const AuthLogin = Loadable(lazy(() => import("forms/admin/Login")));
const LoginLayout = Loadable(lazy(() => import("layout/LoginLayout")));
const PublicDenied = Loadable(lazy(() => import("forms/public/PublicDenied")));
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
	path: "/",
	element: (
		<GuestGuard>
			<LoginLayout />
		</GuestGuard>
	),
	children: [
		{
			path: "*",
			element: <PublicDenied />
		},
		{
			path: "admin/login",
			element: <AuthLogin />
		}
	]
};
export default LoginRoutes;
