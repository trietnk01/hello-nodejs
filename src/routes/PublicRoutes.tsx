import { lazy } from "react";

// project imports

import Loadable from "ui-component/Loadable";
import GuestGuard from "utils/route-guard/GuestGuard";
const Signup = Loadable(lazy(() => import("forms/public/Signup")));
const LoginLayout = Loadable(lazy(() => import("layout/LoginLayout")));
const PublicDenied = Loadable(lazy(() => import("forms/public/PublicDenied")));
// ==============================|| AUTH ROUTING ||============================== //

const PublicRoutes = {
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
			path: "/",
			element: <Signup />
		}
	]
};
export default PublicRoutes;
