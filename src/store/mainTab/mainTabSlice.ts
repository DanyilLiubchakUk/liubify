import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    indexOfSecondScroll: 0,
    heightOfMainCover: 300,
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
            state.indexOfSecondScroll = (action.payload - state.heightOfMainCover + 150) / 100;
        },
        setHightOfMainCover: (state, action) => {
            state.heightOfMainCover = action.payload;
        },
    },
});

export default mainTab.reducer; // reducer - all slice logic :)
export const { setSecondTabScroll, setHightOfMainCover } = mainTab.actions; // actions
