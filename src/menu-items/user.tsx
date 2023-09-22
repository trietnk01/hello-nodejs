// third-party

// assets
import React from "react";
import { FormattedMessage } from "react-intl";

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

interface UserMenuProps {
	id: string;
	title: React.ReactNode;
	url: string;
}

const dashboard: UserMenuProps = {
	id: "user",
	title: <FormattedMessage id="User" />,
	url: "/admin/user/list"
};

export default dashboard;
