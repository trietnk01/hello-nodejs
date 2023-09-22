import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import {
	Avatar,
	Box,
	Button,
	Card,
	Checkbox,
	IconButton,
	InputAdornment,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	useTheme
} from "@mui/material";
import { MyTextField } from "control";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "store";
import axios from "utils/axios";
import { openSnackbar } from "store/slices/snackbar";
import { DataTableLoading } from "components";
import NoAvatar from "assets/images/no-avatar.jpg";
import Swal from "sweetalert2";
import { END_POINT } from "configs";
interface IUser {
	id: number;
	name: string;
	email: string;
	phone: string;
	avatar: string;
	lang: string;
	currency: string;
}
const UserList = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const { t } = useTranslation();
	const dispatch = useDispatch();
	let mounted: boolean = true;
	const [search, setSearch] = React.useState<string>("");
	const [rows, setRows] = React.useState<IUser[]>([]);
	const [isLoading, setLoading] = React.useState<boolean>(true);
	const [selected, setSelected] = React.useState<number[]>([]);
	const isSelected = (id: number) => selected.indexOf(id) !== -1;
	const handleSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
		const val: string = new String(e?.target.value).toString();
		setSearch(val);
	};
	const loadData = () => {
		axios
			.get("/users/list")
			.then((res: any) => {
				if (mounted) {
					setLoading(false);
					const { status, items } = res.data;
					if (status) {
						setRows(items);
					}
				}
			})
			.catch((err: any) => {
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
			});
	};
	React.useEffect(() => {
		loadData();
		return () => {
			mounted = false;
		};
	}, []);
	const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			const newSelectedId = rows.map((n) => n.id);
			setSelected(newSelectedId!);
			return;
		}
		setSelected([]);
	};
	const handleSelectedItem = (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: number[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	};
	const handleDelete = (id: number) => () => {
		Swal.fire({
			icon: "warning",
			title: t("Confirmed delete").toString() + "?",
			showConfirmButton: true,
			showDenyButton: true,
			confirmButtonText: t("Argree").toString(),
			denyButtonText: t("No").toString()
		}).then(async (result: any) => {
			try {
				if (result.isConfirmed) {
					const res: any = await axios.delete(`/users/delete/${id}`, { headers: { isShowLoading: true } });
					const { status } = res.data;
					if (status) {
						dispatch(
							openSnackbar({
								open: true,
								message: t("Delete item successfully"),
								anchorOrigin: { vertical: "bottom", horizontal: "left" },
								variant: "alert",
								alert: {
									color: "success"
								},
								transition: "Fade",
								close: false
							})
						);
						loadData();
					} else {
						dispatch(
							openSnackbar({
								open: true,
								message: t("Delete item failure"),
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
		});
	};
	const dataTableLoaded = () => {
		return (
			<React.Fragment>
				{rows && rows.length > 0 ? (
					<React.Fragment>
						{rows.map((elmt: IUser, idx: number) => {
							const isItemSelected = isSelected(elmt.id);
							const labelId = `enhanced-table-checkbox-${idx}`;
							return (
								<TableRow hover key={`user-idx-${idx}`}>
									<TableCell onClick={(event) => handleSelectedItem(event, elmt.id)}>
										<Checkbox
											color="primary"
											checked={isItemSelected}
											inputProps={{
												"aria-labelledby": labelId
											}}
										/>
									</TableCell>
									<TableCell>
										<Avatar src={elmt.avatar ? END_POINT.URL_SERVER + `/images/` + elmt.avatar : NoAvatar} />
									</TableCell>
									<TableCell>{elmt.email}</TableCell>
									<TableCell>{elmt.name}</TableCell>
									<TableCell>{elmt.phone}</TableCell>
									<TableCell>
										<IconButton color="inherit" onClick={() => navigate(`/admin/user/edit/${elmt.id}`)}>
											<EditTwoToneIcon sx={{ fontSize: "1.3rem" }} />
										</IconButton>
										<IconButton color="inherit" onClick={handleDelete(elmt.id)}>
											<DeleteOutlineIcon sx={{ fontSize: "1.3rem" }} />
										</IconButton>
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
		<Card variant="outlined">
			<Box
				display="flex"
				alignItems="center"
				color={theme.palette.grey[800]}
				fontWeight={500}
				fontSize={20}
				height={60}
				borderBottom={1}
				pl={2}
				pr={2}
				borderColor={theme.palette.grey[300]}
			>
				{t("User list")}
			</Box>
			<Box p={2}>
				<Box display="flex" justifyContent="space-between" alignItems="center" height={60}>
					<Box>
						<MyTextField
							fullWidth
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon fontSize="small" />
									</InputAdornment>
								)
							}}
							onChange={handleSearch}
							value={search}
							size="small"
						/>
					</Box>
					<Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => navigate("/admin/user/add")}>
						{t("Add user")}
					</Button>
				</Box>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell width={30}>
									<Checkbox
										color="primary"
										indeterminate={selected.length > 0 && selected.length < rows.length}
										checked={rows.length > 0 && selected.length === rows.length}
										onChange={handleSelectAllClick}
										inputProps={{
											"aria-label": "select all desserts"
										}}
									/>
								</TableCell>
								<TableCell width={100}>{t("Avatar")}</TableCell>
								<TableCell width={300}>Email</TableCell>
								<TableCell>{t("Fullname")}</TableCell>
								<TableCell width={400}>{t("Phone")}</TableCell>
								<TableCell width={150}>{t("Action")}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<DataTableLoading isLoading={isLoading} data={dataTableLoaded()} numColumn={6} />
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Card>
	);
};

export default UserList;
