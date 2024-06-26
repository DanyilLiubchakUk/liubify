import { useEffect, useState } from "react";
import { Item, Itoken, Tracks } from "../models/api";

interface UseGetApiTrucksArrProps {
    funcApi: any;
    token: Itoken;
    type: string;
    id: string;
    skip?: boolean;
}

export function UseGetApiTracksArr({
    funcApi,
    token,
    type,
    id,
    skip,
}: UseGetApiTrucksArrProps) {
    const [countOfOffsets, setCountOfOffsets] = useState(0);
    const [arrRequest, setArrRequest] = useState<Item[]>([]);

    const { data }: { data: Tracks } = funcApi(
        {
            token,
            countOfOffsets,
            type,
            id,
        },
        { skip }
    );

    useEffect(() => {
        setCountOfOffsets(0);
        setArrRequest([]);
    }, [id]);
    useEffect(() => {
        if (data) {
            setArrRequest((state) => [...state, ...data.items]);

            if (data.items.length !== data.total) {
                setCountOfOffsets(
                    data.items.length + arrRequest.length < data.total
                        ? data.items.length + arrRequest.length
                        : arrRequest.length
                );
            }
        }
    }, [data]);

    if (data) {
        return arrRequest;
    } else return [];
}
