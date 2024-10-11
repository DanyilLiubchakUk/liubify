import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useRef, useState } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import {
    setHightOfMainCover,
    setSecondTabScroll,
} from "../store/mainTab/mainTabSlice";
import { UserDataLogIn } from "../components/main/topCover/UserDataLogIn";
import { IAllPlaylists } from "../models/api";
import { prominent } from "color.js";
import { MainBackground } from "../components/main/topCover/MainBackground";
import { SearchContent } from "../components/main/searchContent/SearchContent";

interface SearchProps {}
export function Search({}: SearchProps) {
    const dispatch = useDispatch();

    const ref = useRef<any>(null);

    const [colorOfDataLog, setColorOfDataLog] = useState("#222");

    const playlistHistory: IAllPlaylists[] = useSelector(
        (state: RootState) => state.playlistHistory.allPlaylists
    );
    const curentIndex: number = useSelector(
        (state: RootState) => state.playlistHistory.curentIndex
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
                    scroll: () => {
                        dispatch(
                            setSecondTabScroll(
                                ref.current.getElement().firstChild.nextSibling
                                    .scrollTop
                            )
                        );
                        dispatch(
                            setHightOfMainCover(
                                ref.current.getElement().firstChild.nextSibling
                                    .firstChild.nextSibling.offsetHeight
                            )
                        );
                    },
                }}
                defer
                options={{
                    scrollbars: { theme: "os-theme-light", autoHide: "move" },
                }}
                className="overflow-auto h-full w-full [&_.os-scrollbar-handle]:!w-3 [&_.os-scrollbar-handle]:!rounded-[2px] [&_.os-scrollbar-handle]:!opacity-60 [&_.os-scrollbar-handle]:!transition-[opacity] [&_.os-scrollbar-handle]:!duration-[400] [&_.os-scrollbar-handle]:!bg-[#fff4] [&_.os-scrollbar-handle:hover]:!opacity-100"
                ref={ref}
            >
                <UserDataLogIn colorOfDataLog={colorOfDataLog} />
                <div
                    className={`w-full pt-[40px] p-6 brightness-100 relative top-[-64px] mb-[-64px] z-30`}
                    style={{
                        backgroundImage: `linear-gradient(to bottom, ${colorOfDataLog} 0%, #0009 100%)`,
                        backgroundColor: colorOfDataLog,
                    }}
                >
                    <MainBackground colorOfDataLog={colorOfDataLog} />
                </div>
                <SearchContent />
            </OverlayScrollbarsComponent>
        </main>
    );
}
