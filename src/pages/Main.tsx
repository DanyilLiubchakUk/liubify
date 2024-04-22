import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
    ImperativePanelHandle,
} from "react-resizable-panels";
import { LeftBar } from "../components/leftBar/LeftBar";
import { MainPanel } from "../components/main/MainPanel";
import { RightBar } from "../components/rightBar/RightBar";
import { useEffect, useRef } from "react";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
    setSizeOfTabs,
    setTemporaryIsShowThirdTab,
} from "../store/tabs/tabsSlice";

export function Main({}: {}) {
    const showThirdTab: boolean = useSelector(
        (state: RootState) => state.tabs.showThirdTab
    );
    const temporaryShowThirdTab: boolean = useSelector(
        (state: RootState) => state.tabs.temporaryShowThirdTab
    );
    const dispatch = useDispatch();
    const ref1 = useRef<ImperativePanelHandle>(null);
    const ref2 = useRef<ImperativePanelHandle>(null);
    const ref3 = useRef<ImperativePanelHandle>(null);
    useEffect(() => {
        if (ref3.current) {
            if (showThirdTab) {
                if (ref3.current.isCollapsed()) {
                    ref3.current.expand();
                }
            }
            if (!showThirdTab) {
                if (ref3.current.isExpanded()) {
                    ref3.current.collapse();
                }
            }
        }
    }, [showThirdTab]);
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

            if (currentFirstSize >= 63) {
                // if will adds add more (if !add)
                if (temporaryShowThirdTab) {
                    dispatch(setTemporaryIsShowThirdTab(false));
                    ref3.current.collapse();
                }
            } else {
                if (!temporaryShowThirdTab) {
                    dispatch(setTemporaryIsShowThirdTab(true));
                    ref3.current.expand();
                }
            }
        }
    };
    const sizeOfMinimumRightMenu = (100 / window.innerWidth) * 64;
    const sizeOfMiddleRightMenu = (100 / window.innerWidth) * 280;
    const sizeOfLargeRightMenu = (100 / window.innerWidth) * 420;
    return (
        <div className="bg-black flex flex-col h-screen">
            <PanelGroup
                direction="horizontal"
                className="flex gap-[0.2rem] px-2 pt-2"
            >
                <Panel
                    ref={ref1}
                    onResize={() => {
                        dispatch(
                            setSizeOfTabs([
                                "first",
                                ref1.current?.getSize() === undefined
                                    ? 0
                                    : ref1.current.getSize(),
                            ])
                        );
                        firtResize();
                    }}
                    defaultSize={sizeOfMiddleRightMenu}
                    maxSize={78}
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
                        dispatch(
                            setSizeOfTabs([
                                "second",
                                ref2.current?.getSize() === undefined
                                    ? 0
                                    : ref2.current.getSize(),
                            ])
                        );
                    }}
                    defaultSize={62}
                    minSize={15}
                    ref={ref2}
                >
                    <MainPanel />
                </Panel>
                <PanelResizeHandle
                    className={`w-[2px] transition-colors duration-700 my-4 rounded-xl relative
                    hover:bg-blue-300
                    data-[resize-handle-state=drag]:bg-blue-500
                    before:absolute before:w-[12px] before:translate-x-[-50%] before:left-[50%] before:h-full before:rounded-xl before:bg-gradient-to-r before:from-transparent before:from-[15%] before:via-blue-400 before:after-[85%] before:transparent before:transition-opacity before:duration-500 data-[resize-handle-state=drag]:before:delay-700
                    data-[resize-handle-state=drag]:before:opacity-100 before:opacity-0
                    ${
                        showThirdTab
                            ? temporaryShowThirdTab
                                ? ""
                                : " hidden"
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
                    className={`${
                        showThirdTab
                            ? temporaryShowThirdTab
                                ? ""
                                : " hidden"
                            : " hidden"
                    }`}
                    onResize={() => {
                        dispatch(
                            setSizeOfTabs([
                                "third",
                                ref3.current?.getSize() === undefined
                                    ? 0
                                    : ref3.current.getSize(),
                            ])
                        );
                    }}
                >
                    <RightBar />
                </Panel>
            </PanelGroup>
            <div className=" bg-dark">play</div>
        </div>
    );
}
