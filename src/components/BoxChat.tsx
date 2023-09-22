import React, { memo } from "react";
import {
	Box,
	useTheme,
	Card,
	CardContent,
	ClickAwayListener,
	Divider,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	Popper,
	TextField,
	Typography,
	useMediaQuery,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Avatar,
	Button
} from "@mui/material";
import { useDispatch } from "store";
import { useTranslation } from "react-i18next";
import axios from "utils/axios";
import { DataTableLoading } from "components";
import useAuth from "hooks/useAuth";
import { END_POINT } from "configs";
import NoAvatar from "assets/images/no-avatar.jpg";
interface IUser {
	id: number;
	display_name: string;
	email: string;
	phone: string;
	avatar: string;
}
type BoxChatProps = {
	onSetReceiverId: (receiverId: number) => void;
};
const BoxChat: React.FC<BoxChatProps> = React.memo(({ onSetReceiverId }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const { t } = useTranslation();
	const { user } = useAuth();
	const [userList, setUserList] = React.useState<IUser[]>([]);
	const [isLoading, setLoading] = React.useState<boolean>(true);
	let mounted: boolean = true;
	React.useEffect(() => {
		const init = async () => {
			const res: any = await axios.get(`/users/chat-box-list/${user?.id}`);
			if (mounted) {
				setLoading(false);
				const { status, items } = res.data;
				if (status) {
					setUserList(items);
				}
			}
		};
		init();
		return () => {
			mounted = false;
		};
	}, []);
	const handleClick = (receiverId: number) => () => {
		onSetReceiverId(receiverId);
	};
	const dataTableLoaded = () => {
		return (
			<React.Fragment>
				{userList.length > 0 ? (
					<React.Fragment>
						{userList.map((elmt: IUser, idx: number) => {
							return (
								<TableRow hover key={`chat-box-user-item-${idx}`}>
									<TableCell sx={{ width: "50px" }}>
										<Avatar src={elmt.avatar ? END_POINT.URL_SERVER + `/images/` + elmt.avatar : NoAvatar} />
									</TableCell>
									<TableCell>
										<Box>
											<Button
												sx={{ fontWeight: 600, color: theme.palette.grey[900], p: 0 }}
												onClick={handleClick(elmt.id)}
											>
												{elmt.display_name}
											</Button>
										</Box>
										<Box sx={{ color: theme.palette.grey[400], fontSize: 11 }}>{elmt.email}</Box>
									</TableCell>
								</TableRow>
							);
						})}
					</React.Fragment>
				) : (
					<React.Fragment></React.Fragment>
				)}
			</React.Fragment>
		);
	};
	return (
		<Box
			sx={{
				width: "400px",
				p: "10px",
				border: "1px solid",
				borderColor: theme.palette.grey[300],
				bgcolor: "#FFF",
				borderRadius: "6px",
				height: "900px",
				overflowX: "hidden"
			}}
		>
			{userList.length > 0 && (
				<TableContainer>
					<Table>
						<TableBody>
							<DataTableLoading isLoading={isLoading} data={dataTableLoaded()} numColumn={2} />
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Box>
	);
});

export default BoxChat;
