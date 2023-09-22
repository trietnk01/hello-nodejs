import { JWTProvider as AuthProvider } from "contexts/JWTContext";
import React from "react";
import Routes from "routes";
import LoadingSpinner from "ui-component/LoadingSpinner";
import Locales from "ui-component/Locales";
import Snackbar from "ui-component/Snackbar";
const App = () => {
	return (
		<Locales>
			<AuthProvider>
				<React.Fragment>
					<Routes />
					<Snackbar />
					<LoadingSpinner />
				</React.Fragment>
			</AuthProvider>
		</Locales>
	);
};

export default App;
