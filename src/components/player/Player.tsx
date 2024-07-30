import ReactAudioPlayer from "react-audio-player";
import { PlayerSection } from "./PlayerSection";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AddPlaylistIcon } from "../icons/AddPlaylistIcon";
import { Icon } from "../icons/Icon";
import { TimeLine } from "./TimeLine";
import { ScrollText } from "../ScrollText";
interface PlayerProps {}

export function Player({}: PlayerProps) {
    const currentTrack = useSelector(
        (state: RootState) => state.tracksHistore.curentAudio
    );
    const [trackTime, setTrackTime] = useState(0);
    const [timeOFWholeTrack, setTimeOFWholeTrack] = useState(0);

    const [volume, setVolume] = useState(100);

    const setCurrentTime = (time: number) => {
        const audioNode: HTMLAudioElement | null = document.querySelector(
            ".react-audio-player"
        );
        if (audioNode) {
            audioNode.currentTime = time;
        }
    };

    const changeVolume = (time: number) => {
        setVolume(time);
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
                <ReactAudioPlayer
                    src={currentTrack.url}
                    autoPlay
                    loop
                    volume={volume / 100}
                />
            </div>
            <div className="flex gap-4 w-full justify-between h-full">
                <div className="flex items-center gap-4 min-w-[180px] w-[30%] pl-2">
                    <div
                        className="min-w-14 aspect-square bg-center bg-cover rounded-md"
                        style={{ backgroundImage: `url(${currentTrack.img})` }}
                    ></div>
                    <div className="flex flex-col flex-1 justify-center text-sm">
                        <ScrollText text={currentTrack.title} className="font-bold text-white" />
                        <ScrollText text={currentTrack.artist} />
                    </div>
                    <div className="flex items-center">
                        <AddPlaylistIcon />
                    </div>
                </div>
                <PlayerSection
                    trackTime={trackTime}
                    timeOFWholeTrack={timeOFWholeTrack}
                    setCurrentTime={setCurrentTime}
                />
                <div className="flex items-center justify-end gap-4 min-w-[180px] w-[30%] pr-2">
                    <div className="flex items-center justify-end gap-2 flex-1">
                        <span>
                            <Icon d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z" />
                        </span>
                        <div className="flex-1 max-w-44">
                            <TimeLine
                                max={100}
                                now={volume}
                                setCurrentTime={changeVolume}
                                showTime={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
