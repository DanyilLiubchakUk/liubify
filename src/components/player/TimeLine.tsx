interface TimeLineProps {
    max: number;
    now: number;
    setCurrentTime: (time: number) => void;
}

export function TimeLine({ max, now, setCurrentTime }: TimeLineProps) {
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const paddedSeconds =
            remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${paddedSeconds}`;
    };
    return (
        <div className="flex justify-between gap-2 items-center text-xs">
            <div className="min-w-10 text-end">{formatTime(now)}</div>
            <div className="w-full  relative group [&:has(input:focus-visible)>div]:outline [&:has(input:focus-visible)>div>div>div]:bg-spotify-green [&:has(input:focus-visible)>div>div:last-child]:opacity-100">
                <input
                    type="range"
                    min="0.0000000000000001"
                    max={max}
                    className="w-full 
 h-2 appearance-none [-webkit-appearance:none] pointer-events-auto opacity-0
 [&::-webkit-slider-thumb]:[-webkit-appearance:none] 
 [&::-webkit-slider-thumb]:appearance-none 
 [&::-webkit-slider-thumb]:bg-green-500 
 [&::-webkit-slider-thumb]:h-3 
 [&::-webkit-slider-thumb]:w-3 
 [&::-webkit-slider-thumb]:rounded-full
 [&::-webkit-slider-thumb]:cursor-pointer
 [&::-moz-range-thumb]:bg-green-500 
 [&::-moz-range-thumb]:h-3 
 [&::-moz-range-thumb]:w-3 
 [&::-moz-range-thumb]:rounded-full
 [&::-moz-range-thumb]:cursor-pointer
 "
                    value={now}
                    onChange={(e) => {
                        setCurrentTime(Number(e.target.value));
                    }}
                ></input>
                <div className="w-full absolute top-1.5 flex items-center pointer-events-none rounded-sm outline-1 outline-white outline-offset-2">
                    <div className="rounded-sm h-1 w-full bg-neutral-900 overflow-hidden">
                        <div
                            className="bg-white h-1 w-full rounded-sm relative -left-full group-hover:bg-spotify-green"
                            style={{ left: `${(now / max) * 100 - 100}%` }}
                        ></div>
                    </div>
                    <div
                        className="bg-white h-3 w-3 rounded-full absolute -top-1 -translate-x-1.5 opacity-0 group-hover:opacity-100"
                        style={{ left: `${(now / max) * 100}%` }}
                    ></div>
                </div>
            </div>
            <div className="min-w-10">{formatTime(max)}</div>
        </div>
    );
}
