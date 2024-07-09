import { createSlice } from "@reduxjs/toolkit";
import { IAllPlaylists } from "../../models/api";

interface Ihistory {
    allPlaylists: IAllPlaylists[];
    curentIndex: number;
    curentPlaylist: IAllPlaylists;
}

const initialState: Ihistory = {
    allPlaylists: [],
    curentIndex: 0,
    curentPlaylist: {
        href: "",
        id: "",
        images: [{ url: "", height: 0, width: 0 }],
        type: "",
        uri: "",
        name: "___Null___89fd89sj333434fdfa$288#hh48LLfeee+-3e3ejd85",
        external_urls: { spotify: "" },
    },
};

const playlistsHistorySlice = createSlice({
    name: "playlistHistory",
    initialState,
    reducers: {
        addToHistoryPlaylist: (
            state,
            action: {
                payload: IAllPlaylists;
                type: string;
            }
        ) => {
            if (action.payload.id !== state.curentPlaylist.id) {
                state.allPlaylists.splice(
                    state.curentIndex + 1,
                    state.allPlaylists.length - 1
                );
                state.allPlaylists.push(action.payload);
                state.curentPlaylist = state.allPlaylists[state.curentIndex];
            }
        },
        addCurentIndex: (state) => {
            if (state.curentIndex < state.allPlaylists.length - 1) {
                state.curentIndex += 1;
                state.curentPlaylist = state.allPlaylists[state.curentIndex];
            }
        },
        subtractCurentIndex: (state) => {
            if (state.curentIndex > 0) {
                state.curentIndex -= 1;
                state.curentPlaylist = state.allPlaylists[state.curentIndex];
            }
        },
    },
});

export default playlistsHistorySlice.reducer; // reducer - all slice logic :)
export const { addToHistoryPlaylist, addCurentIndex, subtractCurentIndex } =
    playlistsHistorySlice.actions; // actions
