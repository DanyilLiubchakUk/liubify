import { useEffect, useRef, useState } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

interface ScrollTextProps {
    text: string;
    className?: string;
    height?: string;
    hoverState?: boolean;
}

export function ScrollText({
    text,
    className = "",
    height = "20",
    hoverState = false,
}: ScrollTextProps) {
    const refParent = useRef<HTMLDivElement | null>(null);
    const refChild = useRef<HTMLDivElement | null>(null);
    const refColor = useRef<HTMLDivElement | null>(null);
    const [backgroundColor, setBackgroundColor] = useState("#000");

    const thirdTabSize = useSelector(
        (state: RootState) => state.tabs.secondTabSize
    );

    useEffect(() => {
        if (refColor.current) {
            setBackgroundColor(
                getComputedStyle(refColor.current).backgroundColor
            );
        }
    }, [hoverState]);

    useEffect(() => {
        const resetAnimation = () => {
            if (refParent.current && refChild.current) {
                const parent = refParent.current;
                const child = refChild.current;
                let animation: Animation | null = null;

                if (
                    parent.clientWidth < child.clientWidth &&
                    text === child.textContent
                ) {
                    parent.children[2].classList.add("opacity-100");
                    const handleMouseEnter = () => {
                        if (!animation || animation.playState === "finished") {
                            parent.children[1].classList.add("opacity-100");
                            animation = child.animate(
                                [
                                    {
                                        transform: "translateX(0)",
                                        easing: "ease-in-out",
                                    },
                                    {
                                        transform: `translateX(${
                                            parent.clientWidth -
                                            child.clientWidth -
                                            7.5
                                        }px)`,
                                        easing: "ease-in-out",
                                    },
                                    {
                                        transform: `translateX(${
                                            parent.clientWidth -
                                            child.clientWidth
                                        }px)`,
                                        easing: "ease-in-out",
                                    },
                                    {
                                        transform: "translateX(7.5px)",
                                        easing: "ease-in-out",
                                    },
                                    {
                                        transform: "translateX(0)",
                                        easing: "ease-in-out",
                                    },
                                ],
                                {
                                    duration: 10000,
                                    iterations: 3,
                                }
                            );
                            animation.onfinish = () => {
                                parent.children[1].classList.remove(
                                    "opacity-100"
                                );
                            };
                        }
                    };

                    parent.addEventListener("mouseenter", handleMouseEnter);

                    return () => {
                        if (animation) {
                            animation.cancel();
                        }
                        parent.removeEventListener(
                            "mouseenter",
                            handleMouseEnter
                        );
                    };
                } else {
                    if (parent.children[2].classList.contains("opacity-100")) {
                        parent.children[2].classList.remove("opacity-100");
                        parent.children[1].classList.remove("opacity-100");
                    }
                }
            }
        };

        resetAnimation();

        const observer = new ResizeObserver(() => {
            if (refChild.current) {
                refChild.current
                    .getAnimations()
                    .forEach((anim) => anim.cancel());
            }
            resetAnimation();
        });

        if (refChild.current) {
            observer.observe(refChild.current);
        }
        return () => {
            if (refChild.current) {
                observer.unobserve(refChild.current);
                const parent = refParent.current;
                if (
                    parent &&
                    parent.children[2].classList.contains("opacity-100")
                ) {
                    parent.children[2].classList.remove("opacity-100");
                    parent.children[1].classList.remove("opacity-100");
                }
            }
        };
    }, [text, refParent, refChild, thirdTabSize]);
    return (
        <>
            <div ref={refColor} className="bg-inherit"></div>
            <div
                ref={refParent}
                className={`relative right-0 left-0 overflow-hidden`}
                style={{ height: `${height}px` }}
            >
                <div ref={refChild} className="absolute">
                    <span className={`${className} whitespace-nowrap`}>
                        {text}
                    </span>
                </div>
                <div
                    className="absolute top-0 left-0 w-2 h-full transition-opacity opacity-0"
                    style={{
                        background: `linear-gradient(270deg, rgba(0,0,0,0) 0%, ${backgroundColor} 100%)`,
                    }}
                ></div>
                <div
                    className="absolute top-0 right-0 w-2 h-full transition-opacity opacity-0"
                    style={{
                        background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${backgroundColor} 100%)`,
                    }}
                ></div>
            </div>
        </>
    );
}
