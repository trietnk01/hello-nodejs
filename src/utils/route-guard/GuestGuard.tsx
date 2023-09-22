import React from "react";
import { useNavigate } from "react-router-dom";

// project imports
import useAuth from "hooks/useAuth";

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */
interface GuardProps {
	children: React.ReactElement | null;
}
const GuestGuard: React.FC<GuardProps> = ({ children }) => {
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (isLoggedIn) {
			navigate("/admin/dashboard", { replace: true });
		}
	}, [isLoggedIn, navigate]);

	return children;
};

export default GuestGuard;
