interface MainBackgroundProps {
    colorOfDataLog: string;
}
export function MainBackground({ colorOfDataLog }: MainBackgroundProps) {
    return (
        <div
            className={`absolute top-full left-0 w-full h-4/5 brightness-[0.35]`}
            style={{
                backgroundImage: `linear-gradient(to bottom, ${colorOfDataLog} 0%, transparent 100%)`,
            }}
        ></div>
    );
}
