import { createSlice } from "@reduxjs/toolkit";
import { IItemArtist } from "../../models/api";

interface tokenState {
    artistsArr: IItemArtist[];
}
const initialState: tokenState = {
    artistsArr: [],
};

const artistsSlice = createSlice({
    name: "artistsSlice",
    initialState,
    reducers: {
        addArtist: (state, action) => {
            state.artistsArr = [...state.artistsArr, ...action.payload];
        },
    },
});

export default artistsSlice.reducer; // reducer - all slice logic :)
export const { addArtist } = artistsSlice.actions; // actions
