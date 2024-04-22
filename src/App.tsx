import { RouterProvider } from "react-router-dom";
import { router } from "./pageRoutes/routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setToken } from "./store/token/tokenSlice";
import { getToken } from "./api/getAPI";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setToken(getToken()));
    }, []);

    return (
        <div className="App w-screen h-screen text-white font-thin">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
