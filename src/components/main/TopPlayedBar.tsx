import { useState } from "react";
import { PlayButton } from "../PlayButton";
import { Icon } from "../icons/Icon";
import { AddPlaylistIcon } from "../icons/AddPlaylistIcon";

export function TopPlayedBar({}: {}) {
    return (
        <div className="p-6 flex justify-between text-sm">
            <div className="flex items-center gap-4">
                <PlayButton />
                <AddPlaylistIcon width="32" />
            </div>
        </div>
    );
}
