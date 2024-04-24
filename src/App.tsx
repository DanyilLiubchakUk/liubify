import { RouterProvider } from "react-router-dom";
import { router } from "./pageRoutes/routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setToken } from "./store/token/tokenSlice";
import { getTokenFromHash } from "./api/getAPI";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setToken(getTokenFromHash()));
    }, []);

    return (
        <div className="App w-screen h-screen text-white font-thin">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
