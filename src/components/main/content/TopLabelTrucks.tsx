import React from "react";
import { Icon } from "../../icons/Icon";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export function TopLabelTrucks({}: {}) {
    const secondTabSize = useSelector(
        (state: RootState) => state.tabs.secondTabSize
    );
    return (
        <div
            className={`h-9 border-b border-[#fff2] px-4 grid items-center gap-4 text-stone-400 font-bold text-md ${
                secondTabSize
                    ? secondTabSize <= 650
                        ? "grid-cols-[16px_minmax(120px,4fr)_minmax(100px,1fr)]"
                        : "grid-cols-[16px_minmax(120px,4fr)_minmax(120px,2fr)_minmax(100px,1fr)]"
                    : ""
            }`}
        >
            <div>#</div>
            <div>Title</div>
            {secondTabSize ? (
                secondTabSize > 650 ? (
                    <div>Artist</div>
                ) : null
            ) : null}
            <div className="flex justify-end">
                <span className="mr-8">
                    <Icon
                        d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                        d2="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"
                    />
                </span>
            </div>
        </div>
    );
}
