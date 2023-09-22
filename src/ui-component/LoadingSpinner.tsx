import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "store";

function LoadingSpinner() {
	const { isShow } = useSelector((state) => state.loading);
	return (
		<React.Fragment>
			{isShow && (
				<div
					style={{
						position: "fixed",
						zIndex: "9990",
						display: "flex",
						left: "0",
						top: "0",
						backgroundColor: "rgb(0 0 0 / 77%)",
						width: "100vw",
						height: "100vh",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<CircularProgress />
				</div>
			)}
		</React.Fragment>
	);
}

export default LoadingSpinner;
