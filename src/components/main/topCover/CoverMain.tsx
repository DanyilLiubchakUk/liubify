import { MainBackground } from "./MainBackground";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FillTextByFontSize } from "../FiillTextTitle";
import { IAllPlaylists, Itoken } from "../../../models/api";
import { userAPI } from "../../../api/userAPI";
import { PlaylistCover } from "../typePlaylist/playlist/PlaylistCover";
import { ArtistCover } from "../typePlaylist/artist/ArtistCover";

interface CoverMainProps {
    colorOfDataLog: string;
    url: string;
}

export function CoverMain({ colorOfDataLog, url }: CoverMainProps) {
    const token: Itoken = useSelector((state: RootState) => state.token.value);

    const curentPlaylist: IAllPlaylists = useSelector(
        (state: RootState) => state.playlistHistory.curentPlaylist
    );
    const secondTabSize = useSelector(
        (state: RootState) => state.tabs.secondTabSize
    );
    const { data, isLoading, isError } = userAPI.useFetchUserByIDQuery(
        {
            token,
            id: curentPlaylist.owner?.id || "",
        },
        { skip: curentPlaylist.type !== "playlist" }
    );

    const text = curentPlaylist.name;

    return (
        <div
            className={`w-full pt-[64px] p-6 brightness-100 relative top-[-64px] mb-[-64px] z-30`}
            style={{
                backgroundImage: `linear-gradient(to bottom, ${colorOfDataLog} 0%, #0009 100%)`,
                backgroundColor: colorOfDataLog,
            }}
        >
            <MainBackground colorOfDataLog={colorOfDataLog} />
            {curentPlaylist.type === "playlist" ? (
                <PlaylistCover
                    url={url}
                    text={text}
                    curentPlaylist={curentPlaylist}
                    data={data}
                    secondTabSize={secondTabSize}
                />
            ) : curentPlaylist.type === "artist" ? (
                <ArtistCover
                    url={url}
                    text={text}
                    curentPlaylist={curentPlaylist}
                    secondTabSize={secondTabSize}
                />
            ) : null}
        </div>
    );
}
