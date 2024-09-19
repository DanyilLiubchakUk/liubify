import { PlayButton } from "../PlayButton";
import { AddPlaylistIcon } from "../icons/AddPlaylistIcon";
import { useDispatch, useSelector } from "react-redux";
import { setPlayedPlaylist } from "../../store/playlistInspectorLibrary/playlistInspectorLibrarySlice";
import { RootState } from "../../store/store";

export function TopPlayedBar({}: {}) {
    const dispatch = useDispatch();
    const currentPlaylist = useSelector(
        (state: RootState) => state.playlistHistory.curentPlaylist
    );
    const clickHandler = () => {
        dispatch(
            setPlayedPlaylist({ button: "mainWindow-" + currentPlaylist.id })
        );
    };
    return (
        <div className="p-6 flex justify-between text-sm">
            <div className="flex items-center gap-4">
                <PlayButton
                    onClick={clickHandler}
                    buttonId={"mainWindow-" + currentPlaylist.id}
                />
                <AddPlaylistIcon width="32" />
            </div>
        </div>
    );
}
