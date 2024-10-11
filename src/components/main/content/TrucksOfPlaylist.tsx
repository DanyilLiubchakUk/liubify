import { useSelector } from "react-redux";
import { UseGetApiTracksArr } from "../../../hooks/UseGetApiTracksArr";
import { TopLabelTrucks } from "./TopLabelTrucks";
import { Truck } from "./Truck";
import { RootState } from "../../../store/store";
import { userAPI } from "../../../api/userAPI";
import { Item, ITrackPlayedData, ITracksOfAlbum } from "../../../models/api";
import { A11yFocus } from "../../focus/A11yFocus";
import { useEffect } from "react";
import { UseRandomId } from "../../../hooks/UseRandomId";
import { UsePlayInspector } from "../../../hooks/UsePlayInspector";

export function TrucksOfPlaylist({}: {}) {
    const curentPlaylist = useSelector(
        (state: RootState) => state.playlistHistory.curentPlaylist
    );
    const token = useSelector((state: RootState) => state.token.value);
    const { ["mainWindow-" + curentPlaylist.id]: mainWindowButtonState } =
        useSelector(
            (state: RootState) => state.playlistInspectorLibrary.playButtons
        );

    const { addToTypeData } = UsePlayInspector();

    let fetchedTracks: Item[] = [];
    const isPlaylist = curentPlaylist.type === "playlist";
    const isArtist = curentPlaylist.type === "artist";
    const isAlbum = curentPlaylist.type === "album";

    const playlistTracks = UseGetApiTracksArr({
        funcApi: userAPI.useFetchPlaylistTracksByIDQuery,
        token: token,
        type: curentPlaylist.type,
        id: curentPlaylist.id,
        skip: !isPlaylist,
    });

    const { data: fethedTopTracksOfArtist } =
        userAPI.useFetchTopTracksOfArtistByIDQuery(
            {
                token,
                id: curentPlaylist.id,
            },
            { skip: !isArtist }
        );
    const albumsTracks: ITracksOfAlbum[] = UseGetApiTracksArr({
        funcApi: userAPI.useFetchAlbumTracksByIDQuery,
        token: token,
        type: curentPlaylist.type,
        id: curentPlaylist.id,
        skip: !isAlbum,
    });

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
                    name: v.album?.name || "",
                    images: [
                        {
                            url:
                                v.album && v.album.images
                                    ? v.album.images[0].url
                                    : "",
                        },
                    ],
                },
            },
            added_by: {
                display_name: v.artists[0].name,
            },
        }));
    } else if (isAlbum && albumsTracks) {
        fetchedTracks = albumsTracks.map((v) => ({
            track: {
                id: v.id,
                duration_ms: v.duration_ms,
                name: v.name,
                uri: v.uri,
                preview_url: v.preview_url,
                album: {
                    name: curentPlaylist.name || "",
                    images: [
                        {
                            url: curentPlaylist.images[0].url || "",
                        },
                    ],
                },
            },
            added_by: {
                display_name: v.artists[0].name,
            },
        }));
    }

    const id = UseRandomId(curentPlaylist.id);
    useEffect(() => {
        if (mainWindowButtonState) {
            addToTypeData({
                data: fetchedTracks
                    .map((track) => {
                        if (track.track.preview_url) {
                            return {
                                url: track.track.preview_url,
                                title: track.track.name,
                                id: track.track.id,
                                img: track.track.album?.images?.[0]?.url || "",
                                artist:
                                    track.added_by?.display_name ||
                                    track.track?.artists?.[0].name ||
                                    "Unknown Artist",
                                albumName: track.track.album?.name || "",
                            };
                        }
                        return undefined;
                    })
                    .filter(
                        (track): track is ITrackPlayedData =>
                            track !== undefined
                    ),
                type: "playlist",
                id,
            });
        }
    }, [mainWindowButtonState, fetchedTracks]);

    return (
        <div className="px-6 pb-8 fill-stone-400 text-stone-400 font-medium">
            <TopLabelTrucks />
            <A11yFocus
                id="select-playlist"
                onFocusListElement={(el) => {
                    (
                        el.querySelector(
                            ".select-button>ul>li:first-child button"
                        ) as HTMLElement
                    )?.focus();
                }}
                onlyVertical
                className="scroll-mt-28"
            >
                <ul>
                    {fetchedTracks.map((v, i) => {
                        return (
                            <li key={i + ":" + v.track.id}>
                                <Truck index={i} track={v} />
                            </li>
                        );
                    })}
                </ul>
            </A11yFocus>
        </div>
    );
}
