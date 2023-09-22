import { useRoutes } from "react-router-dom";

// routes
import AdminRoutes from "./AdminRoutes";
import LoginRoutes from "./LoginRoutes";
import PublicRoutes from "./PublicRoutes";
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
	return useRoutes([PublicRoutes, LoginRoutes, AdminRoutes]);
}
