import { useSelector } from "react-redux";
import { userAPI } from "../../api/userAPI";
import { PlaylistsBlock } from "./PlaylistsBlock";
import { PlaylistsNavBar } from "./PlaylistsNavBar";
import { RootState } from "../../store/store";
import { useEffect } from "react";

export function PlaylistsWindow({}: {}) {
    const token: string | null = useSelector(
        (state: RootState) => state.token.value
    );
    const { data, isError, isLoading } = userAPI.useFetchCurentUserTopArtistsQuery(token); // expect some param for params (_limit)
    useEffect(() => {
        console.log(data);
        
    }, [data])
    return (
        <div className="bg-neutral-900 rounded-md p-3 pb-0 pr-0 overflow-hidden">
            <PlaylistsNavBar />
            <PlaylistsBlock />
        </div>
    );
}
