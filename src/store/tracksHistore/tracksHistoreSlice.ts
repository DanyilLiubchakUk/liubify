import { createSlice } from "@reduxjs/toolkit";
import { ITrackPlayedData } from "../../models/api";

interface Ihistory {
    allAudio: ITrackPlayedData[];
    curentIndex: number;
    curentAudio: ITrackPlayedData;
}

const initialState: Ihistory = {
    allAudio: [],
    curentIndex: 0,
    curentAudio: { url: "", title: "", id: "", img: "", artist: "", albumName:"" },
};

const tracksHistoreSlice = createSlice({
    name: "tracksHistore",
    initialState,
    reducers: {
        addToTrucksHistory: (
            state,
            action: {
                payload: ITrackPlayedData;
                type: string;
            }
        ) => {
            if (action.payload.id !== state.curentAudio.id) {
                state.allAudio.splice(
                    state.curentIndex + 1,
                    state.allAudio.length - 1
                );
                if (state.allAudio.length !== 0) {
                    state.curentIndex += 1;
                }
                state.allAudio[state.curentIndex] = action.payload;
                state.curentAudio = action.payload;
            }
        },
        addCurentIndexOfTruck: (state) => {
            if (state.curentIndex < state.allAudio.length - 1) {
                state.curentIndex += 1;
                state.curentAudio = state.allAudio[state.curentIndex];
            }
        },
        subtractCurentIndexOfTruck: (state) => {
            if (state.curentIndex > 0) {
                state.curentIndex -= 1;
                state.curentAudio = state.allAudio[state.curentIndex];
            }
        },
    },
});

export default tracksHistoreSlice.reducer; // reducer - all slice logic :)
export const {
    addToTrucksHistory,
    addCurentIndexOfTruck,
    subtractCurentIndexOfTruck,
} = tracksHistoreSlice.actions; // actions
