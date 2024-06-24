import { useDispatch } from "react-redux";
import { subtractCurentIndex } from "../store/playlistsHistory/playlistsHistorySlice";

export function UseSubtractOfCurentIndex() {
    const dispatch = useDispatch();

    return () => {
        dispatch(subtractCurentIndex());
    };
}
