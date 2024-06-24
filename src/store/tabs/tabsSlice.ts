import { createSlice } from "@reduxjs/toolkit";

interface tabsState {
    firstTabSize: number | null;
    secondTabSize: number | null;
    thirdTabSize: number | null;
}
const initialState: tabsState = {
    firstTabSize: null,
    secondTabSize: null,
    thirdTabSize: null,
};

const tokenSlice = createSlice({
    name: "tabs",
    initialState,
    reducers: {
        setSizeOfTabs: (
            state,
            action: {
                payload: ["first" | "second" | "third", number];
                type: string;
            }
        ) => {
            const sizeInPixsel = action.payload[1];
            if (action.payload[0] === "first") {
                state.firstTabSize = sizeInPixsel;
            }
            if (action.payload[0] === "second") {
                state.secondTabSize = sizeInPixsel;
            }
            if (action.payload[0] === "third") {
                state.thirdTabSize = sizeInPixsel;
            }
        },
    },
});

export default tokenSlice.reducer; // reducer - all slice logic :)
export const { setSizeOfTabs } = tokenSlice.actions; // actions
