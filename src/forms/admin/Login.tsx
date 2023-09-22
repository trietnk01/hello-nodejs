import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/styles";
import useAuth from "hooks/useAuth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
interface IFormInput {
	email: string;
	password: string;
}
const Login = () => {
	const { t } = useTranslation();
	const { login } = useAuth();
	const navigate = useNavigate();
	const theme = useTheme();
	const schema = yup
		.object({
			email: yup.string().required(t("Field required").toString()),
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
			password: ""
		},
		resolver: yupResolver(schema)
	});
	const onSubmit: SubmitHandler<IFormInput> = (dataForm) => {
		login(dataForm.email.toString(), dataForm.password.toString());
	};
	const handleBackHomepage = () => {
		navigate("/");
	};
	return (
		<Box
			className="sectionLogin"
			component="div"
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{ width: "100vw", height: "100vh" }}
		>
			<Box
				className="xForm"
				sx={{
					position: "relative",
					width: 320,
					height: 480,
					background: "rgba(255, 255, 255, 0.1)",
					boxShadow: "0 5px 35px rgba(0, 0, 0, 0.2)",
					borderRadius: 2,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Box component="h1" sx={{ color: "#FFF", marginBottom: 1 }}>
					Login
				</Box>
				<form style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="email"
						defaultValue=""
						control={control}
						render={({ field }) => {
							return (
								<Box sx={{ marginBottom: 1 }}>
									<input
										{...field}
										type="text"
										placeholder="Email"
										style={{
											boxShadow: "inset 0 0 25px rgba(0, 0, 0, 0.2)",
											outline: "0",
											border: "0",
											borderRadius: "5px",
											padding: "10px 10px",
											width: "100%",
											background: "transparent",
											color: "#FFF"
										}}
									/>
									{errors.email && (
										<Box sx={{ mt: 1 }} color="red">
											{errors.email.message}
										</Box>
									)}
								</Box>
							);
						}}
					/>
					<Controller
						name="password"
						defaultValue=""
						control={control}
						render={({ field }) => {
							return (
								<Box sx={{ marginBottom: 1 }}>
									<input
										{...field}
										type="password"
										placeholder="Password"
										style={{
											boxShadow: "inset 0 0 25px rgba(0, 0, 0, 0.2)",
											outline: "0",
											border: "0",
											borderRadius: "5px",
											padding: "10px 10px",
											width: "100%",
											background: "transparent",
											color: "#FFF"
										}}
									/>
									{errors.password && (
										<Box sx={{ mt: 1 }} color="red">
											{errors.password.message}
										</Box>
									)}
								</Box>
							);
						}}
					/>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<button
							type="submit"
							name="btnLogin"
							className="btnLogin"
							style={{
								color: "#FFF",
								fontWeight: "600",
								position: "relative",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								overflow: "hidden",
								width: "130px",
								height: "40px",
								background: "rgba(255, 255, 255, 0.05)",
								boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
								border: "1px solid rgba(255, 255, 255, 0.1)",
								borderRadius: "20px",
								letterSpacing: "2px",
								transition: "0.5s",
								cursor: "pointer"
							}}
						>
							Login
						</button>
					</Box>
					<Box sx={{ mt: 1 }}>
						<Button sx={{ color: "#0c00ff" }} onClick={handleBackHomepage} style={{ textDecoration: "none" }}>
							Homepage
						</Button>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default Login;
