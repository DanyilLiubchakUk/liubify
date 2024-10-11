import { FillTextByFontSize } from "../../FiillTextTitle";
import { IAllPlaylists, IOtherUser } from "../../../../models/api";
import { UseCapitalLetter } from "../../../../hooks/UseCapitalLetter";

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
                    backgroundImage: `url(${
                        url ||
                        "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                    })`,
                }}
            ></div>
            <div className=" col-span-9 flex flex-col justify-end">
                <span className="text-xs font-bold">
                    {UseCapitalLetter(curentPlaylist.type)}
                </span>
                <FillTextByFontSize
                    text={text}
                    effectByArr={[secondTabSize, text]}
                />
                <span className="line-clamp-2 text-sm text text-stone-300">
                    {curentPlaylist.description}
                </span>
                <div className="flex flex-wrap gap-x-6 items-center text-stone-300">
                    <div className="flex gap-1">
                        {data?.images[0]?.url ? (
                            <span className="rounded-full overflow-hidden flex justify-center items-center w-6 h-6">
                                <img
                                    src={
                                        data?.images?.[0]?.url ||
                                        "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                                    }
                                    alt="spotify"
                                    className="scale-[1.01]"
                                />
                            </span>
                        ) : null}
                        <span className="text-white text-md font-bold">
                            {data?.display_name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
