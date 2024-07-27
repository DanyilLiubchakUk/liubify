import { createSlice } from "@reduxjs/toolkit";
import { IAllPlaylists } from "../../models/api";

interface Ihistory {
    allAudio: string[];
    curentIndex: number;
    curentAudio: string;
}

const initialState: Ihistory = {
    allAudio: [],
    curentIndex: 0,
    curentAudio: "",
};

const tracksHistoreSlice = createSlice({
    name: "tracksHistore",
    initialState,
    reducers: {
        addToTrucksHistory: (
            state,
            action: {
                payload: string;
                type: string;
            }
        ) => {
            if (action.payload !== state.curentAudio) {
                state.allAudio.splice(
                    state.curentIndex + 1,
                    state.allAudio.length - 1
                );
                state.allAudio.push(action.payload);
                state.curentAudio = state.allAudio[state.curentIndex];
            }
        },
        addCurentIndexOfTruck: (state) => {
            if (state.curentIndex <= state.allAudio.length - 1) {
                state.curentIndex += 1;
                state.curentAudio = state.curentAudio[state.curentIndex];
            }
        },
        subtractCurentIndexOfTruck: (state) => {
            if (state.curentIndex > 0) {
                state.curentIndex -= 1;
                state.curentAudio = state.curentAudio[state.curentIndex];
            }
        },
    },
});

export default tracksHistoreSlice.reducer; // reducer - all slice logic :)
export const { addToTrucksHistory, addCurentIndexOfTruck, subtractCurentIndexOfTruck } =
    tracksHistoreSlice.actions; // actions
