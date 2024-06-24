import { useState } from "react";
import { Icon } from "./Icon";
import { useAnimate, animate } from "framer-motion";

interface AddPlaylistIconProps {
    width?: string;
}

type AnimaitonSequence = Parameters<typeof animate>[0];

function randomNumberInRenge(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function AddPlaylistIcon({ width = "16" }: AddPlaylistIconProps) {
    const [isAdded, setIsAdded] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);

    const [scope, animate] = useAnimate();

    const clickHandler = async () => {
        setIsAnimated(true);
        if (!isAnimated) {
            setIsAdded(!isAdded);
            const buttonClick: AnimaitonSequence = [
                ["button", { scale: 0.94 }, { duration: 0.1 }],
                ["button", { opacity: 0.6 }, { duration: 0.1, at: "<" }],
                ["button", { opacity: 1 }, { duration: 0.1 }],
                ["button", { scale: 1 }, { duration: 0.1 }],
            ];
            if (!isAdded) {
                const particles = Array.from({ length: 20 });
                const particlesAnimation: AnimaitonSequence = particles.map(
                    (v, i) => {
                        const randomX = randomNumberInRenge(-25, 25);
                        const rotate = randomX * 12;
                        return [
                            `.particle:nth-child(${i + 1})`,
                            {
                                x: randomX,
                                y: randomNumberInRenge(-30, -19),
                                scale: randomNumberInRenge(1.25, 2),
                                opacity: 1,
                                rotate: rotate,
                                filter: `brightness(${randomNumberInRenge(
                                    65,
                                    150
                                )}%)`,
                            },
                            {
                                duration: 0.8,
                                at: "<",
                                ease: [0, 1.15, 0.5, 1],
                            },
                        ];
                    }
                );
                const particlesFadeOut: AnimaitonSequence = particles.map(
                    (v, i) => [
                        `.particle:nth-child(${i + 1})`,
                        { opacity: 0, scale: 0 },
                        { duration: 0.3, at: 1.2 },
                    ]
                );
                const particlesResrt: AnimaitonSequence = particles.map(
                    (v, i) => [
                        `.particle:nth-child(${i + 1})`,
                        {
                            x: 0,
                            y: 0,
                            rotate: 0,
                            filter: "brightness(0%)",
                        },
                        { duration: 0.00000001 },
                    ]
                );
                await animate([
                    ...particlesResrt,

                    ...buttonClick,

                    [
                        ".plus-playlist path:nth-child(2)",
                        { strokeWidth: "100%", stroke: "#1ed760" },
                        { duration: 0.0000001 },
                    ],
                    [
                        ".plus-playlist path:nth-child(2)",
                        { strokeWidth: "0", fill: "#1ed76090" },
                        { duration: 0.0000001, delay: 0.2 },
                    ],

                    [
                        ".added-playlist",
                        { scale: 1, opacity: 1 },
                        { duration: 0.1, at: "<" },
                    ],
                    [
                        ".plus-playlist",
                        { scale: 3, opacity: 0 },
                        { duration: 0.8, at: "<" },
                    ],

                    ...particlesAnimation,

                    [
                        ".plus-playlist",
                        { scale: 1 },
                        { duration: 0.0000001, at: 1.4 },
                    ],
                    [
                        ".plus-playlist path:nth-child(2)",
                        { strokeWidth: "0", fill: "unset" },
                        { duration: 0.0000001, at: "<" },
                    ],

                    ...particlesFadeOut,
                ]);
                setIsAnimated(false);
            } else {
                await animate([
                    [
                        ".plus-playlist path:nth-child(2)",
                        { strokeWidth: "100%", stroke: "#1ed760" },
                        { duration: 0.000000001 },
                    ],
                    [".plus-playlist", { opacity: 1 }, { duration: 0.0000001 }],

                    ...buttonClick,

                    [
                        ".added-playlist",
                        { scale: 0, opacity: 0 },
                        { duration: 0.000000001, at: "<" },
                    ],
                    [
                        ".plus-playlist path:nth-child(2)",
                        { strokeWidth: "0", fill: "unset" },
                        { duration: 0.000000001 },
                    ],
                ]);
                setIsAnimated(false);
            }
        }
    };

    return (
        <div ref={scope} onClick={clickHandler} className="flex">
            <button className="relative rounded-full">
                <Icon
                    d2="M11.999 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-11 9c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11z"
                    d="M17.999 12a1 1 0 0 1-1 1h-4v4a1 1 0 1 1-2 0v-4h-4a1 1 0 1 1 0-2h4V7a1 1 0 1 1 2 0v4h4a1 1 0 0 1 1 1z"
                    viewBox="24"
                    width={width}
                    className="transition-transform duration-400 hover:scale-[1.04] hover:fill-[#fff] fill-stone-400 plus-playlist rounded-full [&_path:nth-child(2)]:transition-[stroke-width] [&_path:nth-child(2)]:duration-[300ms] pointer-events-none"
                />
                <Icon
                    d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm16.398-2.38a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z"
                    viewBox="24"
                    width={width}
                    className="fill-[#1ed760] transition-[transform,colors] duration-400 hover:scale-[1.04] hover:fill-[#1fdf64] absolute top-0 left-0 added-playlist opacity-0 scale-[0.2]"
                />

                <span
                    className="absolute block inset-0 pointer-events-none -z-10"
                    aria-hidden
                >
                    {Array.from({ length: 10 }).map((v, i) => {
                        return (
                            <span
                                className="particle inline-block w-[2.5px] h-[2.5px] bg-[#1ed760] absolute top-1/2 left-1/2 opacity-0 scale-0 rounded-[1px]"
                                key={i}
                            ></span>
                        );
                    })}
                </span>
            </button>
        </div>
    );
}
