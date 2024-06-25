import { createSlice } from "@reduxjs/toolkit";

interface tabsState {
    seacrch: string;
    isOpenSearch: boolean;
    typesFilter: string[];
    url: string;
}
const initialState: tabsState = {
    seacrch: "",
    isOpenSearch: false,
    typesFilter: [],
    url: "/",
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
        addTypeFilter: (state, action: { payload: string }) => {
            state.typesFilter.push(action.payload);
        },
        removeTypeFilter: (state, action: { payload: string }) => {
            let indexOfDeleded = state.typesFilter.findIndex(
                (v) => v === action.payload
            );
            state.typesFilter.splice(indexOfDeleded, indexOfDeleded + 1);
        },
        setUrl: (state, action) => {
            state.url = action.payload;
        },
    },
});

export default leftTab.reducer; // reducer - all slice logic :)
export const {
    setNewSearchText,
    setIsOpenSearch,
    addTypeFilter,
    removeTypeFilter,
    setUrl,
} = leftTab.actions; // actions
