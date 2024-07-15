import { useDispatch, useSelector } from "react-redux";
import { addCurentIndex } from "../store/playlistsHistory/playlistsHistorySlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

export function UseAddToCurentIndex() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allPlaylists = useSelector(
        (state: RootState) => state.playlistHistory.allPlaylists
    );
    const curentIndex = useSelector(
        (state: RootState) => state.playlistHistory.curentIndex
    );

    return () => {
        if (curentIndex < allPlaylists.length - 1) {
            navigate(
                `/${allPlaylists[curentIndex + 1].type}/${
                    allPlaylists[curentIndex + 1].id
                }`
            );
        }
        dispatch(addCurentIndex());
    };
}
