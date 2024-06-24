import React from "react";
import { AddPlaylistIcon } from "../../icons/AddPlaylistIcon";
import { Icon } from "../../icons/Icon";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface TruckProps {
    index: number;
}

export function Truck({ index }: TruckProps) {
    const secondTabSize = useSelector(
        (state: RootState) => state.tabs.secondTabSize
    );
    return (
        <div
            className={`truckOfPlaylist grid px-4 gap-4 hover:bg-[#fff1] h-8 items-center rounded-md group ${
                secondTabSize
                    ? secondTabSize <= 650
                        ? "grid-cols-[16px_minmax(120px,4fr)_minmax(100px,1fr)]"
                        : "grid-cols-[16px_minmax(120px,4fr)_minmax(120px,2fr)_minmax(100px,1fr)]"
                    : ""
            }`}
        >
            <div>
                <span className="group-hover:hidden">{index + 1}</span>
                <Icon
                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                    viewBox="24"
                    className="hidden group-hover:block fill-white"
                />
            </div>
            <div className="line-clamp-1 text-white">
                <span className="hover:underline cursor-pointer">
                    In the Bleak Midwinter (Prologue)
                </span>
            </div>
            {secondTabSize ? (
                secondTabSize > 650 ? (
                    <div className="line-clamp-1">
                        <span className="group-hover:text-white hover:underline cursor-pointer">
                            for King Country
                        </span>
                    </div>
                ) : null
            ) : null}
            <div className="flex items-center justify-end gap-3">
                <span className="opacity-0 group-hover:opacity-100">
                    <AddPlaylistIcon />
                </span>
                <span className="grow text-end">1:12</span>
                <span className="opacity-0 group-hover:opacity-100">
                    <Icon d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </span>
            </div>
        </div>
    );
}

/*

16px_minmax(120px,4fr)_minmax(120px,1fr)
*/
