import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ScrollText } from "../ScrollText";
import { Icon } from "../icons/Icon";
import { AddPlaylistIcon } from "../icons/AddPlaylistIcon";
import { ClickAnimaiton } from "../icons/ClickAnimaiton";
import { useState } from "react";

interface MainContentProps {}

export function MainContent({}: MainContentProps) {
    const curentAudio = useSelector(
        (state: RootState) => state.tracksHistore.curentAudio
    );
    const [hoverState, setHoverState] = useState(false);

    return (
        <div className="px-4 pb-4">
            <div className="flex flex-col gap-4">
                <div
                    className="w-full aspect-square bg-center bg-cover rounded-md"
                    style={{ backgroundImage: `url(${curentAudio.img})` }}
                ></div>
                <div className="flex gap-4">
                    <div className="flex-1 bg-neutral-900">
                        <ScrollText
                            text={curentAudio.title}
                            className="font-bold text-2xl"
                            height="32"
                        />
                        <ScrollText
                            text={curentAudio.artist}
                            className="font-bold text-stone-400"
                            height="22"
                        />
                    </div>
                    <div className="flex items-center">
                        <AddPlaylistIcon />
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-neutral-800 p-2 mt-4 rounded-md text-neutral-400 fill-neutral-400">
                <div className="flex justify-between items-center flex-wrap gap-2 p-2 font-bold">
                    <span className="text-white">Next in queue</span>
                    <span className="text-sm">Open queue</span>
                </div>
                <div>
                    <div
                        className="flex items-center gap-2 p-2 group bg-neutral-800 hover:bg-neutral-700 rounded-md"
                        onMouseEnter={() => setHoverState(true)}
                        onMouseLeave={() => setHoverState(false)}
                    >
                        <button className="flex items-center justify-center">
                            <ClickAnimaiton>
                                <Icon
                                    d="M10 2v9.5a2.75 2.75 0 1 1-2.75-2.75H8.5V2H10zm-1.5 8.25H7.25A1.25 1.25 0 1 0 8.5 11.5v-1.25z"
                                    className="group-hover:hidden fill-white"
                                />
                                <Icon
                                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                                    viewBox="24"
                                    className="hidden group-hover:block fill-white"
                                />
                            </ClickAnimaiton>
                        </button>
                        <div
                            className="w-[46px] aspect-square bg-center bg-cover rounded-md"
                            style={{
                                backgroundImage: `url(${curentAudio.img})`,
                            }}
                        ></div>
                        <div className="flex-1 bg-inherit">
                            <ScrollText
                                text={curentAudio.title}
                                className="text-white"
                                height="22"
                                hoverState={hoverState}
                            />
                            <ScrollText
                                text={curentAudio.artist}
                                className="text-sm font-bold text-stone-400"
                                height="19"
                                hoverState={hoverState}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
