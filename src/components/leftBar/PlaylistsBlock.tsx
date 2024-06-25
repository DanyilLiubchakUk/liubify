import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Playlists } from "./Playlists";
import { Playlist } from "./Playlist";
import { FindReserch } from "./FindReserch";
import { Itoken, IItemArtist } from "../../models/api";
interface PlaylistsBlockProps {
    leftBarPlaylists: IItemArtist[];
    isError: boolean;
    isLoading: boolean;
}
export function PlaylistsBlock({
    isError,
    isLoading,
    leftBarPlaylists,
}: PlaylistsBlockProps) {
    const firstTabSize: number | null = useSelector(
        (state: RootState) => state.tabs.firstTabSize
    );
    const serchPlaylistText = useSelector(
        (state: RootState) => state.leftTab.seacrch
    );
    const typesFilter = useSelector(
        (state: RootState) => state.leftTab.typesFilter
    );
    const token: Itoken = useSelector((state: RootState) => state.token.value);
    return (
        <div className="mt-4 text-stone-300 text-sm">
            <Playlists>
                {firstTabSize !== null
                    ? firstTabSize >= 450 && (
                          <div className="grid grid-cols-12 mr-1 gap-3 border-b-2 pb-1.5 border-b-stone-800 sticky top-0 bg-neutral-900 z-30">
                              <div className="col-span-8 ml-2">Title</div>
                              <div className="col-span-2">Date Added</div>
                              <div className="col-span-2 text-end mr-2">
                                  Played
                              </div>
                          </div>
                      )
                    : null}
                {firstTabSize !== null
                    ? firstTabSize < 450 && (
                          <div className="pb-2">
                              <FindReserch />
                          </div>
                      )
                    : null}
                {false ? (
                    token ? (
                        <p className="h-full flex justify-center items-center text-red-400 text-lg">
                            <span>Somethink went wrong</span>
                        </p>
                    ) : null
                ) : (
                    <>
                        {leftBarPlaylists
                            .filter((playlist) =>
                                playlist.name
                                    .toLowerCase()
                                    .includes(serchPlaylistText.toLowerCase())
                            )
                            .filter((playlist) => {
                                if (typesFilter.length > 0) {
                                    return typesFilter.some((v) => {
                                        return (
                                            v.toLowerCase() ===
                                            playlist.type.toLowerCase()
                                        );
                                    });
                                } else {
                                    return true;
                                }
                            })
                            .sort((playlistA, playlistB) => {
                                if (
                                    playlistA.type === "artist" &&
                                    playlistB.type === "artist"
                                ) {
                                    return (
                                        playlistB.popularity -
                                        playlistA.popularity
                                    );
                                } else {
                                    return 0;
                                }
                            })
                            .map((playlist) => {
                                return (
                                    <Playlist
                                        key={playlist.id}
                                        playlist={playlist}
                                    />
                                );
                            })}
                    </>
                )}
            </Playlists>
        </div>
    );
}
