import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";
const MainLayout = Loadable(lazy(() => import("layout/MainLayout")));
// widget routing
const Dashboard = Loadable(lazy(() => import("forms/admin/Dashboard")));
const UserList = Loadable(lazy(() => import("forms/admin/user/UserList")));
const UserFrm = Loadable(lazy(() => import("forms/admin/user/UserFrm")));
const ChatFrm = Loadable(lazy(() => import("forms/admin/ChatFrm")));
const AdminDenied = Loadable(lazy(() => import("forms/admin/AdminDenied")));
// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
	path: "/",
	element: (
		<AuthGuard>
			<MainLayout />
		</AuthGuard>
	),
	children: [
		{
			path: "*",
			element: <AdminDenied />
		},
		{
			path: "admin/dashboard",
			element: <Dashboard />
		},
		{
			path: "admin/user",
			children: [
				{
					path: "list",
					element: <UserList />
				},
				{
					path: "add",
					element: <UserFrm />
				},
				{
					path: "edit/:id",
					element: <UserFrm />
				}
			]
		},
		{
			path: "admin/chat",
			element: <ChatFrm />
		}
	]
};

export default AdminRoutes;
