import { createSlice } from "@reduxjs/toolkit";

interface tabsState {
    seacrch: string;
    isOpenSearch: boolean;
}
const initialState: tabsState = {
    seacrch: "",
    isOpenSearch: false,
};

const leftTab = createSlice({
    name: "tabs",
    initialState,
    reducers: {
        setNewSearchText: (state, action: { payload: string }) => {
            state.seacrch = action.payload;
        },
        setIsOpenSearch: (state, action: { payload: boolean }) => {
            state.isOpenSearch = action.payload;
        },
    },
});

export default leftTab.reducer; // reducer - all slice logic :)
export const { setNewSearchText, setIsOpenSearch } = leftTab.actions; // actions
