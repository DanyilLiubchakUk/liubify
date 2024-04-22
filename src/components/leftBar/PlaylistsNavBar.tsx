import { useEffect, useRef, useState } from "react";
import { GrayIcon } from "../icons/grayIcon";

export function PlaylistsNavBar({}: {}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const inputRef = useRef<HTMLDivElement>(null);
    const handeOpen = () => {
        setIsOpen(true);
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
            setIsOpen(false);
            document.removeEventListener("mousedown", handleClickOutside);
        }
    };
    useEffect(() => {
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <nav>
            <div className="library flex justify-between flex-wrap gap-2">
                <div className="library flex gap-2 flex-wrap items-center hover:text-stone-100 hover:fill-stone-100 transition-colors duration-300">
                    <GrayIcon
                        d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"
                        width="20"
                        className="flex-shrink-0"
                    />
                    <span className="text-lg font-bold">Your Library</span>
                </div>
                <div className="icons flex gap-3 items-center grow justify-end">
                    <span className="rounded-full hover:bg-neutral-800 transition-colors duration-300 p-0.5">
                        <GrayIcon
                            d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"
                            width="14"
                        />
                    </span>
                    <span className="rounded-full hover:bg-neutral-800 transition-colors duration-300 p-0.5">
                        <GrayIcon
                            d="M7.19 1A.749.749 0 0 1 8.47.47L16 7.99l-7.53 7.521a.75.75 0 0 1-1.234-.815.75.75 0 0 1 .174-.243l5.72-5.714H.75a.75.75 0 1 1 0-1.498h12.38L7.41 1.529a.749.749 0 0 1-.22-.53z"
                            width="14"
                        />
                    </span>
                </div>
            </div>
            <div className="searchMyPlaylist flex gap-3 items-center mt-4 flex-wrap">
                <div className="flex gap-2 items-center text-stone-100 grow-[200] py-0.5 flex-wrap">
                    {["Playlists", "Artists", "Albums"].map((v) => {
                        return (
                            <div className="bg-stone-800 px-2 py-0.5 rounded-xl text-md font-bold hover:bg-stone-700 transition-colors">
                                {v}
                            </div>
                        );
                    })}
                </div>
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
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search in Your Library"
                                />
                                {search && (
                                    <span
                                        onClick={() => setSearch("")}
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
            </div>
        </nav>
    );
}
