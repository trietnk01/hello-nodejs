import React, { SyntheticEvent } from "react";

// material-ui
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Fade, Grow, Slide, SlideProps, useTheme } from "@mui/material";
import MuiSnackbar from "@mui/material/Snackbar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "store";
import { closeSnackbar } from "store/slices/snackbar";
import { KeyedObject } from "types";

// animation function
function TransitionSlideLeft(props: SlideProps) {
	return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
	return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
	return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
	return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
	return <Grow {...props} />;
}

// animation options
const animation: KeyedObject = {
	SlideLeft: TransitionSlideLeft,
	SlideUp: TransitionSlideUp,
	SlideRight: TransitionSlideRight,
	SlideDown: TransitionSlideDown,
	Grow: GrowTransition,
	Fade
};

// ==============================|| SNACKBAR ||============================== //

const Snackbar = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const { t } = useTranslation();
	const snackbar = useSelector((state) => state.snackbar);
	const { actionButton, anchorOrigin, alert, close, message, open, transition, variant } = snackbar;
	const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		dispatch(closeSnackbar());
	};

	return (
		<React.Fragment>
			{variant === "alert" && (
				<MuiSnackbar
					TransitionComponent={animation[transition]}
					anchorOrigin={anchorOrigin}
					open={open}
					autoHideDuration={20000}
					onClose={handleClose}
				>
					<Box display="flex" alignItems="center" columnGap={1} sx={{ boxShadow: 2, background: "#FFF", p: 1, borderRadius: 2 }}>
						<Box
							display="flex"
							alignItems="center"
							justifyContent="center"
							sx={{
								background: alert.color === "success" ? theme.palette.success.main : theme.palette.error.main,
								color: "#FFF",
								borderRadius: "50%",
								boxShadow: 1,
								width: 20,
								height: 20
							}}
						>
							{alert.color === "success" ? <CheckIcon sx={{ fontSize: 18 }} /> : <ClearIcon sx={{ fontSize: 18 }} />}
						</Box>
						<Box>
							<Box sx={{ fontWeight: "bold", color: theme.palette.grey[900] }}>{t("System")}</Box>
							<Box sx={{ color: theme.palette.grey[700], fontSize: 11, fontWeight: 500 }}>{message}</Box>
						</Box>
						<Button onClick={handleClose} sx={{ color: theme.palette.grey[500], fontWeight: 500, fontSize: 12 }}>
							{t("Dismiss")}
						</Button>
					</Box>
				</MuiSnackbar>
			)}
		</React.Fragment>
	);
};

export default Snackbar;
