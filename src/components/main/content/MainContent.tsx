import { TopPlayedBar } from "../TopPlayedBar";
import { TrucksOfPlaylist } from "./TrucksOfPlaylist";

export function MainContent({}: {}) {
    return (
        <div className="relative z-40">
            <TopPlayedBar />
            <TrucksOfPlaylist />
        </div>
    );
}
