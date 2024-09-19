import { useDispatch, useSelector } from "react-redux";
import { ITrackPlayedData } from "../models/api";
import {
    addToTypeDataSlot,
    changeMainArray,
} from "../store/playlistInspectorLibrary/playlistInspectorLibrarySlice";
import { RootState } from "../store/store";
import { useEffect } from "react";

interface UsePlayInspector {
    data: ITrackPlayedData | ITrackPlayedData[];
    type: "preview" | "playlist" | "queue";
    id: string;
}
export function UsePlayInspector() {
    const dispatch = useDispatch();

    const previewData = useSelector(
        (state: RootState) => state.playlistInspectorLibrary.previewData
    );
    const queueArray = useSelector(
        (state: RootState) => state.playlistInspectorLibrary.queueItemsData
    );
    const playlistArray = useSelector(
        (state: RootState) => state.playlistInspectorLibrary.playlistItemsData
    );

    useEffect(() => {
        dispatch(changeMainArray());
    }, [previewData.data, queueArray.data, playlistArray.data]);

    const addToTypeData = ({ data, type, id }: UsePlayInspector) => {
        dispatch(addToTypeDataSlot({ data, type, id }));
    };

    return {
        addToTypeData: ({
            data,
            type,
            id,
        }: {
            data: ITrackPlayedData | ITrackPlayedData[];
            type: "preview" | "playlist" | "queue";
            id: string;
        }) => addToTypeData({ data, type, id }),
    };
}
