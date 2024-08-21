import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { TopArticle } from "./TopArticle";
import { useRef, useState } from "react";
import { MainContent } from "./MainContent";

interface RightBarProps {
    thirdCollapce: () => void;
}

export function RightBar({ thirdCollapce }: RightBarProps) {
    const ref = useRef<any>(null);
    const [scroll, setScroll] = useState(0);
    return (
        <aside className="bg-neutral-900 rounded-md fill-stone-400 h-full">
            <OverlayScrollbarsComponent
                defer
                events={{
                    scroll: () =>
                        setScroll(
                            ref.current.getElement().firstChild.nextSibling
                                .scrollTop
                        ),
                }}
                options={{
                    scrollbars: { theme: "os-theme-light", autoHide: "move" },
                }}
                className="overflow-auto h-full w-full [&_.os-scrollbar-handle]:!w-3 [&_.os-scrollbar-handle]:!rounded-[2px] [&_.os-scrollbar-handle]:!opacity-60 [&_.os-scrollbar-handle]:!transition-[opacity] [&_.os-scrollbar-handle]:!duration-[400] [&_.os-scrollbar-handle]:!bg-[#fff4] [&_.os-scrollbar-handle:hover]:!opacity-100"
                ref={ref}
            >
                <TopArticle scroll={scroll} thirdCollapce={thirdCollapce} />
                <MainContent />
            </OverlayScrollbarsComponent>
        </aside>
    );
}
