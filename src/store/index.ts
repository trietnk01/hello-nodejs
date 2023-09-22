// third-party
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";

// project imports
import rootReducer from "./reducer";

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, dispatch, useSelector, useDispatch };
