import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ScrollText } from "../ScrollText";
import { Icon } from "../icons/Icon";
import { ClickAnimaiton } from "../icons/ClickAnimaiton";

interface TopArticleProps {
    scroll: number;
    thirdCollapce: () => void;
}

export function TopArticle({ scroll, thirdCollapce }: TopArticleProps) {
    const curentAudio = useSelector(
        (state: RootState) => state.tracksHistore.curentAudio
    );

    return (
        <div
            className={`flex justify-between items-center gap-4 p-4 my-2 sticky top-0 left-0 bg-neutral-900 shadow-black ${
                scroll > 7.5 ? "shadow-md" : ""
            }`}
        >
            <div className="flex-1 bg-inherit">
                <ScrollText
                    text={curentAudio.albumName}
                    className="font-bold"
                />
            </div>
            <div className="flex items-center gap-3">
                <span className="hover:fill-stone-100 transition-colors">
                    <ClickAnimaiton>
                        <Icon d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </ClickAnimaiton>
                </span>
                <button
                    className="hover:fill-stone-100 transition-colors"
                    onClick={thirdCollapce}
                >
                    <ClickAnimaiton>
                        <Icon d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z" />
                    </ClickAnimaiton>
                </button>
            </div>
        </div>
    );
}
