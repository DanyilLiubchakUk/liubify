import { FillTextByFontSize } from "../../FiillTextTitle";
import { IAllPlaylists } from "../../../../models/api";

interface ArtistCoverProp {
    url: string;
    text: string;
    curentPlaylist: IAllPlaylists;
    secondTabSize: number | null;
}

export function ArtistCover({
    url,
    text,
    curentPlaylist,
    secondTabSize,
}: ArtistCoverProp) {
    return (
        <div className="grid grid-cols-12 gap-4">
            <div
                className="self-end aspect-square bg-center bg-cover rounded-full col-span-2 shadow-[0px_4px_60px_rgba(0,0,0,.5)]"
                style={{
                    backgroundImage: `url(${
                        url ||
                        "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                    })`,
                }}
            ></div>
            <div className=" col-span-10 flex flex-col justify-end">
                <FillTextByFontSize
                    text={text}
                    effectByArr={[secondTabSize, text]}
                />
                <span className="line-clamp-2 text-sm text text-stone-300">
                    {curentPlaylist.description}
                </span>
            </div>
        </div>
    );
}
