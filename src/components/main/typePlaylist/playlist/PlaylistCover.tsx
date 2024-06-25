import { useEffect } from "react";
import { FillTextByFontSize } from "../../FiillTextTitle";
import { IAllPlaylists, IOtherUser } from "../../../../models/api";

interface playlistCoverProp {
    url: string;
    text: string;
    curentPlaylist: IAllPlaylists;
    data: IOtherUser | undefined;
    secondTabSize: number | null;
}

export function PlaylistCover({
    url,
    text,
    curentPlaylist,
    data,
    secondTabSize,
}: playlistCoverProp) {
    return (
        <div className="grid grid-cols-12 gap-4">
            <div
                className="self-end aspect-square bg-center bg-cover rounded-lg col-span-3 shadow-[0px_4px_60px_rgba(0,0,0,.5)]"
                style={{
                    backgroundImage: `url(${url})`,
                }}
            ></div>
            <div className=" col-span-9 flex flex-col justify-end">
                <span className="text-xs font-bold">Playlist</span>
                <FillTextByFontSize
                    text={text}
                    effectByArr={[secondTabSize, text]}
                />
                <span className="line-clamp-2 text-sm text text-stone-300">
                    {curentPlaylist.description}
                </span>
                <div className="flex flex-wrap gap-x-6 items-center text-stone-300">
                    <div className="flex gap-1">
                        <span className="rounded-full overflow-hidden flex justify-center items-center w-6 h-6">
                            <img
                                src={data?.images[0].url}
                                alt="spotify"
                                className="scale-[1.01]"
                            />
                        </span>
                        <span className="text-white text-md font-bold">
                            {data?.display_name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
