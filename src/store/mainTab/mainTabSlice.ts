import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    indexOfSecondScroll: 0,
};

const mainTab = createSlice({
    name: "mainTab",
    initialState,
    reducers: {
        setSecondTabScroll: (
            state,
            action: {
                payload: number;
                type: string;
            }
        ) => {
            state.indexOfSecondScroll = action.payload;
        },
    },
});

export default mainTab.reducer; // reducer - all slice logic :)
export const { setSecondTabScroll } = mainTab.actions; // actions
