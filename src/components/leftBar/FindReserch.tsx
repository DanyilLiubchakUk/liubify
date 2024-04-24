import { useEffect, useRef, useState } from "react";
import { GrayIcon } from "../icons/grayIcon";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenSearch, setNewSearchText } from "../../store/leftTab/searchPlaylistsSlice";
import { RootState } from "../../store/store";

export function FindReserch({}: {}) {
    const dispatch = useDispatch();
    const search: string = useSelector(
        (state: RootState) => state.leftTab.seacrch
    );
    const isOpen: boolean = useSelector(
        (state: RootState) => state.leftTab.isOpenSearch
    );
    const inputRef = useRef<HTMLDivElement>(null);
    const handeOpen = () => {
        dispatch(setIsOpenSearch(!isOpen))
        if (!isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    };
    const handleClickOutside = (e: Event) => {
        if (
            inputRef.current?.firstElementChild?.nextElementSibling?.getAttribute(
                "value"
            )?.length == 0 &&
            !isOpen &&
            !inputRef.current?.contains(e.target as Node)
        ) {
            dispatch(setIsOpenSearch(false))
            document.removeEventListener("mousedown", handleClickOutside);
        }
    };
    useEffect(() => {
        document.removeEventListener("mousedown", handleClickOutside);
        if(isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-between gap-1 items-center grow">
            {/*w-full or not(size of screen) */}
            <div
                className={`flex rounded-md transition-all duration-500 relative${
                    isOpen
                        ? " w-[170px] bg-neutral-800 overflow-hidden"
                        : " w-[32px]"
                }`}
                ref={inputRef}
            >
                <span
                    onClick={handeOpen}
                    className="p-2 hover:bg-neutral-800 transition-colors duration-300 rounded-full"
                >
                    <GrayIcon d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z" />
                </span>
                {isOpen && (
                    <>
                        <input
                            className="bg-transparent outline-none text-xs w-28 text-neutral-400"
                            type="text"
                            value={search}
                            onChange={(e) =>
                                dispatch(setNewSearchText(e.target.value))
                            }
                            placeholder="Search in Your Library"
                        />
                        {search && (
                            <span
                                onClick={() => dispatch(setNewSearchText(""))}
                                className="absolute right-2 top-[50%] translate-y-[-50%]"
                            >
                                <GrayIcon d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z" />
                            </span>
                        )}
                    </>
                )}
            </div>
            <div className="flex gap-2 items-center py-1 pr-3 pl-4 hover:text-stone-100 hover:fill-stone-100 transition-colors duration-300">
                <span className="text-sm">Recents</span>
                <GrayIcon d="M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z" />
            </div>
        </div>
    );
}
