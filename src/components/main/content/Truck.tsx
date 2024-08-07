import { AddPlaylistIcon } from "../../icons/AddPlaylistIcon";
import { Icon } from "../../icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Item } from "../../../models/api";
import { addToTrucksHistory } from "../../../store/tracksHistore/tracksHistoreSlice";

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
            className={`truckOfPlaylist grid px-4 gap-4 hover:bg-[#fff1] h-8 items-center rounded-md group ${
                secondTabSize
                    ? secondTabSize <= 900
                        ? "grid-cols-[16px_minmax(120px,4fr)_minmax(100px,1fr)]"
                        : "grid-cols-[16px_minmax(120px,4fr)_minmax(120px,2fr)_minmax(100px,1fr)]"
                    : ""
            }${track.track.preview_url === null ? " opacity-50" : ""}`}
        >
            <div>
                <span className="group-hover:hidden">{index + 1}</span>
                <button
                    className="flex items-center justify-center"
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
                                        track.track.album?.images?.[0]?.url ||
                                        "",
                                    artist:
                                        track.added_by?.display_name ||
                                        track.track?.artists?.[0].name ||
                                        "Unknown Artist",
                                })
                            );
                        }
                    }}
                >
                    <Icon
                        d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                        viewBox="24"
                        className="hidden group-hover:block fill-white"
                    />
                </button>
            </div>
            <div className="line-clamp-1 text-white">
                <span className="hover:underline cursor-pointer">
                    {track.track.name}
                </span>
            </div>
            {secondTabSize ? (
                secondTabSize > 900 ? (
                    <div className="line-clamp-1">
                        <span className="group-hover:text-white hover:underline cursor-pointer">
                            {track.added_by?.display_name ||
                                track.track?.artists?.[0].name}
                        </span>
                    </div>
                ) : null
            ) : null}
            <div className="flex items-center justify-end gap-3">
                <span className="opacity-0 group-hover:opacity-100">
                    <AddPlaylistIcon />
                </span>
                <span className="grow text-end">{timeOfTrack}</span>
                <span className="opacity-0 group-hover:opacity-100">
                    <Icon d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </span>
            </div>
        </div>
    );
}
