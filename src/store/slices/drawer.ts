import { createSlice } from "@reduxjs/toolkit";
import { DefaultRootStateProps } from "types";

const initialState: DefaultRootStateProps["drawer"] = {
	isOpenDrawer: true
};
const slice = createSlice({
	name: "drawer-slice",
	initialState,
	reducers: {
		toggleDrawer: (state) => {
			state.isOpenDrawer = !state.isOpenDrawer;
		}
	}
});
export default slice.reducer;
export const { toggleDrawer } = slice.actions;
