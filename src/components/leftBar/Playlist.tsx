import { useSelector } from "react-redux";
import { IAllPlaylists, IItemArtist } from "../../models/api";
import { RootState } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UseNewClickedPlaylist } from "../../hooks/UseNewClickedPlaylist";

interface PlaylistProps {
    playlist: IItemArtist;
}

export function Playlist({ playlist }: PlaylistProps) {
    const firstTabSize: number | null = useSelector(
        (state: RootState) => state.tabs.firstTabSize
    );
    const navigate = useNavigate();
    const newClickedPlaylist = () => {
        navigate(`/${playlist.type}/${playlist.id}`);
    };

    return (
        <div onClick={() => newClickedPlaylist()}>
            <div className="playlist grid grid-cols-12 items-center gap-3 hover:bg-stone-800 transition-colors px-2 py-1.5 mr-1 rounded-lg">
                <div
                    className={`flex gap-3 items-center${
                        firstTabSize !== null
                            ? firstTabSize < 450
                                ? " col-span-12"
                                : " col-span-8"
                            : ""
                    }`}
                >
                    <div
                        className={`min-w-12 h-12 bg-cover bg-center rounded${
                            playlist.type === "artist" ? " rounded-full" : ""
                        }`}
                        style={{
                            backgroundImage: `url(${playlist.images[0].url})`,
                        }}
                    ></div>
                    <div className="relative grow self-start">
                        <div className="flex flex-col">
                            <div className="relative h-12">
                                <span className="text-ellipsis overflow-hidden whitespace-nowrap left-0 right-0 absolute top-0.5 text-stone-100 text-md font-bold">
                                    {playlist.name}
                                </span>
                                <span className="text-ellipsis overflow-hidden whitespace-nowrap left-0 right-0 bottom-0.5 absolute">
                                    {playlist.type}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {firstTabSize !== null
                    ? firstTabSize >= 450 && (
                          <>
                              <div className="col-span-2 text-xs">
                                  Mar 1, 2024
                              </div>
                              <div className="col-span-2 text-end text-xs">
                                  2 days ago
                              </div>
                          </>
                      )
                    : null}
            </div>
        </div>
    );
}
