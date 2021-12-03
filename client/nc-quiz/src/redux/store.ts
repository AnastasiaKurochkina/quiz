import { configureStore } from "@reduxjs/toolkit";
import userRedicer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userRedicer
    }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; 