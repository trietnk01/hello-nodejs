// third-party

// assets
import React from "react";
import { FormattedMessage } from "react-intl";

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

interface ChatMenuProps {
	id: string;
	title: React.ReactNode;
	url: string;
}

const chat: ChatMenuProps = {
	id: "chat",
	title: <FormattedMessage id="Chat" />,
	url: "/admin/chat"
};

export default chat;
