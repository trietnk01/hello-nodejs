import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { Avatar, Box, Card, Divider, IconButton, useTheme } from "@mui/material";
import NoAvatar from "assets/images/no-avatar.jpg";
import { BoxChat } from "components";
import { END_POINT, socket } from "configs";
import { MyTextField } from "control";
import useAuth from "hooks/useAuth";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "store";
import { toggleDrawer } from "store/slices/drawer";
import { openSnackbar } from "store/slices/snackbar";
import axios from "utils/axios";
import _ from "lodash";
interface IFormInput {
	message: string;
}
interface IUser {
	id: number;
	display_name: string;
	email: string;
	phone: string;
	avatar: string;
}
interface ISocketUser {
	sender_id: number;
	receiver_id: number;
	message: string;
	created_at: string;
}
const ChatFrm = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const { t } = useTranslation();
	const { user } = useAuth();
	const [isConnected, setIsConnected] = React.useState<boolean>(false);
	const [idReceiver, setIdReceiver] = React.useState<number>(0);
	const [emailUser, setEmailUser] = React.useState<string>("");
	const [displayNameReceiver, setDisplayNameReceiver] = React.useState<string>("");
	const [avatarReceiver, setAvatarReceiver] = React.useState<string>("");
	const [chatInfoData, setChatInfoData] = React.useState<ISocketUser[]>([]);
	const chatBoxRef = React.useRef<HTMLDivElement | null>(null);
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
			message: ""
		}
	});
	const onSubmit: SubmitHandler<IFormInput> = async (dataForm) => {
		const clientParams: ISocketUser = {
			sender_id: user && user.id ? user.id : 0,
			receiver_id: idReceiver,
			message: dataForm.message.toString().trim(),
			created_at: ""
		};
		await socket.emit("CLIENT_SEND_MESSAGE", clientParams);
		setValue("message", "");
	};
	React.useEffect(() => {
		dispatch(toggleDrawer());
		setIsConnected(socket.connected ? true : false);
	}, []);
	var proccess: any = null;
	var delay: number = 50;
	var scrollAmount: number = 200;
	let myTimeout: any = null;
	const goToBottom = () => {
		proccess = setInterval(animateScroll, delay);
	};
	const animateScroll = () => {
		if (chatBoxRef && chatBoxRef.current) {
			chatBoxRef.current.scrollBy(0, scrollAmount);
		}
	};
	React.useEffect(() => {
		socket.on("SERVER_RETURN_MESSAGE", async (data) => {
			const item: ISocketUser | undefined = data;
			if (item && user) {
				let idUserClicked: number = idReceiver;
				if (user.id === item.sender_id || idUserClicked === item.sender_id) {
					let nextState: ISocketUser[] = [...(chatInfoData && chatInfoData.length > 0 ? chatInfoData : [])];
					nextState.push(data);
					setChatInfoData(nextState);
					goToBottom();
				} else {
					setChatInfoData([]);
				}
				if (idUserClicked === item.sender_id) {
					const res: any = await axios.put(`/chat/update-status`, {
						sender_id: item.sender_id,
						receiver_id: item.receiver_id
					});
				}
			}
		});
		return () => {
			clearTimeout(myTimeout);
			clearInterval(proccess);
		};
	}, [socket, chatInfoData, user, idReceiver]);
	React.useEffect(() => {
		goToBottom();
	}, [idReceiver]);
	const handleClickUser = React.useCallback(async (receiverId: number) => {
		try {
			const senderId: number = user && user.id ? user.id : 0;
			const promise1: any = axios.get(`/users/show/${parseInt(receiverId.toString())}`, {
				headers: { isShowLoading: false }
			});
			const promise2: any = axios.get(`/chat/list/${senderId}/${receiverId}`);
			const promise3: any = axios.put(`/chat/update-status`, { sender_id: receiverId, receiver_id: senderId });
			const [res1, res2, res3] = await Promise.all([promise1, promise2, promise3]);
			const { status, item } = res1.data;
			const { items } = res2.data;
			if (status) {
				const userElmt: IUser = item ? item : null;
				setChatInfoData(items);
				if (userElmt) {
					setIdReceiver(userElmt.id);
					setEmailUser(userElmt.email);
					setDisplayNameReceiver(userElmt.display_name);
					setAvatarReceiver(userElmt.avatar);
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
		} catch (err) {
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
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Card variant="outlined">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						color: theme.palette.grey[800],
						fontWeight: 500,
						fontSize: "20px",
						height: "60px",
						pl: "20px",
						pr: "20px"
					}}
				>
					{t("Chat")}
				</Box>
				<Divider />
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						color: theme.palette.grey[600],
						fontSize: "11px",
						height: "60px",
						pl: "20px",
						pr: "20px"
					}}
				>
					{t("State")}: {isConnected ? t("Connected") : t("Disconnected")}
				</Box>
			</Card>
			<Box sx={{ display: "flex", mt: "10px", columnGap: "8px" }}>
				<BoxChat onSetReceiverId={handleClickUser} />
				{idReceiver > 0 && (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							height: "900px",
							border: "1px solid",
							borderColor: theme.palette.grey[300],
							bgcolor: "#FFF",
							borderRadius: "6px",
							p: "8px",
							flexGrow: 1
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								columnGap: "8px",
								borderBottom: "1px solid",
								borderColor: theme.palette.grey[300],
								pb: "8px"
							}}
						>
							<IconButton size="large">
								<MenuRoundedIcon />
							</IconButton>
							<Box sx={{ display: "flex", columnGap: "12px" }}>
								<Avatar src={avatarReceiver ? `${END_POINT.URL_SERVER}/images/${avatarReceiver}` : NoAvatar} />
								<Box>
									<Box sx={{ fontWeight: 600 }}>{displayNameReceiver}</Box>
									<Box sx={{ color: theme.palette.grey[400], fontSize: "11px" }}>{emailUser}</Box>
								</Box>
							</Box>
						</Box>
						<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 }}>
							<Box sx={{ height: "750px", overflowX: "hidden", p: 2 }} ref={chatBoxRef}>
								{chatInfoData && chatInfoData.length > 0 && user && (
									<Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
										{chatInfoData.map((chatElmt: ISocketUser, chatIdx: number) => {
											return (
												<Box key={`chat-item-${chatIdx}`}>
													{chatElmt.sender_id === user.id ? (
														<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
															<Box
																sx={{
																	display: "flex",
																	flexDirection: "column",
																	rowGap: "4px",
																	bgcolor: "#e3f2fd",
																	p: "12px",
																	borderRadius: "8px"
																}}
															>
																<Box sx={{ fontSize: "14px", color: theme.palette.grey[800] }}>
																	{chatElmt.message}
																</Box>
																<Box
																	sx={{
																		display: "flex",
																		justifyContent: "flex-end",
																		fontSize: "11px",
																		color: theme.palette.grey[500]
																	}}
																>
																	{chatElmt.created_at}
																</Box>
															</Box>
														</Box>
													) : (
														<Box sx={{ display: "flex", justifyContent: "flex-start" }}>
															<Box
																sx={{
																	display: "flex",
																	flexDirection: "column",
																	rowGap: "4px",
																	bgcolor: "#ede7f6",
																	p: "12px",
																	borderRadius: "8px"
																}}
															>
																<Box sx={{ fontSize: "14px", color: theme.palette.grey[800] }}>
																	{chatElmt.message}
																</Box>
																<Box
																	sx={{
																		display: "flex",
																		justifyContent: "flex-end",
																		fontSize: "11px",
																		color: theme.palette.grey[500]
																	}}
																>
																	{chatElmt.created_at}
																</Box>
															</Box>
														</Box>
													)}
												</Box>
											);
										})}
									</Box>
								)}
							</Box>
							<Box sx={{ p: "2px", display: "flex", columnGap: "12px", alignItems: "center" }}>
								<Controller
									name="message"
									defaultValue=""
									control={control}
									disabled={idReceiver > 0 ? false : true}
									render={({ field }) => {
										return <MyTextField {...field} fullWidth label={t("Type a message")} />;
									}}
								/>

								<IconButton color="primary" size="large" type="submit" disabled={idReceiver > 0 ? false : true}>
									<SendTwoToneIcon />
								</IconButton>
							</Box>
						</Box>
					</Box>
				)}
			</Box>
		</form>
	);
};

export default ChatFrm;
