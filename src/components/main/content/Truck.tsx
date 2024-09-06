import { AddPlaylistIcon } from "../../icons/AddPlaylistIcon";
import { Icon } from "../../icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Item } from "../../../models/api";
import { addToTrucksHistory } from "../../../store/tracksHistore/tracksHistoreSlice";
import { ClickAnimaiton } from "../../icons/ClickAnimaiton";
import { A11yFocus } from "../../focus/A11yFocus";

interface TruckProps {
    index: number;
    track: Item;
}

export function Truck({ index, track }: TruckProps) {
    const dispatch = useDispatch();

    const secondTabSize =
        window.innerWidth -
        (useSelector((state: RootState) => state.tabs.secondTabSize) || 0);
    const timeOfTrack =
        Math.floor((track.track.duration_ms / 1000 / 60) << 0) +
        ":" +
        (Math.floor((track.track.duration_ms / 1000) % 60) <= 9
            ? "0" + Math.floor((track.track.duration_ms / 1000) % 60)
            : Math.floor((track.track.duration_ms / 1000) % 60));
    return (
        <div
            className={`truckOfPlaylist hover:bg-[#fff1] focus-visible:bg-[#fff1] group a11yFocus scroll-mt-28 [&:has(>div>ul>li_button:focus-visible)]:shadow-[inset_0_0_0_1px_#fff] [&:has(>div>ul>li_button:focus-visible)]:bg-[#fff1] rounded-md ${
                track.track.preview_url === null ? " opacity-50" : ""
            }`}
            aria-disabled={track.track.preview_url === null ? true : false}
        >
            <A11yFocus
                onlyHorizontal
                id="select-button"
                isParentFocusable={false}
                rememberFocus={false}
                startFrom={0}
            >
                <ul
                    className="grid px-4 gap-4 h-8 items-center rounded-md 
                    [&:has(>li:first-child_button:focus-visible)>li:nth-child(4)>div>div>button]:opacity-100 
                    [&:has(>li:first-child_button:focus-visible)>li:nth-child(4)>span]:opacity-100
                    [&:has(>li:nth-child(4)>span_button:focus-visible)>li:first-child>span]:hidden
                    [&:has(>li:nth-child(4)>span_button:focus-visible)>li:first-child_button>svg]:block
                    [&:has(>li:nth-child(4)>span_button:focus-visible)>li:nth-child(4)>div>div>button]:opacity-100
                    [&:has(>li:nth-child(4)>div>div>button:focus-visible)>li:nth-child(4)>span]:opacity-100
                    [&:has(>li:nth-child(4)>div>div>button:focus-visible)>li:first-child>span]:hidden
                    [&:has(>li:nth-child(4)>div>div>button:focus-visible)>li:first-child_button>svg]:block
                    "
                    style={{
                        gridTemplateColumns: `${
                            secondTabSize
                                ? secondTabSize <= 900
                                    ? "16px minmax(120px,4fr) minmax(100px,1fr)"
                                    : "16px minmax(120px,4fr) minmax(120px,2fr) minmax(100px,1fr)"
                                : ""
                        }`,
                    }}
                >
                    <li className="[&:has(>div>div>button:focus-visible)>span]:hidden">
                        <span className="group-hover:hidden group-focus-visible:hidden">
                            {index + 1}
                        </span>
                        <ClickAnimaiton>
                            <button
                                className="flex items-center justify-center [&:focus-visible>svg]:block"
                                disabled={
                                    track.track.preview_url === null
                                        ? true
                                        : false
                                }
                                onClick={() => {
                                    if (
                                        track.track &&
                                        track.track.preview_url &&
                                        track.track.name &&
                                        track.track.id
                                    ) {
                                        dispatch(
                                            addToTrucksHistory({
                                                url: track.track.preview_url,
                                                title: track.track.name,
                                                id: track.track.id,
                                                img:
                                                    track.track.album
                                                        ?.images?.[0]?.url ||
                                                    "",
                                                artist:
                                                    track.added_by
                                                        ?.display_name ||
                                                    track.track?.artists?.[0]
                                                        .name ||
                                                    "Unknown Artist",
                                                albumName:
                                                    track.track.album?.name ||
                                                    "",
                                            })
                                        );
                                    }
                                }}
                            >
                                <Icon
                                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                                    viewBox="24"
                                    className="hidden group-hover:block group-focus-visible:block fill-white"
                                />
                            </button>
                        </ClickAnimaiton>
                    </li>
                    <li className="line-clamp-1 text-white">
                        <span className="hover:underline cursor-pointer">
                            {track.track.name}
                        </span>
                    </li>
                    {secondTabSize ? (
                        secondTabSize > 900 ? (
                            <li className="line-clamp-1">
                                <span className="group-hover:text-white group-focus-visible:text-white hover:underline cursor-pointer">
                                    {track.added_by?.display_name ||
                                        track.track?.artists?.[0].name}
                                </span>
                            </li>
                        ) : null
                    ) : null}
                    <li className="flex items-center justify-end gap-3">
                        <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 [&:has(:focus-visible)]:opacity-100">
                            <AddPlaylistIcon />
                        </span>
                        <span className="grow text-end">{timeOfTrack}</span>
                        <ClickAnimaiton>
                            <button className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 focus-visible:opacity-100 mt-1.5">
                                <Icon d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </button>
                        </ClickAnimaiton>
                    </li>
                </ul>
            </A11yFocus>
        </div>
    );
}
