import { useDispatch, useSelector } from "react-redux";
import { ITrackPlayedData } from "../models/api";
import {
    addCurentIndexOfTruck,
    subtractCurentIndexOfTruck,
} from "../store/tracksHistore/tracksHistoreSlice";
import { RootState } from "../store/store";

interface UsePlaybackControlProps {
    el: HTMLAudioElement | null;
    data: ITrackPlayedData;
}

export function UsePlaybackControl({ el, data }: UsePlaybackControlProps) {
    const dispatch = useDispatch();
    const currentIndexTrack = useSelector(
        (state: RootState) => state.tracksHistore.curentIndex
    );
    const historyOfTrucks = useSelector(
        (state: RootState) => state.tracksHistore.allAudio
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
            currentIndexTrack !== 0
                ? () => dispatch(subtractCurentIndexOfTruck())
                : null,
        ],
        [
            "nexttrack",
            historyOfTrucks.length - 1 !== currentIndexTrack
                ? () => dispatch(addCurentIndexOfTruck())
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
