import ReactAudioPlayer from "react-audio-player";
import { PlayerSection } from "./PlayerSection";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { AddPlaylistIcon } from "../icons/AddPlaylistIcon";
import { Icon } from "../icons/Icon";
import { TimeLine } from "./TimeLine";
import { ScrollText } from "../ScrollText";
import { UsePlay } from "../../hooks/UsePlay";
import { ClickAnimaiton } from "../icons/ClickAnimaiton";
import { addCurrentIndex } from "../../store/playlistInspectorLibrary/playlistInspectorLibrarySlice";
interface PlayerProps {
    thirdCollapce: () => void;
    thirdExpend: () => void;
}

export function Player({ thirdExpend, thirdCollapce }: PlayerProps) {
    const currentTrack = useSelector(
        (state: RootState) => state.playlistInspectorLibrary.currentAudio
    );

    const audioEl = useRef<HTMLAudioElement | null>(null);

    const [showThirdTab, setShowThirdTab] = useState(true);

    const dispatch = useDispatch();

    const { src, currentTime, timeOFWholeTrack, volume, controllTrack } =
        UsePlay({
            data: currentTrack,
            el: audioEl.current || null,
        });

    return (
        <div className="h-[72px] flex justify-center items-center fill-stone-400 text-stone-400">
            <div className="hidden">
                <ReactAudioPlayer
                    onEnded={() => dispatch(addCurrentIndex())}
                    src={src}
                    autoPlay
                    volume={volume.val / 100}
                    ref={(el) => {
                        if (el) {
                            audioEl.current = el.audioEl.current;
                        }
                    }}
                />
            </div>
            <div className="flex gap-4 w-full justify-between h-full">
                <div className="flex items-center gap-4 min-w-[180px] w-[30%] pl-2">
                    <div
                        className="min-w-14 aspect-square bg-center bg-cover rounded-md relative group"
                        style={{ backgroundImage: `url(${currentTrack.img})` }}
                    >
                        <ClickAnimaiton>
                            <button
                                className="absolute top-1 right-1 w-6 h-6 z-10 bg-black rounded-full items-center justify-center hidden group-hover:flex"
                                onClick={() => {
                                    setShowThirdTab(!showThirdTab);
                                    if (showThirdTab) {
                                        thirdCollapce();
                                    } else {
                                        thirdExpend();
                                    }
                                }}
                            >
                                <span>
                                    {showThirdTab ? (
                                        <Icon d="M.47 4.97a.75.75 0 0 1 1.06 0L8 11.44l6.47-6.47a.75.75 0 1 1 1.06 1.06L8 13.56.47 6.03a.75.75 0 0 1 0-1.06z" />
                                    ) : (
                                        <Icon d="M.47 11.03a.75.75 0 0 0 1.06 0L8 4.56l6.47 6.47a.75.75 0 1 0 1.06-1.06L8 2.44.47 9.97a.75.75 0 0 0 0 1.06z" />
                                    )}
                                </span>
                            </button>
                        </ClickAnimaiton>
                    </div>
                    <div className="flex flex-col flex-1 justify-center text-sm bg-black">
                        <ScrollText
                            text={currentTrack.title}
                            className="font-bold text-white"
                        />
                        <ScrollText text={currentTrack.artist} />
                    </div>
                    <div className="flex items-center">
                        <AddPlaylistIcon />
                    </div>
                </div>
                <PlayerSection
                    trackTime={currentTime.val}
                    timeOFWholeTrack={timeOFWholeTrack}
                    setCurrentTime={currentTime.fun}
                    controllTrack={controllTrack}
                />
                <div className="flex items-center justify-end gap-4 min-w-[180px] w-[30%] pr-2">
                    <div className="flex items-center justify-end gap-2 flex-1">
                        <span>
                            {volume.val <= 0.001 ? (
                                <Icon
                                    d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"
                                    d2="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"
                                />
                            ) : volume.val <= 33 ? (
                                <Icon d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z" />
                            ) : volume.val <= 66 ? (
                                <Icon d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z" />
                            ) : (
                                <Icon
                                    d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"
                                    d2="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"
                                />
                            )}
                        </span>
                        <div className="flex-1 max-w-44">
                            <TimeLine
                                max={100}
                                now={volume.val}
                                setCurrentTime={volume.fun}
                                showTime={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
