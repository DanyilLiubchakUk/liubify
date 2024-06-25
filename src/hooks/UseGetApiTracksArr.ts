import { useEffect, useState } from "react";
import { Item, Itoken } from "../models/api";

interface UseGetApiTrucksArrProps {
    funcApi: any;
    limit?: undefined | number;
    token: Itoken;
    type: string;
    id: string;
}

export function UseGetApiTracksArr({
    funcApi,
    limit = undefined,
    token,
    type,
    id,
}: UseGetApiTrucksArrProps) {
    const [countOfOffsets, setCountOfOffsets] = useState(0);
    const [arrRequest, setArrRequest] = useState<Item[]>([]);
    const [skip, setSkip] = useState(true);
    const {
        data,
        isError,
        isLoading,
    }: { data: any; isLoading: boolean; isError: boolean } = funcApi(
        { token, countOfOffsets, type, id },
        { skip }
    );
    useEffect(() => {
        if (data) {
            let countOfRequestsMath = 0;
            if (data.tracks.next !== null) {
                countOfRequestsMath = Number(
                    data.tracks.next
                        .split("/")[6]
                        .split("?")[1]
                        .split("&")[0]
                        .split("=")[1]
                );
                if (!limit || (limit && limit > countOfRequestsMath)) {
                    setCountOfOffsets(countOfRequestsMath);
                }
            }
            if (limit && countOfRequestsMath >= limit) {
                setArrRequest((state) =>
                    [...state, ...data.tracks.items].slice(0, limit)
                );
            } else {
                if (data.tracks.next || data.tracks.previous) {
                    setArrRequest((state) => [...state, ...data.tracks.items]);
                    window.history.replaceState(
                        "",
                        document.title,
                        window.location.href.replace(/#.*$/, "")
                    );
                }
                if (
                    data.tracks.next === null &&
                    data.tracks.previous === null
                ) {
                    setArrRequest((state) => [...state, ...data.tracks.items]);
                    window.history.replaceState(
                        "",
                        document.title,
                        window.location.href.replace(/#.*$/, "")
                    );
                }
            }
        }
    }, [data]);

    useEffect(() => {
        if (token !== null) {
            setSkip(false);
        } else {
            setSkip(true);
        }
    }, [token]);

    return arrRequest.splice(
        arrRequest.length - data?.total - 1,
        arrRequest.length
    );
}
