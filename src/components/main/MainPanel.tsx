import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store/store";
// import { userAPI } from "../../api/userAPI";
import { setIsShowThirdTab } from "../../store/tabs/tabsSlice";

export function MainPanel({}: {}) {
    // const { data, isError, isLoading } = userAPI.useFetchCurentUserQuery(token); // expect some param for params (_limit)
    const dispatch = useDispatch();

    return (
        <main className="bg-zinc-800 h-full">
            main
            <button onClick={() => dispatch(setIsShowThirdTab(!false))}>
                close right
            </button>
        </main>
    );
}
