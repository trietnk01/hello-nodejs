import { createSlice } from "@reduxjs/toolkit";
import { DefaultRootStateProps } from "types";

const initialState: DefaultRootStateProps["loading"] = {
	isShow: false
};
const slice = createSlice({
	name: "loading-slice",
	initialState,
	reducers: {
		showLoading: (state) => {
			state.isShow = true;
		},
		hideLoading: (state) => {
			state.isShow = false;
		}
	}
});
export default slice.reducer;
export const { showLoading, hideLoading } = slice.actions;
