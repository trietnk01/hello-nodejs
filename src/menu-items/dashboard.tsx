// third-party

// assets
import { FormattedMessage } from "react-intl";

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

interface DashboardMenuProps {
	id: string;
	title: React.ReactNode;
	url: string;
}

const dashboard: DashboardMenuProps = {
	id: "dashboard",
	title: <FormattedMessage id="Dashboard" />,
	url: "/admin/dashboard"
};

export default dashboard;
