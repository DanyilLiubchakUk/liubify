import { createBrowserRouter } from "react-router-dom";
import { Main } from "../pages/Main";

export const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    { path: "/playlist/:playlistId", element: <Main /> },
    { path: "/artist/:artistId", element: <Main /> },
    { path: "*", element: <p className="text-red-900 text-center text-2xl font-bold">Page not foud</p> },
  ]);