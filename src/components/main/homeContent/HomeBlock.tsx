import React, { useEffect, useState } from "react";
import { A11yFocus } from "../../focus/A11yFocus";
import { Link } from "react-router-dom";
import { UseCapitalLetter } from "../../../hooks/UseCapitalLetter";
import { useResizeDetector } from "react-resize-detector";

interface HomeBlockPros {
    className?: string;
    title: string;
    arrToShow: any[];
    hNum?: 1 | 2 | 3 | 4 | 5;
}

export function HomeBlock({
    hNum = 2,
    className = "",
    title,
    arrToShow,
}: HomeBlockPros) {
    const [columnCount, setColumnCount] = useState(4);
    const { ref, width } = useResizeDetector();

    useEffect(() => {
        if (width) {
            if (width < 350) {
                setColumnCount(1);
            } else if (width < 530) {
                setColumnCount(2);
            } else if (width < 700) {
                setColumnCount(3);
            } else {
                setColumnCount(4);
            }
        }
    }, [width]);
    return (
        <div className="flex flex-col gap-2" ref={ref}>
            <div>{React.createElement(`h${hNum}`, { className }, title)}</div>
            <A11yFocus>
                <ul
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns:
                            "repeat(" + columnCount + ", minmax(0, 1fr))",
                    }}
                >
                    {arrToShow.map((card) => (
                        <li key={card.played_at}>
                            <Link
                                to={`${
                                    window.location.pathname.startsWith(
                                        "/liubify"
                                    )
                                        ? "/liubify"
                                        : ""
                                }/${card.track?.album?.uri?.split(":")[1]}/${
                                    card.track?.album?.uri?.split(":")[2]
                                }`}
                                className="block h-full p-4 pb-8 rounded-md cursor-pointer bg-gradient-to-b from-transparent to-neutral-800 hover:bg-neutral-800 focus-visible:bg-neutral-800 transition-colors duration-200"
                            >
                                <img
                                    src={
                                        card.track.album?.images?.[0]?.url ||
                                        "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                                    }
                                    alt={card.track.name}
                                    className={`object-cover ${
                                        card.context?.type === "artists"
                                            ? "rounded-full"
                                            : card.context === null
                                            ? "rounded-full"
                                            : ""
                                    }`}
                                />
                                {card.context?.type === "playlist" ||
                                card.context?.type === "album"
                                    ? React.createElement(
                                          `h${hNum + 1}`,
                                          {
                                              className:
                                                  "font-bold truncate line-clamp-2",
                                          },
                                          card.track.album?.name
                                      )
                                    : null}

                                {card.context?.type === "artists" ||
                                card.context === null
                                    ? React.createElement(
                                          `h${hNum + 1}`,
                                          {
                                              className:
                                                  "font-bold line-clamp-2",
                                          },
                                          card.track.artists?.[0]?.name
                                      )
                                    : null}
                                <p className="text-stone-400">
                                    {UseCapitalLetter(
                                        card.context !== null
                                            ? card.context?.type
                                            : "artist"
                                    )}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </A11yFocus>
        </div>
    );
}
