// third-party
import { combineReducers } from "redux";
import loadingReducer from "./slices/loading";
import snackbarReducer from "./slices/snackbar";
import drawerReducer from "./slices/drawer";
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
	loading: loadingReducer,
	snackbar: snackbarReducer,
	drawer: drawerReducer
});

export default reducer;
