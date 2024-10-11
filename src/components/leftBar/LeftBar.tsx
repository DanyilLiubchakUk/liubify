import { Link } from "react-router-dom";
import { Icon } from "../icons/Icon";
import { PlaylistsWindow } from "./PlaylistsWindow";
import { A11yFocus } from "../focus/A11yFocus";

export function LeftBar({}: {}) {
    return (
        <aside className="text-stone-400 fill-stone-400 w-full">
            <nav className="bg-neutral-900 rounded-md mb-2 h-28 p-3 text-lg font-semibold">
                <A11yFocus className="h-full">
                    <ul className="flex flex-col justify-evenly h-full">
                        <li className="[&>*]:flex [&>*]:items-center [&>*]:gap-3 [&>*:focus-visible]:group [&>*:focus-visible]:fill-white [&>*:focus-visible_span]:text-white group [&>*]:fill-stone-400">
                            <Link
                                to={`${
                                    window.location.pathname.startsWith(
                                        "/liubify"
                                    )
                                        ? "/liubify"
                                        : ""
                                }/`}
                            >
                                <Icon
                                    d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"
                                    viewBox="24"
                                    width="24"
                                    className="group-hover:fill-white transition-colors"
                                />
                                <span className="group-hover:text-white transition-colors">
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li className="[&>*]:flex [&>*]:items-center [&>*]:gap-3 [&>*:focus-visible]:group [&>*:focus-visible]:fill-white [&>*:focus-visible_span]:text-white group [&>*]:fill-stone-400">
                            <Link
                                to={`${
                                    window.location.pathname.startsWith(
                                        "/liubify"
                                    )
                                        ? "/liubify"
                                        : ""
                                }/search`}
                            >
                                <Icon
                                    d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"
                                    viewBox="24"
                                    width="24"
                                    className="group-hover:fill-white transition-colors"
                                />
                                <span className="group-hover:text-white transition-colors">
                                    Search
                                </span>
                            </Link>
                        </li>
                    </ul>
                </A11yFocus>
            </nav>
            <PlaylistsWindow />
        </aside>
    );
}
