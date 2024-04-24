import { GrayIcon } from "../icons/grayIcon";

export function Playlist({}: {}) {
    return (
        <div className="playlist grid grid-cols-12 items-center gap-3 hover:bg-stone-800 transition-colors px-2 py-1.5 mr-1 rounded-lg">
            <div className="col-span-8 flex gap-3 items-center">
                <div
                    className="min-w-12 h-12 bg-cover bg-center rounded"
                    style={{
                        backgroundImage: `url(https://cdn.britannica.com/36/69636-050-81A93193/Self-Portrait-artist-panel-board-Vincent-van-Gogh-1887.jpg)`,
                    }}
                ></div>
                <div className="relative grow self-start">
                    <div className="flex flex-col">
                        <div className="relative h-12">
                            <span className="text-ellipsis overflow-hidden whitespace-nowrap left-0 right-0 absolute top-0.5 text-stone-100 text-lg font-bold">
                                Thimaty albus for arm dfd df dff dfs
                            </span>
                            <span className="text-ellipsis overflow-hidden whitespace-nowrap left-0 right-0 bottom-0.5 absolute">
                                2 playlists
                            </span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <GrayIcon d="m14 6-6 6-6-6h12z" />
                </div>
            </div>
            <div className="col-span-2 text-xs">Mar 1, 2024</div>
            <div className="col-span-2 text-end text-xs">2 days ago</div>
        </div>
    );
}
