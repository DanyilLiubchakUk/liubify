import { useEffect, useState } from "react";
import { Icon } from "../../icons/Icon";
import { userAPI } from "../../../api/userAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Itoken } from "../../../models/api";
import { UserDataBackground } from "./UserDataBackground";
import { PlayButton } from "../../PlayButton";
import { UseAddToCurentIndex } from "../../../hooks/UseAddToCurentIndex";
import { UseSubtractOfCurentIndex } from "../../../hooks/UseSubtractOfCurentIndex";
import { animate, useAnimate } from "framer-motion";
import { ClickAnimaiton } from "../../icons/ClickAnimaiton";

type AnimaitonSequence = Parameters<typeof animate>[0];

interface UserDataLogInProps {
    colorOfDataLog: string;
}

export function UserDataLogIn({ colorOfDataLog }: UserDataLogInProps) {
    const [skip, setSkip] = useState(true);
    const token: Itoken = useSelector((state: RootState) => state.token.value);
    const indexOfSecondScroll = useSelector(
        (state: RootState) => state.mainTab.indexOfSecondScroll
    );
    const allPlaylistsHistory = useSelector(
        (state: RootState) => state.playlistHistory.allPlaylists
    );
    const curentIndexHistory = useSelector(
        (state: RootState) => state.playlistHistory.curentIndex
    );
    const { data, isLoading, isError } = userAPI.useFetchCurentUserQuery(
        token,
        { skip }
    );
    const addToCurentIndex = UseAddToCurentIndex();
    const subtractOfCurentIndex = UseSubtractOfCurentIndex();
    useEffect(() => {
        if (token !== null) {
            setSkip(false);
        } else {
            setSkip(true);
        }
    }, [token]);

    const [scopeLeft, animateLeft] = useAnimate();
    const [scopeRight, animateRight] = useAnimate();

    const clickHandlerLeft = async () => {
        const buttonClick: AnimaitonSequence = [
            ["div", { scale: 0.94 }, { duration: 0.1 }],
            ["div", { opacity: 0.6 }, { duration: 0.1, at: "<" }],
            ["div", { opacity: 1 }, { duration: 0.1 }],
            ["div", { scale: 1 }, { duration: 0.1 }],
        ];
        await animateLeft([...buttonClick]);
    };

    const clickHandlerRight = async () => {
        const buttonClick: AnimaitonSequence = [
            ["div", { scale: 0.94 }, { duration: 0.1 }],
            ["div", { opacity: 0.6 }, { duration: 0.1, at: "<" }],
            ["div", { opacity: 1 }, { duration: 0.1 }],
            ["div", { scale: 1 }, { duration: 0.1 }],
        ];
        await animateRight([...buttonClick]);
    };

    return (
        <div className="sticky top-0 px-6 py-2 flex justify-between gap-4 items-center z-[800]">
            <UserDataBackground colorOfDataLog={colorOfDataLog} />
            <div className="played flex items-center gap-2 grow h-12">
                <div
                    ref={scopeLeft}
                    className={` ${
                        curentIndexHistory === 0 ? "opacity-50" : ""
                    } transition-opacity duration-500`}
                >
                    <div
                        onClick={() => {
                            subtractOfCurentIndex();
                            clickHandlerLeft();
                        }}
                        className={`rounded-full bg-neutral-950 h-8 w-8 fill-slate-50 flex items-center justify-center`}
                    >
                        <Icon d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" />
                    </div>
                </div>
                <div
                    ref={scopeRight}
                    className={` ${
                        allPlaylistsHistory.length - 1 === curentIndexHistory
                            ? "opacity-50"
                            : ""
                    } transition-opacity duration-500`}
                >
                    <div
                        onClick={() => {
                            addToCurentIndex();
                            clickHandlerRight();
                        }}
                        className={`rounded-full bg-neutral-950 h-8 w-8 fill-slate-50 flex items-center justify-center`}
                    >
                        <Icon d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z" />
                    </div>
                </div>
                <div
                    className={`flex items-center gap-2 grow opacity-0 transition-opacity duration-700 pointer-events-none${
                        indexOfSecondScroll >= 1.2
                            ? " opacity-100 pointer-events-auto"
                            : ""
                    }`}
                >
                    <PlayButton enableFocus={indexOfSecondScroll >= 1.2} />
                    <div className="relative grow">
                        <span className="font-bold text-2xl text-ellipsis overflow-hidden whitespace-nowrap left-0 right-0 top-0 translate-y-[-50%] absolute">
                            Beauty song
                        </span>
                    </div>
                </div>
            </div>
            <div className="userData font-bold text-sm flex gap-2 fill-white">
                <ClickAnimaiton>
                    <div className="rounded-full bg-neutral-950 h-8 w-8 hover:scale-[1.04] flex items-center justify-center">
                        <Icon d="M8 1.5a4 4 0 0 0-4 4v3.27a.75.75 0 0 1-.1.373L2.255 12h11.49L12.1 9.142a.75.75 0 0 1-.1-.374V5.5a4 4 0 0 0-4-4zm-5.5 4a5.5 5.5 0 0 1 11 0v3.067l2.193 3.809a.75.75 0 0 1-.65 1.124H10.5a2.5 2.5 0 0 1-5 0H.957a.75.75 0 0 1-.65-1.124L2.5 8.569V5.5zm4.5 8a1 1 0 1 0 2 0H7z" />
                    </div>
                </ClickAnimaiton>
                <ClickAnimaiton>
                    <div className="rounded-full bg-neutral-950 p-1 hover:scale-[1.04] flex items-center justify-center">
                        <div
                            className="w-6 h-6 rounded-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${data?.images[0].url})`,
                            }}
                        ></div>
                    </div>
                </ClickAnimaiton>
            </div>
        </div>
    );
}
