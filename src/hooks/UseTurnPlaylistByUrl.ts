import { useDispatch, useSelector } from "react-redux";
import { userAPI } from "../api/userAPI";
import { RootState } from "../store/store";
import { addToHistoryPlaylist } from "../store/playlistsHistory/playlistsHistorySlice";
import { UseAddToCurentIndex } from "./UseAddToCurentIndex";
import { useEffect } from "react";

export function UseTurnPlaylistByUrl(isNew: boolean = true) {
    const url = useSelector((state: RootState) => state.leftTab.url);
    const token = useSelector((state: RootState) => state.token.value);
    const artistsArr = useSelector(
        (state: RootState) => state.artistsSlice.artistsArr
    );
    const playlistsArr = useSelector(
        (state: RootState) => state.artistsSlice.playlistsArr
    );
    const allPlaylists = [...artistsArr, ...playlistsArr];

    const dispatch = useDispatch();
    const addToCurentIndex = UseAddToCurentIndex();

    const typeOfLink = url.split("/")[1];
    const idOfLink = url.split("/")[2];

    const { data, isLoading, isError } = userAPI.useFetchFolderByIDQuery(
        { token, type: typeOfLink, id: idOfLink },
        {
            skip: (typeOfLink !== "playlist" && typeOfLink !== "artist") || !isNew || token === null,
        }
    );

    useEffect(() => {
        if (isNew) {
            if (data) {
                dispatch(addToHistoryPlaylist(data));
                addToCurentIndex();
            }
        } else {
            const foundItem = allPlaylists.find((v) => v.id === idOfLink);
            if (foundItem) {
                dispatch(addToHistoryPlaylist(foundItem));
                addToCurentIndex();
            }
        }
    }, [url, isNew, data]);

    return () => {};
}
