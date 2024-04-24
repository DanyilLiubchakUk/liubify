import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Playlists } from "./Playlists";
import { Playlist } from "./Playlist";
import { FindReserch } from "./FindReserch";

export function PlaylistsBlock({}: {}) {
    const firstTabSize: number | null = useSelector(
        (state: RootState) => state.tabs.firstTabSize
    );
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
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
            </Playlists>
        </div>
    );
}
