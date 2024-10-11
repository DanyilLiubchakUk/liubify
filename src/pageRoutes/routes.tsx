import { createBrowserRouter } from "react-router-dom";
import { Main } from "../pages/Main";
import { MainPanel } from "../components/main/MainPanel";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Main>
                <Home />
            </Main>
        ),
    },
    {
        path: "/search",
        element: (
            <Main>
                <Search />
            </Main>
        ),
    },
    {
        path: "/search/:searchRequest",
        element: (
            <Main>
                <Search />
            </Main>
        ),
    },
    {
        path: "/search/:searchRequest/:filter",
        element: (
            <Main>
                <Search />
            </Main>
        ),
    },
    {
        path: "/playlist/:playlistId",
        element: (
            <Main>
                <MainPanel />
            </Main>
        ),
    },
    {
        path: "/artist/:artistId",
        element: (
            <Main>
                <MainPanel />
            </Main>
        ),
    },
    {
        path: "/album/:albumId",
        element: (
            <Main>
                <MainPanel />
            </Main>
        ),
    },
    {
        path: "*",
        element: (
            <Main>
                <p className="text-red-900 text-center text-2xl font-bold">
                    Page not foud
                </p>
            </Main>
        ),
    },
]);
