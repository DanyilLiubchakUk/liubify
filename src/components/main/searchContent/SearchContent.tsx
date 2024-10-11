import { useState, useCallback } from "react";
import { SearchBar } from "./SearchBar";
import { userAPI } from "../../../api/userAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { A11yFocus } from "../../focus/A11yFocus";
import { SearchBlock } from "./SearchBlock";
import { ISearch } from "../../../models/api";
import { UseCapitalLetter } from "../../../hooks/UseCapitalLetter";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "just-debounce-it";

export function SearchContent() {
    const alltypes = ["All", "Playlist", "Artist", "Album"];

    const location = useLocation().pathname.split("/");
    const startNum = window.location.pathname.startsWith("/liubify") ? 1 : 0;

    const requestLink =
        location.length > startNum + 2
            ? location[startNum + 2].replace(/%20/g, " ")
            : "";
    const typeFilterLink =
        location.length > startNum + 3
            ? location[startNum + 3].length > 0
                ? [UseCapitalLetter(location[startNum + 3])]
                : alltypes.slice(1)
            : alltypes.slice(1);

    const [searchString, setSearchString] = useState(requestLink);
    const [debouncedSearchString, setDebouncedSearchString] =
        useState(searchString);
    const [types, setTypes] = useState<string[]>(typeFilterLink);

    const token = useSelector((state: RootState) => state.token.value);

    const { data: searchData } = userAPI.useFetchSearchQuery(
        { token, query: debouncedSearchString, types },
        {
            skip: token === null || debouncedSearchString.length === 0,
        }
    );

    const navigate = useNavigate();

    const suggestions = ["C"]; // use this array to show suggestions under search input

    const updateSearchString = useCallback(
        debounce((value: string) => {
            setDebouncedSearchString(value);
            let request = value;
            let filterTypes =
                types.length === 1 ? types[0].toLocaleLowerCase() : "";

            if (request.length > 0) {
                request = "/" + request;
            } else {
                request = "";
            }
            if (filterTypes.length > 0) {
                filterTypes = "/" + filterTypes;
            } else {
                filterTypes = "";
            }
            navigate(
                `${
                    window.location.pathname.startsWith("/liubify")
                        ? "/liubify"
                        : ""
                }/search${request}${filterTypes}`
            );
        }, 400),
        []
    );

    const onValueChanged = (value: string) => {
        setSearchString(value);
        updateSearchString(value);
    };
    return (
        <div className="relative z-40 p-6 pb-8">
            <A11yFocus className="mb-4">
                <ul className="flex gap-2 items-center justify-center flex-wrap grow-[200]">
                    {alltypes.map((type) => (
                        <li key={type}>
                            <button
                                className={`px-2 py-0.5 rounded-xl text-md font-bold hover:bg-stone-300 hover:text-black focus-visible:bg-stone-700 transition-colors${
                                    types.length > 1
                                        ? type === alltypes[0]
                                            ? " bg-white text-black"
                                            : " bg-stone-800 text-stone-100"
                                        : type === types[0]
                                        ? " bg-white text-black"
                                        : " bg-stone-800 text-stone-100"
                                } transition-colors duration-200`}
                                onClick={() => {
                                    setTypes(
                                        type === alltypes[0]
                                            ? alltypes.slice(1)
                                            : [type]
                                    );
                                    let request = searchString;
                                    let filterTypes =
                                        type === alltypes[0]
                                            ? ""
                                            : type.toLocaleLowerCase();

                                    if (request.length > 0) {
                                        request = "/" + request;
                                    } else {
                                        request = "";
                                    }
                                    if (filterTypes.length > 0) {
                                        filterTypes = "/" + filterTypes;
                                    } else {
                                        filterTypes = "";
                                    }
                                    navigate(
                                        `${
                                            window.location.pathname.startsWith(
                                                "/liubify"
                                            )
                                                ? "/liubify"
                                                : ""
                                        }/search${request}${filterTypes}`
                                    );
                                }}
                            >
                                {type}
                            </button>
                        </li>
                    ))}
                </ul>
            </A11yFocus>
            <SearchBar
                suggestions={suggestions}
                onValueChanged={onValueChanged}
                value={searchString}
            />
            {searchData
                ? types.map((searchItem, i) => (
                      <SearchBlock
                          title={`${UseCapitalLetter(types[i])}s`}
                          hNum={i === 0 ? 1 : 2}
                          className="text-2xl mt-8 text-white font-bold hover:underline inline-block cursor-pointer"
                          arrToShow={searchData[
                              (searchItem.toLowerCase() + "s") as keyof ISearch
                          ]?.items.slice(0, 8)}
                          key={searchItem}
                      />
                  ))
                : null}
        </div>
    );
}
