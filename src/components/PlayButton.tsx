import { animate, useAnimate } from "framer-motion";
import { Icon } from "./icons/Icon";
import { useState } from "react";

type AnimaitonSequence = Parameters<typeof animate>[0];

interface PlayButtonProos {
    isGray?: boolean;
    height?: string;
}

export function PlayButton({ isGray = false, height = "48" }: PlayButtonProos) {
    const [hoverState, setHoverState] = useState(false);

    const [scope, animate] = useAnimate();

    const clickHandler = async () => {
        const buttonClick: AnimaitonSequence = [
            ["button", { scale: 0.94 }, { duration: 0.1 }],
            ["button", { opacity: 0.6 }, { duration: 0.1, at: "<" }],
            ["button", { opacity: 1 }, { duration: 0.1 }],
            ["button", { scale: 1 }, { duration: 0.1 }],
        ];
        await animate([...buttonClick]);
    };

    const toggleHover = () => {
        setHoverState((prevState) => !prevState);
    };

    return (
        <span ref={scope} onClick={clickHandler}>
            <button
                className={`play hover:scale-[1.04] flex items-center justify-center rounded-full fill-black`}
                style={{
                    height: `${height}px`,
                    width: `${height}px`,
                    background: `#${
                        isGray
                            ? hoverState
                                ? "f5f5f4"
                                : "a8a29e"
                            : hoverState
                            ? "1fdf64"
                            : "1db954 "
                    }`,
                }}
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
            >
                <Icon
                    d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"
                    width="24"
                />
            </button>
        </span>
    );
}
