interface RightBarProps {
    thirdCollapce: () => void;
}

export function RightBar({ thirdCollapce }: RightBarProps) {
    return (
        <aside className="bg-zinc-800 h-full">
            fhjd
            <button onClick={thirdCollapce}>close this tab</button>
        </aside>
    );
}
