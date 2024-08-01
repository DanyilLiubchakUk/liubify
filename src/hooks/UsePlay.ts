import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    addCurentIndexOfTruck,
    subtractCurentIndexOfTruck,
} from "../store/tracksHistore/tracksHistoreSlice";
import { ITrackPlayedData } from "../models/api";
import { UsePlaybackControl } from "./UsePlaybackControl";

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
            if (el.paused) {
                el.play();
            } else {
                el.pause();
            }
        }
    };
    const back = () => {
        dispatch(subtractCurentIndexOfTruck());
    };
    const forward = () => {
        dispatch(addCurentIndexOfTruck());
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
