import { Outlet } from "react-router-dom";

// material-ui
import { Box, CssBaseline } from "@mui/material";

const LoginLayout = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Outlet />
		</Box>
	);
};

export default LoginLayout;
