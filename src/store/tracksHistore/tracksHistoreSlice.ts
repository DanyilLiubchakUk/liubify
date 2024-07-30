import { createSlice } from "@reduxjs/toolkit";

interface Ihistory {
    allAudio: ITrack[];
    curentIndex: number;
    curentAudio: ITrack;
}

interface ITrack {
    url: string;
    title: string;
    id: string;
    img: string;
    artist: string;
}

const initialState: Ihistory = {
    allAudio: [],
    curentIndex: 0,
    curentAudio: { url: "", title: "", id: "", img: "", artist: "" },
};

const tracksHistoreSlice = createSlice({
    name: "tracksHistore",
    initialState,
    reducers: {
        addToTrucksHistory: (
            state,
            action: {
                payload: ITrack;
                type: string;
            }
        ) => {
            if (action.payload.id !== state.curentAudio.id) {
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
                if (state.allAudio[state.curentIndex]) {
                    state.curentAudio = state.allAudio[state.curentIndex];
                }
            }
        },
        subtractCurentIndexOfTruck: (state) => {
            if (state.curentIndex > 0) {
                state.curentIndex -= 1;
                if (state.allAudio[state.curentIndex]) {
                    state.curentAudio = state.allAudio[state.curentIndex];
                }
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
