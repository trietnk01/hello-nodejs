import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Button, Card, Grid, IconButton, useTheme } from "@mui/material";
import { IconX } from "@tabler/icons";
import sprite from "assets/images/sprite.png";
import { END_POINT } from "configs";
import { MyTextField } from "control";
import { MyLabelField } from "control/MyLabelField";
import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";
import { DefaultRootStateProps } from "types";
import axios from "utils/axios";
import * as yup from "yup";
import NoAvatar from "assets/images/no-avatar.jpg";
interface IFormInput {
	email: string;
	display_name: string;
	password: string;
	password_confirmed: string;
	phone: string;
	avatar: string;
}
interface IUser {
	id: number;
	email: string;
	password: string;
	display_name: string;
	phone: string;
	avatar: string;
}
const UserFrm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const { t } = useTranslation();
	let mounted: boolean = true;
	const { id } = useParams();
	const [base64Url, setBase64Url] = React.useState<string>("");
	const [avatar, setAvatar] = React.useState<DefaultRootStateProps["MediaSource"] | null>(null);
	const [removedAvatar, setRemovedAvatar] = React.useState<boolean>(false);
	const schema = yup
		.object({
			email: yup.string().required(t("Field required").toString()),
			display_name: yup.string().required(t("Field required").toString()),
			phone: yup.string().required(t("Field required").toString())
		})
		.required();
	const {
		handleSubmit,
		control,
		setValue,
		setError,
		getValues,
		formState: { errors }
	} = useForm<IFormInput>({
		defaultValues: {
			email: "",
			display_name: "",
			password: "",
			password_confirmed: "",
			phone: "",
			avatar: ""
		},
		resolver: yupResolver(schema)
	});
	const onSubmit: SubmitHandler<IFormInput> = async (dataForm) => {
		try {
			let checked: boolean = true;
			let action: string = id ? "UPDATE" : "CREATE";
			switch (action) {
				case "CREATE":
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
					break;
				case "UPDATE":
					if (dataForm.password || dataForm.password_confirmed) {
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
					}
					break;
			}
			if (checked) {
				let frmData: any = new FormData();
				frmData.append("email", dataForm.email.toString().trim());
				frmData.append("display_name", dataForm.display_name.toString().trim());
				if (dataForm.password) {
					frmData.append("password", dataForm.password.toString().trim());
				}
				frmData.append("phone", dataForm.phone.toString().trim());
				switch (action) {
					case "CREATE":
						if (avatar) {
							frmData.append("avatar", avatar);
						}
						frmData.append("lang", "vi");
						frmData.append("currency", "VND");
						break;
					case "UPDATE":
						if (avatar) {
							frmData.append("avatar", avatar);
						} else {
							if (removedAvatar) {
								frmData.append("removed_avatar", removedAvatar);
							}
						}
						break;
				}
				let res: any = null;
				switch (action) {
					case "CREATE":
						res = await axios.post("/users/create", frmData, {
							headers: { isShowLoading: true, ContentType: "multipart/form-data" }
						});
						break;
					case "UPDATE":
						if (id) {
							res = await axios.put(`/users/update/${parseInt(id.toString())}`, frmData, {
								headers: { isShowLoading: true, ContentType: "multipart/form-data" }
							});
						}
						break;
				}
				const { status, insert_id } = res.data;
				if (status) {
					if (action === "CREATE") {
						navigate(`/admin/user/edit/${insert_id}`);
					} else {
						setValue("password", "");
						setValue("password_confirmed", "");
					}
					dispatch(
						openSnackbar({
							open: true,
							message: action === "CREATE" ? t("Create user successfully") : t("Update user successfully"),
							anchorOrigin: { vertical: "bottom", horizontal: "left" },
							variant: "alert",
							alert: {
								color: "success"
							},
							transition: "Fade",
							close: false
						})
					);
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
	React.useEffect(() => {
		const init = async () => {
			try {
				let email: string = "";
				let displayName: string = "";
				let phone: string = "";
				let avatar: string = "";
				if (id) {
					const res: any = await axios.get(`/users/show/${parseInt(id.toString())}`, { headers: { isShowLoading: true } });
					const { status, item } = res.data;
					if (status) {
						const userElmt: IUser = item ? item : null;
						if (userElmt) {
							email = userElmt.email;
							displayName = userElmt.display_name;
							phone = userElmt.phone;
							avatar = userElmt.avatar ? `${END_POINT.URL_SERVER}/images/${userElmt.avatar}` : NoAvatar;
						}
					} else {
						dispatch(
							openSnackbar({
								open: true,
								message: t("User detail shown failure"),
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
				if (mounted) {
					setValue("email", email);
					setValue("display_name", displayName);
					setValue("phone", phone);
					setValue("password", "");
					setValue("password_confirmed", "");
					setBase64Url(avatar);
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
		init();
		return () => {
			mounted = false;
		};
	}, [id]);
	const handleUpload = (avatarFile: any) => {
		setBase64Url(URL.createObjectURL(avatarFile));
		setAvatar(avatarFile);
	};
	const handleRemovedAvatar = () => {
		setBase64Url("");
		setAvatar(null);
		setRemovedAvatar(true);
	};
	return (
		<Card variant="outlined">
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				height={60}
				pl={2}
				pr={2}
				borderBottom={1}
				borderColor={theme.palette.grey[300]}
			>
				<Box color={theme.palette.grey[800]} fontWeight={500} fontSize={20}>
					{t("User information")}
				</Box>
				<Box display="flex" columnGap={2}>
					<Button variant="contained" startIcon={<KeyboardBackspaceOutlinedIcon />} onClick={() => navigate("/admin/user/list")}>
						{t("Back")}
					</Button>
					<Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => navigate("/admin/user/add")}>
						{t("Add user")}
					</Button>
				</Box>
			</Box>
			<Box p={2}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={3}>
						<Card variant="outlined" sx={{ p: 2 }}>
							{base64Url ? (
								<Box display="flex" flexDirection="column" alignItems="center" rowGap={2}>
									<img src={base64Url} style={{ width: "100%", height: "100%", borderRadius: 6 }} />
									<IconButton
										sx={{
											background: theme.palette.error.dark,
											color: "white",
											boxShadow: 4,
											"&:hover": { background: theme.palette.error.main }
										}}
										onClick={handleRemovedAvatar}
										size="small"
									>
										<IconX />
									</IconButton>
								</Box>
							) : (
								<FileUploader
									name="avatar_file_upload"
									multiple={false}
									types={["JPG", "PNG", "GIF", "JPEG"]}
									hoverTitle={t("Drop here")}
									handleChange={handleUpload}
								>
									<Box
										display="flex"
										flexDirection="column"
										alignItems="center"
										rowGap={2}
										border={2}
										borderRadius={3}
										p={2}
										sx={{ borderStyle: "dashed", borderColor: theme.palette.grey[400], cursor: "pointer" }}
									>
										<img alt="spriteMultipleUpload" style={{ width: "50%" }} src={sprite} />
										<Box sx={{ color: theme.palette.grey[800], fontWeight: 900 }} fontSize={20}>
											{t("Upload image right here")}
										</Box>
										<Box sx={{ color: theme.palette.grey[600] }} fontSize={16}>
											{t("Maxium 5MB")}
										</Box>
									</Box>
								</FileUploader>
							)}
						</Card>
					</Grid>
					<Grid item xs={12} sm={9}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Card variant="outlined" sx={{ p: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={12}>
										<Box display="flex" flexDirection="column">
											<Box display="flex" alignItems="center" columnGap={1}>
												<MyLabelField>{t("Display name")}</MyLabelField>
												<Box sx={{ color: theme.palette.error.main, fontWeight: 900 }}>*</Box>
											</Box>
											<Controller
												name="display_name"
												defaultValue=""
												control={control}
												render={({ field }) => {
													return (
														<Box display="flex" flexDirection="column" rowGap={1}>
															<MyTextField {...field} size="small" fullWidth type="text" />
															{errors.display_name && (
																<Box color={theme.palette.error.main}>{errors.display_name.message}</Box>
															)}
														</Box>
													);
												}}
											/>
										</Box>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Box display="flex" flexDirection="column">
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
															<MyTextField {...field} size="small" fullWidth type="password" />
															{errors.password && (
																<Box color={theme.palette.error.main}>{errors.password.message}</Box>
															)}
														</Box>
													);
												}}
											/>
										</Box>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Box display="flex" flexDirection="column">
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
															<MyTextField {...field} size="small" fullWidth type="password" />
															{errors.password_confirmed && (
																<Box color={theme.palette.error.main}>
																	{errors.password_confirmed.message}
																</Box>
															)}
														</Box>
													);
												}}
											/>
										</Box>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Box display="flex" flexDirection="column">
											<Box display="flex" alignItems="center" columnGap={1}>
												<MyLabelField>{t("Email")}</MyLabelField>
												<Box sx={{ color: theme.palette.error.main, fontWeight: 900 }}>*</Box>
											</Box>
											<Controller
												name="email"
												defaultValue=""
												control={control}
												render={({ field }) => {
													return (
														<Box display="flex" flexDirection="column" rowGap={1}>
															<MyTextField {...field} size="small" type="text" fullWidth />
															{errors.email && (
																<Box color={theme.palette.error.main}>{errors.email.message}</Box>
															)}
														</Box>
													);
												}}
											/>
										</Box>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Box display="flex" flexDirection="column">
											<Box display="flex" alignItems="center" columnGap={1}>
												<MyLabelField>{t("Phone")}</MyLabelField>
												<Box sx={{ color: theme.palette.error.main, fontWeight: 900 }}>*</Box>
											</Box>
											<Controller
												name="phone"
												defaultValue=""
												control={control}
												render={({ field }) => {
													return (
														<Box display="flex" flexDirection="column" rowGap={1}>
															<MyTextField {...field} size="small" type="text" fullWidth />
															{errors.phone && (
																<Box color={theme.palette.error.main}>{errors.phone.message}</Box>
															)}
														</Box>
													);
												}}
											/>
										</Box>
									</Grid>
									<Grid item xs={12} sm={12} display="flex" justifyContent="flex-end">
										<Button type="submit" variant="contained" startIcon={<SaveOutlinedIcon />}>
											{t("Update")}
										</Button>
									</Grid>
								</Grid>
							</Card>
						</form>
					</Grid>
				</Grid>
			</Box>
		</Card>
	);
};

export default UserFrm;
