import { useDispatch, useSelector } from "react-redux";
import { IAllPlaylists } from "../models/api";
import {
    addCurentIndex,
    addToHistoryPlaylist,
} from "../store/playlistsHistory/playlistsHistorySlice";
import { useNavigate } from "react-router-dom";
import { UseAddToCurentIndex } from "./UseAddToCurentIndex";
import { RootState } from "../store/store";

type Iclicked = {
    clickedArr: IAllPlaylists;
};

export function UseNewClickedPlaylist({ clickedArr }: Iclicked) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addToCurentIndex = UseAddToCurentIndex();
    const curentPlaylist: IAllPlaylists = useSelector(
        (state: RootState) => state.playlistHistory.curentPlaylist
    );

    return () => {
        if (clickedArr != curentPlaylist) {
            // navigate(`/${clickedArr.type}/${clickedArr.id}/`);
            dispatch(addToHistoryPlaylist(clickedArr));
            addToCurentIndex();
        }
    };
}
