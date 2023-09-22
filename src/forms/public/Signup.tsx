import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MyTextField } from "control";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import React from "react";
import { MyLabelField } from "control/MyLabelField";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "store";
import axios from "utils/axios";
import { openSnackbar } from "store/slices/snackbar";
interface IFormInput {
	email: string;
	display_name: string;
	password: string;
	password_confirmed: string;
}
const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const { t } = useTranslation();
	let mounted: boolean = true;
	const schema = yup
		.object({
			email: yup.string().required(t("Field required").toString()),
			display_name: yup.string().required(t("Field required").toString()),
			password: yup.string().required(t("Field required").toString())
		})
		.required();
	const {
		register,
		handleSubmit,
		control,
		getValues,
		watch,
		setValue,
		setError,
		clearErrors,
		formState: { errors }
	} = useForm<IFormInput>({
		defaultValues: {
			email: "",
			display_name: "",
			password: "",
			password_confirmed: ""
		},
		resolver: yupResolver(schema)
	});
	const onSubmit: SubmitHandler<IFormInput> = async (dataForm) => {
		try {
			let checked: boolean = true;
			if (dataForm.password.length >= 6 && dataForm.password_confirmed.length >= 6) {
				if (dataForm.password !== dataForm.password_confirmed) {
					setError("password_confirmed", { message: t("Password confirmed is not matched to password").toString() });
					checked = false;
				}
			} else {
				if (dataForm.password.length < 6) {
					setError("password", { message: t("Password length must be greater than 6 characters").toString() });
					checked = false;
				}
				if (dataForm.password_confirmed.length < 6) {
					setError("password_confirmed", {
						message: t("Password confirmed length must be greater than 6 characters").toString()
					});
					checked = false;
				}
			}
			if (checked) {
				let frmData: any = new FormData();
				frmData.append("email", dataForm.email ? dataForm.email.toString().trim() : "");
				frmData.append("display_name", dataForm.display_name ? dataForm.display_name.toString().trim() : "");
				if (dataForm.password) {
					frmData.append("password", dataForm.password);
				}
				frmData.append("lang", "vi");
				frmData.append("currency", "VND");
				let res: any = await axios.post("/users/create", frmData, {
					headers: { isShowLoading: true, "content-type": "multipart/form-data" }
				});
				const { status, insert_id } = res.data;
				if (status) {
					dispatch(
						openSnackbar({
							open: true,
							message: t("Create user successfully"),
							anchorOrigin: { vertical: "bottom", horizontal: "left" },
							variant: "alert",
							alert: {
								color: "success"
							},
							transition: "Fade",
							close: false
						})
					);
					setTimeout(() => {
						navigate(`/admin/login`);
					}, 2000);
				} else {
					dispatch(
						openSnackbar({
							open: true,
							message: t("Save user failure"),
							anchorOrigin: { vertical: "bottom", horizontal: "left" },
							variant: "alert",
							alert: {
								color: "error"
							},
							transition: "Fade",
							close: false
						})
					);
				}
			}
		} catch (err: any) {
			dispatch(
				openSnackbar({
					open: true,
					message: t("Error system"),
					anchorOrigin: { vertical: "bottom", horizontal: "left" },
					variant: "alert",
					alert: {
						color: "error"
					},
					transition: "Fade",
					close: false
				})
			);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Box sx={{ width: 300 }}>
					<Box sx={{ fontWeight: "bold", fontSize: 30, mb: 2 }}>{t("Register / Signup")}</Box>
					<Box sx={{ mb: 1 }}>
						<Box display="flex" alignItems="center" columnGap={1}>
							<MyLabelField>{t("Full name")}</MyLabelField>
						</Box>
						<Controller
							name="display_name"
							defaultValue=""
							control={control}
							render={({ field }) => {
								return (
									<Box display="flex" flexDirection="column" rowGap={1}>
										<MyTextField
											{...field}
											size="small"
											fullWidth
											type="text"
											placeholder={t("Full name").toString()}
										/>
										{errors.display_name && <Box color={theme.palette.error.main}>{errors.display_name.message}</Box>}
									</Box>
								);
							}}
						/>
					</Box>
					<Box sx={{ mb: 1 }}>
						<Box display="flex" alignItems="center" columnGap={1}>
							<MyLabelField>{t("Email")}</MyLabelField>
						</Box>
						<Controller
							name="email"
							defaultValue=""
							control={control}
							render={({ field }) => {
								return (
									<Box display="flex" flexDirection="column" rowGap={1} sx={{ width: "100%" }}>
										<MyTextField {...field} size="small" rows={2} fullWidth placeholder={t("Email").toString()} />
										{errors.email && <Box color={theme.palette.error.main}>{errors.email.message}</Box>}
									</Box>
								);
							}}
						/>
					</Box>
					<Box sx={{ mb: 1 }}>
						<Box display="flex" alignItems="center" columnGap={1}>
							<MyLabelField>{t("Password")}</MyLabelField>
						</Box>
						<Controller
							name="password"
							defaultValue=""
							control={control}
							render={({ field }) => {
								return (
									<Box display="flex" flexDirection="column" rowGap={1}>
										<MyTextField
											{...field}
											size="small"
											fullWidth
											type="password"
											placeholder={t("Password").toString()}
										/>
										{errors.password && <Box color={theme.palette.error.main}>{errors.password.message}</Box>}
									</Box>
								);
							}}
						/>
					</Box>
					<Box>
						<Box display="flex" alignItems="center" columnGap={1}>
							<MyLabelField>{t("Password confirmed")}</MyLabelField>
						</Box>
						<Controller
							name="password_confirmed"
							defaultValue=""
							control={control}
							render={({ field }) => {
								return (
									<Box display="flex" flexDirection="column" rowGap={1}>
										<MyTextField
											{...field}
											size="small"
											fullWidth
											type="password"
											placeholder={t("Password confirmed").toString()}
										/>
										{errors.password_confirmed && (
											<Box color={theme.palette.error.main}>{errors.password_confirmed.message}</Box>
										)}
									</Box>
								);
							}}
						/>
					</Box>
					<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
						<Button
							variant="contained"
							type="submit"
							startIcon={<SaveOutlinedIcon />}
							sx={{
								bgcolor: "primary.main",
								"&:hover": {
									bgcolor: "primary.dark"
								}
							}}
						>
							{t("Register by email")}
						</Button>
					</Box>
				</Box>
			</Box>
		</form>
	);
};

export default Signup;
