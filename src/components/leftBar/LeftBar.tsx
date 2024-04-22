// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
// import { Itoken } from "../../models/api";
import { PlaylistsWindow } from "./PlaylistsWindow";

export function LeftBar({}: {}) {
    // const token: Itoken = useSelector((state: RootState) => state.token.value);

    return (
        <aside className="h-full flex flex-col gap-[0.4em] text-stone-400 fill-stone-400">
            <nav className="bg-neutral-900 rounded-md">Home Search</nav>
            <PlaylistsWindow />
        </aside>
    );
}
