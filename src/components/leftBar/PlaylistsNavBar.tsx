import { Icon } from "../icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FindReserch } from "./FindReserch";
import {
    addTypeFilter,
    removeTypeFilter,
} from "../../store/leftTab/searchPlaylistsSlice";
import { ClickAnimaiton } from "../icons/ClickAnimaiton";
import { useRef } from "react";
import { A11yFocus } from "../focus/A11yFocus";

export function PlaylistsNavBar({}: {}) {
    const firstTabSize: number | null = useSelector(
        (state: RootState) => state.tabs.firstTabSize
    );
    const typesFilter = useSelector(
        (state: RootState) => state.leftTab.typesFilter
    );
    const clickAnimationAddRef = useRef<any>(null);
    const clickAnimationNextRef = useRef<any>(null);

    const dispatch = useDispatch();

    const typeFilterHandler = (name: string) => {
        if (typesFilter.includes(name)) {
            dispatch(removeTypeFilter(name));
        } else {
            dispatch(addTypeFilter(name));
        }
    };

    const handleClickAdd = () => {
        if (clickAnimationAddRef.current) {
            clickAnimationAddRef.current.triggerClick();
        }
    };
    const handleClickNext = () => {
        if (clickAnimationNextRef.current) {
            clickAnimationNextRef.current.triggerClick();
        }
    };
    return (
        <nav className="pr-3">
            <div className="flex justify-between flex-wrap gap-2">
                <div>
                    <button className="flex gap-2 flex-wrap items-center hover:text-stone-100 focus-visible:fill-stone-100 focus-visible:text-stone-100 hover:fill-stone-100 transition-colors duration-300">
                        <Icon
                            d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"
                            width="20"
                            className="flex-shrink-0"
                        />
                        <span className="text-lg font-bold">Your Library</span>
                    </button>
                </div>
                <div className="icons flex gap-3 items-center grow justify-end">
                    <button
                        onClick={handleClickAdd}
                        className="rounded-full hover:bg-neutral-800 focus-visible:bg-neutral-800 transition-colors duration-300 p-1"
                    >
                        <ClickAnimaiton ref={clickAnimationAddRef}>
                            <Icon
                                d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"
                                width="16"
                            />
                        </ClickAnimaiton>
                    </button>
                    <button
                        onClick={handleClickNext}
                        className="rounded-full hover:bg-neutral-800 focus-visible:bg-neutral-800 transition-colors duration-300 p-1"
                    >
                        <ClickAnimaiton ref={clickAnimationNextRef}>
                            <Icon
                                d="M7.19 1A.749.749 0 0 1 8.47.47L16 7.99l-7.53 7.521a.75.75 0 0 1-1.234-.815.75.75 0 0 1 .174-.243l5.72-5.714H.75a.75.75 0 1 1 0-1.498h12.38L7.41 1.529a.749.749 0 0 1-.22-.53z"
                                width="16"
                            />
                        </ClickAnimaiton>
                    </button>
                </div>
            </div>
            <div className="searchMyPlaylist flex gap-3 items-center mt-4 flex-wrap">
                <div className="text-stone-100 py-0.5">
                    <A11yFocus>
                        <ul className="flex gap-2 items-center flex-wrap grow-[200]">
                            {["Playlist", "Artist"].map((v) => {
                                return (
                                    <li key={v}>
                                        <ClickAnimaiton>
                                            <button
                                                onClick={() => {
                                                    typeFilterHandler(v);
                                                }}
                                                className={`px-2 py-0.5 rounded-xl text-md font-bold hover:bg-stone-700 focus-visible:bg-stone-700 transition-colors${
                                                    typesFilter.includes(v)
                                                        ? " bg-stone-600"
                                                        : " bg-stone-800"
                                                } transition-colors duration-700`}
                                            >
                                                {`${v}s`}
                                            </button>
                                        </ClickAnimaiton>
                                    </li>
                                );
                            })}
                        </ul>
                    </A11yFocus>
                </div>
                {firstTabSize !== null
                    ? firstTabSize >= 450 && <FindReserch />
                    : null}
            </div>
        </nav>
    );
}
