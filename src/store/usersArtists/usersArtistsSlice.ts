import { createSlice } from "@reduxjs/toolkit";
import { IItemArtist } from "../../models/api";

interface tokenState {
    artistsArr: IItemArtist[];
    playlistsArr: IItemArtist[];
}
const initialState: tokenState = {
    artistsArr: [],
    playlistsArr: [],
};

const artistsSlice = createSlice({
    name: "artistsSlice",
    initialState,
    reducers: {
        setArtists: (state, action) => {
            state.artistsArr = action.payload;
        },
        setPlaylists: (state, action) => {
            state.playlistsArr = action.payload;
        },
    },
});

export default artistsSlice.reducer; // reducer - all slice logic :)
export const { setArtists, setPlaylists } = artistsSlice.actions; // actions
