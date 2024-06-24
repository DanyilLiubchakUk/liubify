import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React from "react";

interface PlaylistProps {
    children?: React.ReactNode;
}

export function Playlists({ children }: PlaylistProps) {
    return (
        <OverlayScrollbarsComponent
            defer
            options={{
                scrollbars: { theme: "os-theme-light", autoHide: "move" },
            }}
            className="overflow-auto h-full w-full pr-3 [&_.os-scrollbar-handle]:!w-3 [&_.os-scrollbar-handle]:!rounded-[2px] [&_.os-scrollbar-handle]:!opacity-60 [&_.os-scrollbar-handle]:!transition-[opacity] [&_.os-scrollbar-handle]:!duration-[400] [&_.os-scrollbar-handle]:!bg-[#fff4] [&_.os-scrollbar-handle:hover]:!opacity-100"
        >
            <div className="playlists flex flex-col h-[calc(100dvh-312px)]">
                {children}
            </div>
        </OverlayScrollbarsComponent>
    );
}
