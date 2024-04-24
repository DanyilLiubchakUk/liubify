import React from "react";

interface PlaylistProps {
    children?: React.ReactNode;
}

export function Playlists({ children }: PlaylistProps) {
    return <div className="playlists flex flex-col overflow-auto h-[calc(100dvh-312px)]">{children}</div>;
}
