import { createBrowserRouter } from "react-router-dom";
import { Main } from "../pages/Main";
import { MainPanel } from "../components/main/MainPanel";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";

const isLiubify = window.location.pathname.startsWith("/liubify");
const basename = isLiubify ? "/liubify" : "";

export const router = createBrowserRouter([
    {
        path: basename + "/",
        element: (
            <Main>
                <Home />
            </Main>
        ),
    },
    {
        path: basename + "/search",
        element: (
            <Main>
                <Search />
            </Main>
        ),
    },
    {
        path: basename + "/search/:searchRequest",
        element: (
            <Main>
                <Search />
            </Main>
        ),
    },
    {
        path: basename + "/search/:searchRequest/:filter",
        element: (
            <Main>
                <Search />
            </Main>
        ),
    },
    {
        path: basename + "/playlist/:playlistId",
        element: (
            <Main>
                <MainPanel />
            </Main>
        ),
    },
    {
        path: basename + "/artist/:artistId",
        element: (
            <Main>
                <MainPanel />
            </Main>
        ),
    },
    {
        path: basename + "/album/:albumId",
        element: (
            <Main>
                <MainPanel />
            </Main>
        ),
    },
    {
        path: basename + "*",
        element: (
            <Main>
                <p className="text-red-900 text-center text-2xl font-bold">
                    Page not foud
                </p>
            </Main>
        ),
    },
]);
