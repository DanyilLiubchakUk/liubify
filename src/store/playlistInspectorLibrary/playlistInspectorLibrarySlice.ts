import { createSlice } from "@reduxjs/toolkit";
import { ITrackPlayedData } from "../../models/api";

interface Ihistory {
    previewData: { data: ITrackPlayedData | null; id: string; new: boolean };
    playlistItemsData: { data: ITrackPlayedData[]; id: string; new: boolean };
    queueItemsData: { data: ITrackPlayedData[]; id: string; new: boolean };
    mainArray: ITrackPlayedData[];
    historyArray: ITrackPlayedData[];
    currentAudio: ITrackPlayedData;
    currentAudioIndex: number;
    currentAudioHistoryIndex: number;
    playButtons: {
        [key: string]: boolean;
    };
    playState: boolean;
}

const initialState: Ihistory = {
    previewData: { data: null, id: "", new: false },
    playlistItemsData: { data: [], id: "", new: false },
    queueItemsData: { data: [], id: "", new: false },
    mainArray: [],
    historyArray: [],
    currentAudio: {
        url: "",
        title: "",
        id: "",
        img: "",
        artist: "",
        albumName: "",
    },
    currentAudioIndex: 0,
    currentAudioHistoryIndex: 0,
    playButtons: {},
    playState: false,
};

const playlistInspectorLibrarySlice = createSlice({
    name: "playlistHistory",
    initialState,
    reducers: {
        addToTypeDataSlot: (
            state,
            action: {
                payload: {
                    data: ITrackPlayedData | ITrackPlayedData[];
                    type: "preview" | "playlist" | "queue";
                    id: string;
                };
                type: string;
            }
        ) => {
            if (
                action.payload.type === "preview" &&
                !Array.isArray(action.payload.data)
            ) {
                state.previewData = {
                    data: action.payload.data,
                    id: action.payload.id,
                    new: true,
                };
                // if there will be a broblem(make check if the id is the same as the old one, and then just update the array, otherwise switch to the new array)
            }
            if (
                action.payload.type === "playlist" &&
                Array.isArray(action.payload.data) &&
                ((state.playlistItemsData.data.length !==
                    action.payload.data.length &&
                    state.playlistItemsData.id === action.payload.id) ||
                    state.playlistItemsData.id !== action.payload.id)
            ) {
                if (action.payload.id !== state.playlistItemsData.id) {
                    state.currentAudioIndex = 0;
                    if (state.historyArray.length !== 0) {
                        state.currentAudioHistoryIndex += 1;
                    }
                }
                state.playlistItemsData = {
                    data: action.payload.data,
                    id: action.payload.id,
                    new: true,
                };
            }
            if (
                action.payload.type === "queue" &&
                Array.isArray(action.payload.data)
            ) {
                state.queueItemsData = {
                    data: [
                        ...state.queueItemsData.data,
                        ...action.payload.data,
                    ],
                    id: action.payload.id,
                    new: true,
                };
            }
        },
        changeMainArray: (state) => {
            if (state.previewData.data !== null && state.previewData.new) {
                state.currentAudio = state.previewData.data;
                state.playState = true;
                state.previewData.new = false;
            }
            if (
                state.playlistItemsData.new &&
                state.playlistItemsData.data.length > 0
            ) {
                state.currentAudio =
                    state.playlistItemsData.data[state.currentAudioIndex];
                state.playState = true;

                state.playlistItemsData.new = false;
                state.mainArray = [
                    ...state.playlistItemsData.data,
                    ...state.queueItemsData.data,
                ];
                state.historyArray[state.currentAudioHistoryIndex] =
                    state.playlistItemsData.data[state.currentAudioIndex];
                state.historyArray.splice(
                    state.currentAudioHistoryIndex + 1,
                    state.historyArray.length -
                        state.currentAudioHistoryIndex -
                        1
                );
            }
        },
        addToAudioHistory: (state) => {
            if (
                state.mainArray.length !== 0 &&
                state.mainArray.length > 1 &&
                state.currentAudioIndex < state.mainArray.length - 1
            ) {
                if (
                    state.currentAudio.id ===
                    state.mainArray[state.currentAudioIndex + 1].id
                ) {
                    state.currentAudioIndex += 1;
                }
                state.currentAudioIndex += 1;
                state.currentAudioHistoryIndex += 1;
                state.historyArray[state.currentAudioIndex] =
                    state.mainArray[state.currentAudioIndex];
                state.currentAudio = state.mainArray[state.currentAudioIndex];
                state.playState = true;
            }
        },
        addCurrentIndex: (state) => {
            if (
                state.currentAudioHistoryIndex ===
                state.historyArray.length - 1
            ) {
                if (
                    state.mainArray.length !== 0 &&
                    state.mainArray.length > 1 &&
                    state.currentAudioIndex < state.mainArray.length - 1
                ) {
                    if (
                        state.currentAudio.id ===
                        state.mainArray[state.currentAudioIndex + 1].id
                    ) {
                        state.currentAudioIndex += 1;
                    }
                    state.currentAudioIndex += 1;
                    state.currentAudioHistoryIndex += 1;
                    state.historyArray[state.currentAudioHistoryIndex] =
                        state.mainArray[state.currentAudioIndex];
                    state.currentAudio =
                        state.mainArray[state.currentAudioIndex];
                    state.playState = true;
                }
            } else {
                state.currentAudioHistoryIndex += 1;
                state.currentAudio =
                    state.historyArray[state.currentAudioHistoryIndex];
                state.playState = true;
            }
        },
        subtractCurrentIndex: (state) => {
            if (state.currentAudioHistoryIndex > 0) {
                state.currentAudioHistoryIndex -= 1;
                state.currentAudio =
                    state.historyArray[state.currentAudioHistoryIndex];
                state.playState = true;
            }
        },
        setPlayedPlaylist: (
            state,
            action: { payload: { button?: string; to?: boolean }; type: string }
        ) => {
            state.playButtons = Object.fromEntries(
                Object.keys(state.playButtons).map((key) => [key, false])
            );
            if (action.payload.button !== undefined) {
                state.playButtons[action.payload.button] =
                    action.payload.to === undefined ? true : false;
            }
        },
        switchPlayStation: (state, action: { payload?: boolean }) => {
            if (action.payload === undefined) {
                state.playState = !state.playState;
            } else {
                state.playState = action.payload;
            }
        },
    },
});

export default playlistInspectorLibrarySlice.reducer; // reducer - all slice logic :)
export const {
    addToTypeDataSlot,
    changeMainArray,
    addToAudioHistory,
    addCurrentIndex,
    subtractCurrentIndex,
    setPlayedPlaylist,
    switchPlayStation,
} = playlistInspectorLibrarySlice.actions; // actions
