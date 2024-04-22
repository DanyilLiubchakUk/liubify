import { createSlice } from "@reduxjs/toolkit";

interface tokenState {
    value: string | null;
    user: {};
}
const initialState: tokenState = {
    value: null,
    user: {},
};

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload;
        },
    },
});

export default tokenSlice.reducer; // reducer - all slice logic :)
export const { setToken } = tokenSlice.actions; // actions
