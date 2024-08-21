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

    let fetchedTracks: Item[] = [];
    const isPlaylist = curentPlaylist.type === "playlist";
    const isArtist = curentPlaylist.type === "artist";

    const playlistTracks = UseGetApiTracksArr({
        funcApi: userAPI.useFetchPlaylistTracksByIDQuery,
        token: token,
        type: curentPlaylist.type,
        id: curentPlaylist.id,
        skip: isArtist,
    });

    const { data: fethedTopTracksOfArtist } =
        userAPI.useFetchTopTracksOfArtistByIDQuery(
            {
                token,
                id: curentPlaylist.id,
            },
            { skip: isPlaylist }
        );

    if (isPlaylist) {
        fetchedTracks = playlistTracks;
    } else if (isArtist && fethedTopTracksOfArtist) {
        fetchedTracks = fethedTopTracksOfArtist.tracks.map((v) => ({
            track: {
                id: v.id,
                duration_ms: v.duration_ms,
                name: v.name,
                uri: v.uri,
                preview_url: v.preview_url,
                album: {
                    name: v.album?.name || '',
                    images: [
                        {
                            url: v.album && v.album.images ? v.album.images[0].url : '',
                        },
                    ],
                },
            },
            added_by: {
                display_name: v.artists[0].name,
            },
        }));
    }

    return (
        <div className="px-6 pb-8 fill-stone-400 text-stone-400 font-medium">
            <TopLabelTrucks />
            <div>
                {fetchedTracks.map((v, i) => {
                    return (
                        <Truck key={i + ":" + v.track.id} index={i} track={v} />
                    );
                })}
            </div>
        </div>
    );
}
