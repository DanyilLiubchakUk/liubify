import { PlaylistsWindow } from "./PlaylistsWindow";

export function LeftBar({}: {}) {
    return (
        <aside className="text-stone-400 fill-stone-400 w-full">
            <nav className="bg-neutral-900 rounded-md mb-2 h-28">
                Home Search
            </nav>
            <PlaylistsWindow />
        </aside>
    );
}
