import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React, { useState, useRef, useEffect } from "react";
import { useClickAway } from "react-use";

interface SearchBarProps {
    suggestions: string[];
    onValueChanged: (value: string) => void;
    value: string;
}

export function SearchBar({
    suggestions: passedSuggestions,
    onValueChanged,
    value: passedValue,
}: SearchBarProps) {
    const [value, setValue] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

    useClickAway(containerRef, () => {
        setSuggestions([]);
    });

    const escapeRegexCharacters = (str: string) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    const getSuggestions = (value: string): string[] => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === "") {
            return [];
        }

        const regex = new RegExp("^" + escapedValue, "i");
        return passedSuggestions.filter((language) => regex.test(language));
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        onValueChanged(newValue);
        setSuggestions(getSuggestions(newValue));
        setHighlightedIndex(-1);
    };

    const onFocus = () => {
        if (value.trim() !== "") {
            setSuggestions(getSuggestions(value));
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            const nextIndex = Math.min(
                highlightedIndex + 1,
                suggestions.length - 1
            );
            setHighlightedIndex(nextIndex);
            if (nextIndex >= 0) {
                setValue(suggestions[nextIndex]);
                onValueChanged(suggestions[nextIndex]);
            }
        } else if (event.key === "ArrowUp") {
            const prevIndex = Math.max(highlightedIndex - 1, 0);
            setHighlightedIndex(prevIndex);
            if (prevIndex >= 0) {
                setValue(suggestions[prevIndex]);
                onValueChanged(suggestions[prevIndex]);
            }
        } else if (event.key === "Enter") {
            if (highlightedIndex >= 0 && suggestions.length > 0) {
                setValue(suggestions[highlightedIndex]);
                onValueChanged(suggestions[highlightedIndex]);
            }
            setSuggestions([]);
        }
    };
    useEffect(() => {
        if (highlightedIndex >= 0 && suggestionRefs.current[highlightedIndex]) {
            suggestionRefs.current[highlightedIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [highlightedIndex]);

    return (
        <div
            ref={containerRef}
            className="relative max-w-[680px] mx-auto min-w-80 w-2/3"
        >
            <input
                ref={inputRef}
                type="text"
                value={passedValue}
                onChange={onChange}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                placeholder="What do you want to play?"
                className={`py-3 pl-3 pr-12 rounded-t-3xl w-full placeholder-neutral-900 bg-white text-black font-normal focus-visible:outline-neutral-700 ${
                    suggestions.length > 0 ? "" : "rounded-b-3xl"
                } transition-[border-radius] duration-200`}
            />
            {suggestions.length > 0 && (
                <OverlayScrollbarsComponent
                    defer
                    options={{
                        scrollbars: {
                            theme: "os-theme-light",
                            autoHide: "move",
                        },
                    }}
                    className="!absolute w-full max-h-[183.4px] overflow-y-auto bg-neutral-800 border border-neutral-700 rounded-b-3xl mt-1 py-3 px-1 [&_.os-scrollbar-handle]:!w-3 [&_.os-scrollbar-handle]:!rounded-[2px] [&_.os-scrollbar-handle]:!opacity-60 [&_.os-scrollbar-handle]:!transition-[opacity] [&_.os-scrollbar-handle]:!duration-[400] [&_.os-scrollbar-handle]:!bg-[#fff4] [&_.os-scrollbar-handle:hover]:!opacity-100"
                >
                    <ul>
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={suggestion}
                                ref={(el) =>
                                    (suggestionRefs.current[index] = el)
                                }
                                onClick={() => {
                                    setValue(suggestion);
                                    onValueChanged(suggestion);
                                    setSuggestions([]);
                                }}
                                className={`p-2 cursor-pointer rounded w-full text-start scroll-my-3 ${
                                    highlightedIndex === index
                                        ? "bg-neutral-700"
                                        : "hover:bg-neutral-700"
                                }`}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </OverlayScrollbarsComponent>
            )}
        </div>
    );
}
