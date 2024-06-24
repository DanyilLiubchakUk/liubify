import { useDispatch } from "react-redux";
import { addCurentIndex } from "../store/playlistsHistory/playlistsHistorySlice";

export function UseAddToCurentIndex() {
    const dispatch = useDispatch();

    return () => {
        dispatch(addCurentIndex());
    };
}
