import { PlaylistsNavBar } from "./PlaylistsNavBar";

export function PlaylistsWindow({}: {}) {
    return (
        <div className="bg-neutral-900 flex-1 rounded-md flex flex-col px-3 py-3">
            <PlaylistsNavBar />
        </div>
    );
}
