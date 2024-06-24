import { useDispatch, useSelector } from "react-redux";
import { userAPI } from "../../api/userAPI";
import { PlaylistsBlock } from "./PlaylistsBlock";
import { PlaylistsNavBar } from "./PlaylistsNavBar";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import {
    setArtists,
    setPlaylists,
} from "../../store/usersArtists/usersArtistsSlice";
import { UseGetApiArr } from "../../hooks/UseGetApiArr";
import { Itoken } from "../../models/api";

export function PlaylistsWindow({}: {}) {
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(true);
    const token: Itoken = useSelector((state: RootState) => state.token.value);
    
    const {
        arr: artistsArr,
        isLoading: artistsIsLoading,
        isError: artistsIsError,
    } = UseGetApiArr({
        funcApi: userAPI.useFetchCurentUserTopArtistsQuery,
        token: token,
        limit: 20,
    });

    const {
        arr: playlistsArr,
        isLoading: playlistsIsLoading,
        isError: playlistsIsError,
    } = UseGetApiArr({
        funcApi: userAPI.useFetchCurentUsersPlayliststQuery,
        token: token,
        limit: 24,
    });

    useEffect(() => {
        dispatch(setArtists(artistsArr));
    }, [artistsArr]);
    useEffect(() => {
        dispatch(setPlaylists(playlistsArr));
    }, [playlistsArr]);
    useEffect(() => {
        if (token !== null) {
            setSkip(false);
        } else {
            setSkip(true);
        }
    }, [token]);

    return (
        <div className="bg-neutral-900 rounded-md p-3 pb-0 pr-0 overflow-hidden">
            <PlaylistsNavBar />
            <PlaylistsBlock
                artistsArr={[...playlistsArr, ...artistsArr]}
                isLoading={artistsIsLoading}
                isError={artistsIsError}
            />
        </div>
    );
}
