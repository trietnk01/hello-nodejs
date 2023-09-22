import React from "react";
// material-ui
import { CssBaseline } from "@mui/material";

// project import

// types

interface Props {
	children: React.ReactNode;
}

const ThemeCustomization: React.FC<Props> = ({ children }) => {
	return (
		<React.Fragment>
			<CssBaseline />
			{children}
		</React.Fragment>
	);
};
export default ThemeCustomization;
