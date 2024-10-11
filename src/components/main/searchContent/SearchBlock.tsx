import React, { useEffect, useState } from "react";
import { A11yFocus } from "../../focus/A11yFocus";
import { Link } from "react-router-dom";
import { UseCapitalLetter } from "../../../hooks/UseCapitalLetter";
import { useResizeDetector } from "react-resize-detector";
import {
    AlbumObjectSearch,
    ArtistObjectSearch,
    PlaylistObjectSearch,
} from "../../../models/api";

interface SearchBlockPros {
    className?: string;
    title: string;
    arrToShow:
        | ArtistObjectSearch[]
        | AlbumObjectSearch[]
        | PlaylistObjectSearch[]
        | undefined;
    hNum?: 1 | 2 | 3 | 4 | 5;
}

export function SearchBlock({
    hNum = 2,
    className = "",
    title,
    arrToShow,
}: SearchBlockPros) {
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
    if (arrToShow?.length) {
        return (
            <div className="flex flex-col gap-2" ref={ref}>
                <div>
                    {React.createElement(`h${hNum}`, { className }, title)}
                </div>
                <A11yFocus>
                    <ul
                        className="grid gap-4"
                        style={{
                            gridTemplateColumns:
                                "repeat(" + columnCount + ", minmax(0, 1fr))",
                        }}
                    >
                        {arrToShow
                            ? arrToShow.map((card) => (
                                  <li key={card.href}>
                                      <Link
                                          to={`/${card.uri?.split(":")[1]}/${
                                              card.uri?.split(":")[2]
                                          }`}
                                          className="block h-full p-4 pb-8 rounded-md cursor-pointer bg-gradient-to-b from-transparent to-neutral-800 hover:bg-neutral-800 focus-visible:bg-neutral-800 transition-colors duration-200"
                                      >
                                          <img
                                              src={
                                                  card.images?.[0]?.url ||
                                                  "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                                              }
                                              alt={card.name}
                                              className={`object-cover aspect-square ${
                                                  card.type === "artist"
                                                      ? "rounded-full"
                                                      : ""
                                              }`}
                                          />
                                          {React.createElement(
                                              `h${hNum + 1}`,
                                              {
                                                  className:
                                                      "font-bold line-clamp-2",
                                              },
                                              card.name
                                          )}
                                          <p className="text-stone-400">
                                              {UseCapitalLetter(card.type)}
                                          </p>
                                      </Link>
                                  </li>
                              ))
                            : null}
                    </ul>
                </A11yFocus>
            </div>
        );
    }
    return <></>;
}
