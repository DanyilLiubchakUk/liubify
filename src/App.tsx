import { RouterProvider } from "react-router-dom";
import { router } from "./pageRoutes/routes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setToken } from "./store/token/tokenSlice";
import { getTokenFromHash, makeAPIForToken } from "./api/getAPI";
import { RootState } from "./store/store";
import { ClientID, RedirectURI, apiURL, scope } from "./api/API_DATA";

function App() {
    const dispatch = useDispatch();
    const token: string | null = useSelector(
        (state: RootState) => state.token.value
    );
    useEffect(() => {
        if (!window.location.hash.includes("access_token=")) {
            if (token === null) {
                makeAPIForToken(apiURL, ClientID, RedirectURI, scope);
            }
        } else {
            dispatch(setToken(getTokenFromHash()));
        }
    }, []);

    return (
        <div className="App w-screen h-screen text-white font-thin">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
