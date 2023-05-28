import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/appSlice";

const store = configureStore({
    reducer: {
        appState: appReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
