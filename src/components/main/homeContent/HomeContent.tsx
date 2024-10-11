import { userAPI } from "../../../api/userAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { HomeBlock } from "./HomeBlock";
import { ClickAnimaiton } from "../../icons/ClickAnimaiton";
import { A11yFocus } from "../../focus/A11yFocus";
import { useEffect, useState } from "react";
import { RecentyPlayedTracksDataItem } from "../../../models/api";

export function HomeContent() {
    const token = useSelector((state: RootState) => state.token.value);

    const { data: tracks } = userAPI.useFetchRecentyPlayedTracksQuery(token, {
        skip: token === null,
    });

    const [currentCheckedButton, setcurrentCheckedButton] = useState("All");
    const [arrToShow, setArrToShow] = useState<RecentyPlayedTracksDataItem[]>(
        (tracks?.items || []).slice(0, 8)
    );

    useEffect(() => {
        if (tracks && tracks.items) {
            if (currentCheckedButton === "All") {
                setArrToShow(tracks.items.slice(0, 8));
            }
            if (currentCheckedButton === "Artist") {
                setArrToShow(
                    tracks.items
                        .filter((v) => {
                            if (
                                v.context?.type === "artists" ||
                                v.context === null
                            ) {
                                return true;
                            }
                            return false;
                        })
                        .splice(0, 8)
                );
            }
            if (currentCheckedButton === "Playlist") {
                setArrToShow(
                    tracks.items
                        .filter((v) => {
                            if (v.context?.type === "playlist") {
                                return true;
                            }
                            return false;
                        })
                        .splice(0, 8)
                );
            }
            if (currentCheckedButton === "Album") {
                setArrToShow(
                    tracks.items
                        .filter((v) => {
                            if (v.context?.type === "album") {
                                return true;
                            }
                            return false;
                        })
                        .splice(0, 8)
                );
            }
        }
    }, [currentCheckedButton, tracks, tracks?.items]);

    return (
        <div className="relative z-40 p-6 pb-8">
            <div className="text-stone-100 py-0.5">
                <A11yFocus>
                    <ul className="flex gap-2 items-center flex-wrap grow-[200]">
                        {["All", "Artist", "Playlist", "Album"].map((v) => {
                            return (
                                <li key={v}>
                                    <ClickAnimaiton>
                                        <button
                                            onClick={() =>
                                                setcurrentCheckedButton(v)
                                            }
                                            className={`px-2 py-0.5 rounded-xl text-md font-bold hover:bg-stone-300 hover:text-black focus-visible:bg-stone-700 transition-colors${
                                                currentCheckedButton === v
                                                    ? " bg-white text-black"
                                                    : " bg-stone-800 text-stone-100"
                                            } transition-colors duration-200`}
                                        >
                                            {v}
                                        </button>
                                    </ClickAnimaiton>
                                </li>
                            );
                        })}
                    </ul>
                </A11yFocus>
                {tracks !== undefined ? (
                    <HomeBlock
                        hNum={1}
                        className="text-2xl mt-8 text-white font-bold hover:underline inline-block cursor-pointer"
                        title="Recently played"
                        arrToShow={arrToShow}
                    />
                ) : null}
            </div>
        </div>
    );
}
