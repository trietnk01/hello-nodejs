import React from "react";
import { useNavigate } from "react-router-dom";

// project imports
import useAuth from "hooks/useAuth";

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
interface GuardProps {
	children: React.ReactElement | null;
}
const AuthGuard: React.FC<GuardProps> = ({ children }) => {
	const { isLoggedIn, user } = useAuth();
	const navigate = useNavigate();
	React.useEffect(() => {
		if (!isLoggedIn) {
			navigate("/admin/login", { replace: true });
		}
	}, [isLoggedIn, navigate, user]);

	return children;
};

export default AuthGuard;
