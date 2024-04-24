import { useDispatch } from "react-redux";
import { setIsShowThirdTab } from "../../store/tabs/tabsSlice";

export function RightBar({}: {}) {
    const dispatch = useDispatch();
    return (
        <aside className="bg-zinc-800 h-full">
            fhjd
            <button onClick={() => dispatch(setIsShowThirdTab(false))}>
                close this tab
            </button>
        </aside>
    );
}
