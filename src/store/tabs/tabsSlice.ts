import { createSlice } from "@reduxjs/toolkit";

interface tabsState {
    firstTabSize: number | null;
    secondTabSize: number | null;
    thirdTabSize: number | null;
    showThirdTab: boolean;
    temporaryShowThirdTab: boolean;
}
const initialState: tabsState = {
    firstTabSize: null,
    secondTabSize: null,
    thirdTabSize: null,
    showThirdTab: true,
    temporaryShowThirdTab: true,
};

const tokenSlice = createSlice({
    name: "tabs",
    initialState,
    reducers: {
        setIsShowThirdTab: (state, action) => {
            state.showThirdTab = action.payload; // this for any positoin for turn off thitd window/tab
        },
        setTemporaryIsShowThirdTab: (state, action) => {
            state.temporaryShowThirdTab = action.payload;
        },
        setSizeOfTabs: (
            state,
            action: {
                payload: ["first" | "second" | "third", number];
                type: string;
            }
        ) => {
            const sizeInPixsel = (action.payload[1] / 100) * window.innerWidth;
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
export const { setIsShowThirdTab, setTemporaryIsShowThirdTab, setSizeOfTabs } =
    tokenSlice.actions; // actions
