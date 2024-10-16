import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
    ImperativePanelHandle,
} from "react-resizable-panels";
import { LeftBar } from "../components/leftBar/LeftBar";
import { RightBar } from "../components/rightBar/RightBar";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSizeOfTabs } from "../store/tabs/tabsSlice";
import { RootState } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { setUrl } from "../store/leftTab/searchPlaylistsSlice";
import { UseTurnPlaylistByUrl } from "../hooks/UseTurnPlaylistByUrl";
import { Player } from "../components/player/Player";
import { setToken } from "../store/token/tokenSlice";
import { getTokenFromHash } from "../api/getAPI";

interface MainProps {
    children: React.ReactNode;
}
export function Main({ children }: MainProps) {
    const [showThirdTab, setShowThirdTab] = useState(true);
    const [showTemporaryThirdTab, setShowTemporaryThirdTab] = useState(true);
    const dispatch = useDispatch();
    const ref1 = useRef<ImperativePanelHandle>(null);
    const ref2 = useRef<ImperativePanelHandle>(null);
    const ref3 = useRef<ImperativePanelHandle>(null);

    const refParent = useRef<HTMLDivElement>(null);

    const token = useSelector((state: RootState) => state.token.value);
    const location = useLocation();
    const turnPlaylistByUrl = UseTurnPlaylistByUrl(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.location.hash.includes("access_token=")) {
            if (token === null) {
                localStorage.setItem("redirectUrl", window.location.pathname);
            }
        } else {
            dispatch(setToken(getTokenFromHash()));
        }
    }, [window.location.href]);

    useEffect(() => {
        if (
            window.location.pathname.startsWith("/liubify")
                ? location.pathname.split("/")[3]
                : location.pathname.split("/")[2]
        ) {
            dispatch(setUrl(location.pathname));

            turnPlaylistByUrl();
        }
    }, [location.pathname]);

    useEffect(() => {
        if (token && !window.location.hash.includes("access_token=")) {
            const redirectUrl = localStorage.getItem("redirectUrl");
            if (redirectUrl) {
                navigate(redirectUrl);
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
                    {children}
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
            <Player thirdExpend={thirdExpend} thirdCollapce={thirdCollapce} />
        </div>
    );
}
