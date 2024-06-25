import { useDispatch, useSelector } from "react-redux";
import { Itoken } from "../models/api";
import { addToHistoryPlaylist } from "../store/playlistsHistory/playlistsHistorySlice";
import { useLocation, useNavigate } from "react-router-dom";
import { UseAddToCurentIndex } from "./UseAddToCurentIndex";
import { RootState } from "../store/store";
import { userAPI } from "../api/userAPI";

export function UseTurnPlaylistByUrl() {
    const dispatch = useDispatch();
    const location = useLocation();
    const addToCurentIndex = UseAddToCurentIndex();
    const url: string = location.pathname;
    // const url: string = useSelector((state: RootState) => state.leftTab.url);
    const token: Itoken = useSelector((state: RootState) => state.token.value);

    const idOfLink = url.split("/")[2];
    const typeOfLink = url.split("/")[1];

    const { data, isLoading, isError } = userAPI.useFetchFolderByIDQuery(
        {
            token,
            type: typeOfLink,
            id: idOfLink,
        },
        { skip: typeOfLink !== "playlist" && typeOfLink !== "artist" }
    );
    console.log(data);
    if (data) {
        dispatch(addToHistoryPlaylist(data));
        addToCurentIndex();
    }
    return () => {};
}
