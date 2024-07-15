import { useDispatch, useSelector } from "react-redux";
import { subtractCurentIndex } from "../store/playlistsHistory/playlistsHistorySlice";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

export function UseSubtractOfCurentIndex() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allPlaylists = useSelector(
        (state: RootState) => state.playlistHistory.allPlaylists
    );
    const curentIndex = useSelector(
        (state: RootState) => state.playlistHistory.curentIndex
    );

    return () => {
        if (curentIndex > 0) {
            navigate(
                `/${allPlaylists[curentIndex - 1].type}/${
                    allPlaylists[curentIndex - 1].id
                }`
            );
        }
        dispatch(subtractCurentIndex());
    };
}
