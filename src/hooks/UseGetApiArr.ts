import { useEffect, useState } from "react";
import { IItemArtist, IUserTopsArtists, Itoken } from "../models/api";

interface UseGetApiArrProps {
    funcApi: any;
    limit?: undefined | number;
    token: Itoken;
}

export function UseGetApiArr({
    funcApi,
    limit = undefined,
    token,
}: UseGetApiArrProps) {
    const [countOfOffsets, setCountOfOffsets] = useState(0);
    const [arrRequest, setArrRequest] = useState<IItemArtist[]>([]);
    const [skip, setSkip] = useState(true);
    const {
        data,
        isError,
        isLoading,
    }: { data: IUserTopsArtists; isLoading: boolean; isError: boolean } =
        funcApi({ token, countOfOffsets }, { skip });
    useEffect(() => {
        if (data) {
            let countOfRequestsMath = 0;
            if (data.next !== null) {
                countOfRequestsMath = Number(
                    data.next
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
                    [...state, ...data.items].slice(0, limit)
                );
            } else {
                if (data.next || data.previous) {
                    setArrRequest((state) => [...state, ...data.items]);
                    window.history.replaceState(
                        "",
                        document.title,
                        window.location.href.replace(/#.*$/, "")
                    );
                }
                if (data.next === null && data.previous === null) {
                    setArrRequest((state) => [...state, ...data.items]);
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

    return { arr: arrRequest, isLoading, isError };
}
