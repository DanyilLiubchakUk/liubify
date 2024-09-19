import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITrackPlayedData } from "../models/api";
import { UsePlaybackControl } from "./UsePlaybackControl";
import {
    addCurrentIndex,
    subtractCurrentIndex,
    switchPlayStation,
} from "../store/playlistInspectorLibrary/playlistInspectorLibrarySlice";
import { RootState } from "../store/store";

interface UsePlayProps {
    el: HTMLAudioElement | null;
    data: ITrackPlayedData;
}
export function UsePlay({ el, data }: UsePlayProps) {
    const dispatch = useDispatch();

    const [volume, setVolume] = useState(100);
    const [currentTime, setCurrentTime] = useState(0);
    const [timeOFWholeTrack, setTimeOFWholeTrack] = useState(0);

    const { controls } = UsePlaybackControl({ data, el });
    const playState = useSelector(
        (state: RootState) => state.playlistInspectorLibrary.playState
    );
    useEffect(() => {
        if (el) {
            controls.changeData();
            el.ontimeupdate = () => {
                if (el.duration && el.currentTime) {
                    setCurrentTime(el.currentTime);
                }
            };
            el.onloadedmetadata = () => {
                setTimeOFWholeTrack(el.duration);
            };
        }
    }, [data]);
    useEffect(() => {
        if (el && data.url) {
            if (playState) {
                el?.play();
            } else {
                el?.pause();
            }
        }
    }, [playState]);

    const setCurrentTimeOfAudio = (time: number) => {
        if (el) {
            el.currentTime = time;
        }
    };
    const changeVolume = (time: number) => {
        setVolume(time);
    };

    const pause = () => {
        if (el && data.url) {
            dispatch(switchPlayStation());
        }
    };
    const back = () => {
        dispatch(subtractCurrentIndex());
    };
    const forward = () => {
        dispatch(addCurrentIndex());
    };
    if (data) {
        return {
            src: data.url,
            currentTime: { val: currentTime, fun: setCurrentTimeOfAudio },
            timeOFWholeTrack,
            volume: { val: volume, fun: changeVolume },
            controllTrack: {
                back,
                forward,
                pause,
            },
        };
    } else {
        return {
            src: "",
            currentTime: { val: currentTime, fun: setCurrentTimeOfAudio },
            timeOFWholeTrack,
            volume: { val: volume, fun: changeVolume },
            controllTrack: {
                back,
                forward,
                pause,
            },
        };
    }
}
