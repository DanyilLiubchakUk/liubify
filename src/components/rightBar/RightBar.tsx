import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store/store";
import { setIsShowThirdTab } from "../../store/tabs/tabsSlice";


export function RightBar({}: {}) {
    // const showThirdTab: boolean = useSelector(
    //     (state: RootState) => state.tabs.showThirdTab
    // );
    const dispatch = useDispatch()
    return <aside className="bg-zinc-800 h-full">fhjd <button onClick={()=> dispatch(setIsShowThirdTab(false))}>close this tab</button></aside>;
}
