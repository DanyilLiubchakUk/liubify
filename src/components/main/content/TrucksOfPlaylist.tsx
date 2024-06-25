import { useSelector } from "react-redux";
import { UseGetApiTracksArr } from "../../../hooks/UseGetApiTracksArr";
import { TopLabelTrucks } from "./TopLabelTrucks";
import { Truck } from "./Truck";
import { RootState } from "../../../store/store";
import { userAPI } from "../../../api/userAPI";
import { Item } from "../../../models/api";

export function TrucksOfPlaylist({}: {}) {
    const curentPlaylist = useSelector(
        (state: RootState) => state.playlistHistory.curentPlaylist
    );
    const token = useSelector((state: RootState) => state.token.value);

    let fetchedTracks: Item[] = []
    if (curentPlaylist.type === "playlist") {
        fetchedTracks = UseGetApiTracksArr({
            funcApi: userAPI.useFetchFolderByIDQuery,
            token: token,
            type: curentPlaylist.type,
            id: curentPlaylist.id,
        });
    }

    
    return (
        <div className="px-6 pb-8 fill-stone-400 text-stone-400 font-medium">
            <TopLabelTrucks />
            <div>
                {fetchedTracks.map((v, i) => {
                    return <Truck key={i} index={i} track={v} />;
                })}
            </div>
        </div>
    );
}
