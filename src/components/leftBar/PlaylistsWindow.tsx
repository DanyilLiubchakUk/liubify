import { useDispatch, useSelector } from "react-redux";
import { userAPI } from "../../api/userAPI";
import { PlaylistsBlock } from "./PlaylistsBlock";
import { PlaylistsNavBar } from "./PlaylistsNavBar";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { IItemArtist, Itoken } from "../../models/api";
import { addArtist } from "../../store/usersArtists/usersArtistsSlice";

export function PlaylistsWindow({}: {}) {
    const dispatch = useDispatch();
    const [countOfRequests, setCountOfRequests] = useState(0);
    const token: Itoken = useSelector((state: RootState) => state.token.value);
    const artistsArr: IItemArtist[] = useSelector(
        (state: RootState) => state.artistsSlice.artistsArr
    );
    const { data, isError, isLoading } =
        userAPI.useFetchCurentUserTopArtistsQuery({ token, countOfRequests });

    useEffect(() => {
        if (data) {
            window.history.replaceState(
                "",
                document.title,
                window.location.href.replace(/#.*$/, "")
            );
            let countOfRequestsMath;
            if (data.next || data.previous) {
                dispatch(addArtist(data.items));
            }
            if (data.next !== null) {
                countOfRequestsMath = Number(
                    data.next
                        .split("/")[6]
                        .split("?")[1]
                        .split("&")[0]
                        .split("=")[1]
                );
                setCountOfRequests(countOfRequestsMath);
            }
        }
    }, [data]);
    return (
        <div className="bg-neutral-900 rounded-md p-3 pb-0 pr-0 overflow-hidden">
            <PlaylistsNavBar />
            <PlaylistsBlock artistsArr={artistsArr} isLoading={isLoading} isError={isError} />
        </div>
    );
}
