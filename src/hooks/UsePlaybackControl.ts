import { useDispatch, useSelector } from "react-redux";
import { ITrackPlayedData } from "../models/api";
import { RootState } from "../store/store";
import {
    addCurrentIndex,
    subtractCurrentIndex,
    switchPlayStation,
} from "../store/playlistInspectorLibrary/playlistInspectorLibrarySlice";

interface UsePlaybackControlProps {
    el: HTMLAudioElement | null;
    data: ITrackPlayedData;
}

export function UsePlaybackControl({ el, data }: UsePlaybackControlProps) {
    const dispatch = useDispatch();
    const currentHistoryIndex = useSelector(
        (state: RootState) =>
            state.playlistInspectorLibrary.currentAudioHistoryIndex
    );
    const currentIndex = useSelector(
        (state: RootState) => state.playlistInspectorLibrary.currentAudioIndex
    );
    const historyOfTrucks = useSelector(
        (state: RootState) => state.playlistInspectorLibrary.mainArray
    );
    const currentAudio = useSelector(
        (state: RootState) => state.playlistInspectorLibrary.currentAudio
    );

    const changeData = () => {
        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: data.title,
                artist: data.artist,
                artwork: [{ src: data.img, type: "image/png" }],
            });
        }
    };

    const actionHandlers: [
        MediaSessionAction,
        MediaSessionActionHandler | null
    ][] = [
        [
            "previoustrack",
            currentHistoryIndex !== 0
                ? () => dispatch(subtractCurrentIndex())
                : null,
        ],
        [
            "nexttrack",
            historyOfTrucks.length - 1 !== currentIndex
                ? () => dispatch(addCurrentIndex())
                : null,
        ],
        [
            "pause",
            currentAudio.id.length > 0
                ? () => dispatch(switchPlayStation())
                : null,
        ],
        [
            "play",
            currentAudio.id.length > 0
                ? () => dispatch(switchPlayStation())
                : null,
        ],
    ];

    for (const [action, handler] of actionHandlers) {
        try {
            navigator.mediaSession.setActionHandler(
                action as MediaSessionAction,
                handler
            );
        } catch (error) {
            console.log(
                `The media session action "${action}" is not supported yet.`
            );
        }
    }

    return {
        controls: {
            changeData,
        },
    };
}
