import { useDispatch, useSelector } from "react-redux";
import { UserDataLogIn } from "./topCover/UserDataLogIn";
import "simplebar-react/dist/simplebar.min.css";
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { CoverMain } from "./topCover/CoverMain";
import { useEffect, useRef, useState } from "react";
import { setSecondTabScroll } from "../../store/mainTab/mainTabSlice";
import { MainContent } from "./content/MainContent";
import { prominent } from "color.js";
import { IAllPlaylists, Itoken, Tfolder } from "../../models/api";
import { RootState } from "../../store/store";

export function MainPanel({}: {}) {
    const dispatch = useDispatch();
    const ref = useRef<any>(null);
    const [colorOfDataLog, setColorOfDataLog] = useState("#222");
    // const { playlistId } = useParams() as { playlistId: string };
    // const { artistId } = useParams() as { artistId: string };
    const [skip, setSkip] = useState(true);
    const [curentFolder, setCurentFolder] = useState<Tfolder>("");
    const [curentId, setCurentId] = useState("");

    const token: Itoken = useSelector((state: RootState) => state.token.value);
    const playlistHistory: IAllPlaylists[] = useSelector(
        (state: RootState) => state.playlistHistory.allPlaylists
    );
    const curentIndex: number = useSelector(
        (state: RootState) => state.playlistHistory.curentIndex
    );
    const curentPlaylist: IAllPlaylists = useSelector(
        (state: RootState) => state.playlistHistory.curentPlaylist
    );

    let imageDefault =
        "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";

    const url = playlistHistory[curentIndex]?.images?.[0]?.url || imageDefault;

    useEffect(() => {
        prominent(url, { group: 30, amount: 4 }).then((color: any) => {
            let averageColorArr: number[] = color.reduce(
                (acc: number[], v: number[], i: number) => {
                    return acc.map((vAcc, vI) => {
                        return vAcc + v[vI] / 2;
                    });
                },
                [0, 0, 0]
            );

            let averageColor = "rgb(" + averageColorArr.join(" ,") + ")";

            setColorOfDataLog(averageColor);
        });
    }, [url]);

    return (
        <main className="bg-neutral-900 h-[calc(100%)] rounded-md overflow-hidden">
            <OverlayScrollbarsComponent
                events={{
                    scroll: () =>
                        dispatch(
                            setSecondTabScroll(
                                (ref.current.getElement().firstChild.nextSibling
                                    .scrollTop -
                                    120) /
                                    100
                            )
                        ),
                }}
                defer
                options={{
                    scrollbars: { theme: "os-theme-light", autoHide: "move" },
                }}
                className="overflow-auto h-full w-full [&_.os-scrollbar-handle]:!w-3 [&_.os-scrollbar-handle]:!rounded-[2px] [&_.os-scrollbar-handle]:!opacity-60 [&_.os-scrollbar-handle]:!transition-[opacity] [&_.os-scrollbar-handle]:!duration-[400] [&_.os-scrollbar-handle]:!bg-[#fff4] [&_.os-scrollbar-handle:hover]:!opacity-100"
                ref={ref}
            >
                <UserDataLogIn colorOfDataLog={colorOfDataLog} />
                <CoverMain colorOfDataLog={colorOfDataLog} url={url || ""} />
                <MainContent />
            </OverlayScrollbarsComponent>
        </main>
    );
}
