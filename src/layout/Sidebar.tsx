import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { menuItems } from "menu-items";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "store";
import { toggleDrawer } from "store/slices/drawer";
import { DefaultRootStateProps } from "types";
const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end"
}));

const Sidebar = React.memo(() => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isOpenDrawer } = useSelector((state) => state.drawer);
	const handleToggleDrawer = () => {
		dispatch(toggleDrawer());
	};
	const handleClick = (txtUrl: string) => () => {
		if (txtUrl) {
			navigate(txtUrl);
		}
	};
	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box"
				}
			}}
			variant="persistent"
			anchor="left"
			open={isOpenDrawer}
		>
			<DrawerHeader>
				<IconButton onClick={handleToggleDrawer}>
					{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{menuItems.map((elmt: DefaultRootStateProps["NavItemType"], idx: number) => {
					return (
						<ListItem key={`list-item-idx-${idx}`} disablePadding>
							<ListItemButton onClick={handleClick(elmt.url ? elmt.url : "")}>
								<ListItemIcon>{idx % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={elmt.title ? elmt.title : ""} />
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Drawer>
	);
});

export default Sidebar;
