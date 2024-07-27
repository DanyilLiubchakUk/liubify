import ReactAudioPlayer from "react-audio-player";
import { PlayerSection } from "./PlayerSection";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
interface PlayerProps {}

export function Player({}: PlayerProps) {
    const currentTrack = useSelector(
        (state: RootState) => state.tracksHistore.curentAudio
    );
    const [trackTime, setTrackTime] = useState(0);
    const [timeOFWholeTrack, setTimeOFWholeTrack] = useState(0);

    const setCurrentTime = (time: number) => {
        const audioNode: HTMLAudioElement | null = document.querySelector(
            ".react-audio-player"
        );
        if (audioNode) {
            audioNode.currentTime = time;
        }
    };

    useEffect(() => {
        const audioNode: HTMLAudioElement | null = document.querySelector(
            ".react-audio-player"
        );
        if (audioNode) {
            audioNode.ontimeupdate = () => {
                if (audioNode.duration && audioNode.currentTime) {
                    setTrackTime(audioNode.currentTime);
                }
            };
            audioNode.onloadedmetadata = () => {
                setTimeOFWholeTrack(audioNode.duration);
            };
            
        }
    }, [currentTrack]);
    return (
        <div className="h-[72px] flex justify-center items-center fill-stone-400 text-stone-400">
            <div className="hidden">
                <ReactAudioPlayer src={currentTrack} autoPlay loop />
            </div>
            <div className="flex w-full justify-between">
                <div></div>
                <PlayerSection
                    trackTime={trackTime}
                    timeOFWholeTrack={timeOFWholeTrack}
                    setCurrentTime={setCurrentTime}
                />
                <div></div>
            </div>
        </div>
    );
}