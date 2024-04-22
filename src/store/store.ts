import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token/tokenSlice";
import tabsReducer from "./tabs/tabsSlice";
import { userAPI } from "../api/userAPI";

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        tabs: tabsReducer,
        [userAPI.reducerPath]: userAPI.reducer
        // can add more reducers, just make more slices
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
