import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface UserDataBackgroundProps {
    colorOfDataLog: string;
}

export function UserDataBackground({
    colorOfDataLog,
}: UserDataBackgroundProps) {
    const indexOfSecondScroll = useSelector(
        (state: RootState) => state.mainTab.indexOfSecondScroll
    );
    return (
        <div
            className="absolute top-0 left-0 h-full w-full -z-10 brightness-[0.35]"
            style={{
                backgroundColor: colorOfDataLog,
                opacity: indexOfSecondScroll,
            }}
        ></div>
    );
}
