import { AddPlaylistIcon } from "../../icons/AddPlaylistIcon";
import { Icon } from "../../icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Item } from "../../../models/api";
import { ClickAnimaiton } from "../../icons/ClickAnimaiton";
import { A11yFocus } from "../../focus/A11yFocus";
import { UsePlayInspector } from "../../../hooks/UsePlayInspector";
import { setPlayedPlaylist } from "../../../store/playlistInspectorLibrary/playlistInspectorLibrarySlice";
import { UseRandomId } from "../../../hooks/UseRandomId";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import * as ContextMenu from "@radix-ui/react-context-menu";

import { useRef, useState } from "react";

interface TruckProps {
    index: number;
    track: Item;
}

export function Truck({ index, track }: TruckProps) {
    const secondTabSize =
        window.innerWidth -
        (useSelector((state: RootState) => state.tabs.secondTabSize) || 0);

    const { addToTypeData } = UsePlayInspector();
    const dispatch = useDispatch();
    const id = UseRandomId();
    const contextButtonRef = useRef<any>(null);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

    const timeOfTrack =
        Math.floor((track.track.duration_ms / 1000 / 60) << 0) +
        ":" +
        (Math.floor((track.track.duration_ms / 1000) % 60) <= 9
            ? "0" + Math.floor((track.track.duration_ms / 1000) % 60)
            : Math.floor((track.track.duration_ms / 1000) % 60));

    const contextButtonHandler = (isOpen: boolean) => {
        if (isOpen && contextButtonRef.current) {
            contextButtonRef.current.triggerClick();
        }
    };
    return (
        <ContextMenu.Root
            onOpenChange={(isOpen) => setIsContextMenuOpen(isOpen)}
        >
            <ContextMenu.Trigger>
                <div
                    className={`truckOfPlaylist hover:bg-[#fff1] focus-visible:bg-[#fff1] group a11yFocus scroll-mt-28 [&:has(>div>ul>li_button:focus-visible)]:shadow-[inset_0_0_0_1px_#fff] [&:has(>div>ul>li_button:focus-visible)]:bg-[#fff1] rounded-md ${
                        track.track.preview_url === null
                            ? " opacity-50"
                            : track.track.preview_url === undefined
                            ? " opacity-50"
                            : ""
                    } ${isContextMenuOpen ? "bg-[#fff1]" : ""}`}
                    aria-disabled={
                        track.track.preview_url === null ? true : false
                    }
                >
                    <A11yFocus
                        onlyHorizontal
                        id="select-button"
                        isParentFocusable={false}
                        rememberFocus={false}
                        startFrom={0}
                    >
                        <ul
                            className="grid px-4 gap-4 h-8 items-center rounded-md 
                    [&:has(>li:first-child_button:focus-visible)>li:nth-child(4)>div>div>button]:opacity-100 
                    [&:has(>li:first-child_button:focus-visible)>li:nth-child(4)>span]:opacity-100
                    [&:has(>li:nth-child(4)>span_button:focus-visible)>li:first-child>span]:hidden
                    [&:has(>li:nth-child(4)>span_button:focus-visible)>li:first-child_button>svg]:block
                    [&:has(>li:nth-child(4)>span_button:focus-visible)>li:nth-child(4)>div>div>button]:opacity-100
                    [&:has(>li:nth-child(4)>div>div>button:focus-visible)>li:nth-child(4)>span]:opacity-100
                    [&:has(>li:nth-child(4)>div>div>button:focus-visible)>li:first-child>span]:hidden
                    [&:has(>li:nth-child(4)>div>div>button:focus-visible)>li:first-child_button>svg]:block
                    "
                            style={{
                                gridTemplateColumns: `${
                                    secondTabSize
                                        ? secondTabSize <= 900
                                            ? "16px minmax(120px,4fr) minmax(100px,1fr)"
                                            : "16px minmax(120px,4fr) minmax(120px,2fr) minmax(100px,1fr)"
                                        : ""
                                }`,
                            }}
                        >
                            <li className="[&:has(>div>div>button:focus-visible)>span]:hidden">
                                <span className="group-hover:hidden group-focus-visible:hidden">
                                    {index + 1}
                                </span>
                                <ClickAnimaiton>
                                    <button
                                        className="flex items-center justify-center [&:focus-visible>svg]:block"
                                        disabled={
                                            track.track.preview_url === null
                                                ? true
                                                : false
                                        }
                                        onClick={() => {
                                            if (
                                                track.track &&
                                                track.track.preview_url &&
                                                track.track.name &&
                                                track.track.id
                                            ) {
                                                addToTypeData({
                                                    data: {
                                                        url: track.track
                                                            .preview_url,
                                                        title: track.track.name,
                                                        id: track.track.id,
                                                        img:
                                                            track.track.album
                                                                ?.images?.[0]
                                                                ?.url || "",
                                                        artist:
                                                            track.added_by
                                                                ?.display_name ||
                                                            track.track
                                                                ?.artists?.[0]
                                                                .name ||
                                                            "Unknown Artist",
                                                        albumName:
                                                            track.track.album
                                                                ?.name || "",
                                                    },
                                                    type: "preview",
                                                    id: id,
                                                });
                                                dispatch(setPlayedPlaylist({}));
                                            }
                                        }}
                                    >
                                        <Icon
                                            d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                                            viewBox="24"
                                            className="hidden group-hover:block group-focus-visible:block fill-white"
                                        />
                                    </button>
                                </ClickAnimaiton>
                            </li>
                            <li className="line-clamp-1 text-white">
                                <span className="hover:underline cursor-pointer">
                                    {track.track.name}
                                </span>
                            </li>
                            {secondTabSize ? (
                                secondTabSize > 900 ? (
                                    <li className="line-clamp-1">
                                        <span className="group-hover:text-white group-focus-visible:text-white hover:underline cursor-pointer">
                                            {track.added_by?.display_name ||
                                                track.track?.artists?.[0].name}
                                        </span>
                                    </li>
                                ) : null
                            ) : null}
                            <li className="flex items-center justify-end gap-3">
                                <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 [&:has(:focus-visible)]:opacity-100">
                                    <AddPlaylistIcon />
                                </span>
                                <span className="grow text-end">
                                    {timeOfTrack}
                                </span>
                                <DropdownMenu.Root
                                    onOpenChange={contextButtonHandler}
                                >
                                    <DropdownMenu.Trigger asChild>
                                        <button className=" group-hover:opacity-100 group-focus-visible:opacity-100 focus-visible:opacity-100 mt-1.5">
                                            <ClickAnimaiton
                                                ref={contextButtonRef}
                                            >
                                                <Icon d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            </ClickAnimaiton>
                                        </button>
                                    </DropdownMenu.Trigger>

                                    <DropdownMenu.Portal>
                                        <DropdownMenu.Content
                                            className="min-w-[220px] bg-neutral-800 text-white fill-neutral-200 rounded-md p-0.5 shadow-sm shadow-neutral-600 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                            sideOffset={5}
                                        >
                                            <DropdownMenu.Item className="group text-sm leading-none rounded-sm flex items-center gap-3 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700">
                                                <div className="inline-flex items-center justify-center group-data-[disabled]:text-mauve8">
                                                    <Icon d="M16 15H2v-1.5h14V15zm0-4.5H2V9h14v1.5zm-8.034-6A5.484 5.484 0 0 1 7.187 6H13.5a2.5 2.5 0 0 0 0-5H7.966c.159.474.255.978.278 1.5H13.5a1 1 0 1 1 0 2H7.966zM2 2V0h1.5v2h2v1.5h-2v2H2v-2H0V2h2z" />
                                                </div>
                                                Add to queue
                                            </DropdownMenu.Item>
                                            <DropdownMenu.Sub>
                                                <DropdownMenu.SubTrigger className="group text-sm leading-none rounded-sm  flex items-center gap-3 px-3 py-2 select-none outline-none data-[state=open]:bg-neutral-700 data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700 data-[highlighted]:data-[state=open]:bg-neutral-600">
                                                    <div className="inline-flex items-center justify-center group-data-[disabled]:text-neutral-200">
                                                        <Icon d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" />
                                                    </div>
                                                    Add to your playlist
                                                    <div className="ml-auto inline-flex items-center justify-center group-data-[disabled]:text-neutral-200">
                                                        <ChevronRightIcon />
                                                    </div>
                                                </DropdownMenu.SubTrigger>
                                                <DropdownMenu.Portal>
                                                    <DropdownMenu.SubContent
                                                        className="min-w-[220px] bg-neutral-800 text-white fill-neutral-200 rounded-md p-0.5 shadow-sm shadow-neutral-600 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                                        sideOffset={7.5}
                                                        alignOffset={-5}
                                                    >
                                                        <DropdownMenu.Item
                                                            onSelect={(event) =>
                                                                event.preventDefault()
                                                            }
                                                            className="group text-sm leading-none rounded-sm flex items-center gap-3 m-0.5 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none bg-neutral-700"
                                                        >
                                                            <div className="inline-flex items-center justify-center group-data-[disabled]:text-neutral-200 max-w-4">
                                                                <Icon d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                placeholder="New playlist"
                                                                className="h-full bg-transparent outline-none"
                                                            />
                                                        </DropdownMenu.Item>
                                                        <DropdownMenu.Item className="group text-sm leading-none rounded-sm flex items-center gap-3 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700">
                                                            <div className="inline-flex items-center justify-center group-data-[disabled]:text-neutral-200">
                                                                <Icon d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" />
                                                            </div>
                                                            New playlist
                                                        </DropdownMenu.Item>
                                                        <DropdownMenu.Separator className="h-0.5 bg-neutral-700" />
                                                        <DropdownMenu.Item className="group text-sm leading-none rounded-sm flex items-center gap-3 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700">
                                                            Calm
                                                        </DropdownMenu.Item>
                                                        <DropdownMenu.Item className="group text-sm leading-none rounded-sm flex items-center gap-3 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700">
                                                            Other
                                                        </DropdownMenu.Item>
                                                        <DropdownMenu.Item className="group text-sm leading-none rounded-sm flex items-center gap-3 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700">
                                                            English
                                                        </DropdownMenu.Item>
                                                    </DropdownMenu.SubContent>
                                                </DropdownMenu.Portal>
                                            </DropdownMenu.Sub>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Portal>
                                </DropdownMenu.Root>
                            </li>
                        </ul>
                    </A11yFocus>
                </div>
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content className="min-w-[220px] bg-neutral-800 text-white fill-neutral-200 rounded-md p-0.5 shadow-sm shadow-neutral-600 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
                    <ContextMenu.Item className="group text-sm leading-none rounded-sm flex items-center gap-3 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700">
                        <div className="inline-flex items-center justify-center group-data-[disabled]:text-mauve8">
                            <Icon d="M16 15H2v-1.5h14V15zm0-4.5H2V9h14v1.5zm-8.034-6A5.484 5.484 0 0 1 7.187 6H13.5a2.5 2.5 0 0 0 0-5H7.966c.159.474.255.978.278 1.5H13.5a1 1 0 1 1 0 2H7.966zM2 2V0h1.5v2h2v1.5h-2v2H2v-2H0V2h2z" />
                        </div>
                        Add to queue
                    </ContextMenu.Item>
                    <ContextMenu.Sub>
                        <ContextMenu.SubTrigger className="group text-sm leading-none rounded-sm  flex items-center gap-3 px-3 py-2 select-none outline-none data-[state=open]:bg-neutral-700 data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700 data-[highlighted]:data-[state=open]:bg-neutral-600">
                            <div className="inline-flex items-center justify-center group-data-[disabled]:text-neutral-200">
                                <Icon d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" />
                            </div>
                            Add to your playlist
                            <div className="ml-auto inline-flex items-center justify-center group-data-[disabled]:text-neutral-200">
                                <ChevronRightIcon />
                            </div>
                        </ContextMenu.SubTrigger>
                        <ContextMenu.Portal>
                            <ContextMenu.SubContent
                                className="min-w-[220px] bg-neutral-800 text-white fill-neutral-200 rounded-md p-0.5 shadow-sm shadow-neutral-600 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                                sideOffset={7.5}
                                alignOffset={-5}
                            >
                                <ContextMenu.Item
                                    onSelect={(event) => event.preventDefault()}
                                    className="group text-sm leading-none rounded-sm flex items-center gap-3 m-0.5 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none bg-neutral-700"
                                >
                                    <div className="inline-flex items-center justify-center group-data-[disabled]:text-neutral-200 max-w-4">
                                        <Icon d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="New playlist"
                                        className="h-full bg-transparent outline-none"
                                    />
                                </ContextMenu.Item>
                                <ContextMenu.Item className="group text-sm leading-none rounded-sm flex items-center gap-3 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700">
                                    <div className="inline-flex items-center justify-center group-data-[disabled]:text-neutral-200">
                                        <Icon d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" />
                                    </div>
                                    New playlist
                                </ContextMenu.Item>
                                <ContextMenu.Separator className="h-0.5 bg-neutral-700" />
                                <ContextMenu.Item className="group text-sm leading-none rounded-sm flex items-center gap-3 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700">
                                    Calm
                                </ContextMenu.Item>
                                <ContextMenu.Item className="group text-sm leading-none rounded-sm flex items-center gap-3 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700">
                                    Other
                                </ContextMenu.Item>
                                <ContextMenu.Item className="group text-sm leading-none rounded-sm flex items-center gap-3 px-3 py-2 select-none outline-none data-[disabled]:text-neutral-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-neutral-700">
                                    English
                                </ContextMenu.Item>
                            </ContextMenu.SubContent>
                        </ContextMenu.Portal>
                    </ContextMenu.Sub>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
}
