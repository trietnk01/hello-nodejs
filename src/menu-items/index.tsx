import { DefaultRootStateProps } from "types";
import dashboard from "./dashboard";
import user from "./user";
import chat from "./chat";
// ==============================|| MENU ITEMS ||============================== //

const menuItems: DefaultRootStateProps["NavItemType"][] = [dashboard, user, chat];

export { menuItems };
