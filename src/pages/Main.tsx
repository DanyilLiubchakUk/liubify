import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
    ImperativePanelHandle,
} from "react-resizable-panels";
import { LeftBar } from "../components/leftBar/LeftBar";
import { MainPanel } from "../components/main/MainPanel";
import { RightBar } from "../components/rightBar/RightBar";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSizeOfTabs } from "../store/tabs/tabsSlice";
import { IAllPlaylists } from "../models/api";
import { RootState } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { setUrl } from "../store/leftTab/searchPlaylistsSlice";
import { UseTurnPlaylistByUrl } from "../hooks/UseTurnPlaylistByUrl";
import { RedirectURI } from "../api/API_DATA";

export function Main() {
    const [showThirdTab, setShowThirdTab] = useState(true);
    const [showTemporaryThirdTab, setShowTemporaryThirdTab] = useState(true);
    const dispatch = useDispatch();
    const ref1 = useRef<ImperativePanelHandle>(null);
    const ref2 = useRef<ImperativePanelHandle>(null);
    const ref3 = useRef<ImperativePanelHandle>(null);

    const refParent = useRef<HTMLDivElement>(null);

    const curentPlaylist: IAllPlaylists = useSelector(
        (state: RootState) => state.playlistHistory.curentPlaylist
    );
    const allPlaylists = useSelector(
        (state: RootState) => state.playlistHistory.allPlaylists
    );
    const token = useSelector((state: RootState) => state.token.value);
    const location = useLocation();
    const turnPlaylistByUrl = UseTurnPlaylistByUrl(true);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setUrl(location.pathname));
        if (!allPlaylists.some((p) => p.id === location.pathname.split('/')[2]) && location.pathname !== "/") {
            turnPlaylistByUrl();
        }
    }, [location.pathname]);

    useEffect(() => {
        if (!window.location.hash.includes("access_token=")) {
            if (token === null) {
                localStorage.setItem("redirectUrl", window.location.href);
            }
        }
    }, []);
    useEffect(() => {
        if (token && !window.location.hash.includes("access_token=")) {
            const redirectUrl = localStorage.getItem("redirectUrl");
            if (redirectUrl) {
                navigate(redirectUrl.split(RedirectURI).join(""));
            }
        }
    }, [token, window.location.hash]);

    const firtResize = () => {
        if (ref1.current && ref2.current && ref3.current) {
            const currentFirstSize = ref1.current.getSize();
            if (
                currentFirstSize > sizeOfLargeRightMenu &&
                sizeOfLargeRightMenu + sizeOfMinimumRightMenu * 2 >
                    currentFirstSize
            ) {
                ref1.current.resize(sizeOfLargeRightMenu);
            }
            if (
                currentFirstSize > sizeOfMinimumRightMenu * 2 &&
                sizeOfMiddleRightMenu > currentFirstSize
            ) {
                ref1.current.resize(sizeOfMiddleRightMenu);
            }
            if (currentFirstSize < sizeOfMinimumRightMenu * 2) {
                ref1.current.resize(sizeOfMinimumRightMenu);
            }

            if (currentFirstSize > 65) {
                if (showTemporaryThirdTab) {
                    setShowTemporaryThirdTab(false);
                }
                if (ref3.current.isExpanded()) {
                    thirdCollapce();
                }
            } else {
                if (!showTemporaryThirdTab) {
                    setShowTemporaryThirdTab(true);
                }
                if (showThirdTab) {
                    thirdExpend();
                }
            }
        }
    };
    const thirdCollapce = () => {
        ref3.current?.collapse();
        setShowThirdTab(false);
    };
    const thirdExpend = () => {
        setShowThirdTab(true);
        ref3.current?.expand();
    };

    const sizeOfMinimumRightMenu = (100 / window.innerWidth) * 64;
    const sizeOfMiddleRightMenu = (100 / window.innerWidth) * 280;
    const sizeOfLargeRightMenu = (100 / window.innerWidth) * 430;

    const changeTabsSizes = () => {
        dispatch(
            setSizeOfTabs([
                "first",
                (refParent.current?.firstChild?.childNodes[0] as HTMLElement)
                    ?.clientWidth,
            ])
        );
        dispatch(
            setSizeOfTabs([
                "second",
                (refParent.current?.firstChild?.childNodes[0] as HTMLElement)
                    ?.clientWidth,
            ])
        );
        dispatch(
            setSizeOfTabs([
                "third",
                (refParent.current?.firstChild?.childNodes[0] as HTMLElement)
                    ?.clientWidth,
            ])
        );
    };
    window.visualViewport?.addEventListener("resize", changeTabsSizes);

    return (
        <div
            ref={refParent}
            className="bg-black h-screen grid grid-rows-[1fr,72px] p-2"
        >
            <PanelGroup
                direction="horizontal"
                className="flex gap-[0.2rem] row-span-1"
            >
                <Panel
                    ref={ref1}
                    onResize={() => {
                        changeTabsSizes();
                        firtResize();
                    }}
                    defaultSize={20}
                    maxSize={80}
                    minSize={sizeOfMinimumRightMenu}
                >
                    <LeftBar />
                </Panel>
                <PanelResizeHandle
                    className={`w-[2px] transition-colors duration-700 my-4 rounded-xl relative
                    hover:bg-blue-300
                    data-[resize-handle-state=drag]:bg-blue-500
                    before:absolute before:w-[12px] before:translate-x-[-50%] before:left-[50%] before:h-full before:rounded-xl before:bg-gradient-to-r before:from-transparent before:from-[15%] before:via-blue-400 before:after-[85%] before:transparent before:transition-opacity before:duration-500 data-[resize-handle-state=drag]:before:delay-700
                    data-[resize-handle-state=drag]:before:opacity-100 before:opacity-0
                    `}
                />
                <Panel
                    onResize={() => {
                        changeTabsSizes();
                    }}
                    defaultSize={62}
                    minSize={30}
                    ref={ref2}
                >
                    {curentPlaylist.name !==
                    "___Null___89fd89sj333434fdfa$288#hh48LLfeee+-3e3ejd85" ? (
                        <MainPanel />
                    ) : null}
                </Panel>
                <PanelResizeHandle
                    className={`w-[2px] transition-colors duration-700 my-4 rounded-xl relative
                    hover:bg-blue-300
                    data-[resize-handle-state=drag]:bg-blue-500
                    before:absolute before:w-[12px] before:translate-x-[-50%] before:left-[50%] before:h-full before:rounded-xl before:bg-gradient-to-r before:from-transparent before:from-[15%] before:via-blue-400 before:after-[85%] before:transparent before:transition-opacity before:duration-500 data-[resize-handle-state=drag]:before:delay-700
                    data-[resize-handle-state=drag]:before:opacity-100 before:opacity-0 
                    ${
                        ref3.current?.isCollapsed()
                            ? " hidden"
                            : showTemporaryThirdTab
                            ? ""
                            : " hidden"
                    }
                    `}
                />
                <Panel
                    defaultSize={18}
                    maxSize={22}
                    minSize={15}
                    ref={ref3}
                    collapsible
                    onResize={() => {
                        changeTabsSizes();
                    }}
                    className={`${
                        ref3.current?.isCollapsed()
                            ? " hidden"
                            : showTemporaryThirdTab
                            ? ""
                            : " hidden"
                    }`}
                >
                    <RightBar thirdCollapce={thirdCollapce} />
                </Panel>
            </PanelGroup>
            <div className="h-[72px]">
                play
                <button
                    onClick={() => {
                        thirdExpend();
                    }}
                >
                    On right
                </button>
            </div>
        </div>
    );
}
