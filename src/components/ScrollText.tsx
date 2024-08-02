import { useEffect, useRef } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

interface ScrollTextProps {
    text: string;
    className?: string;
    blockColor?: string;
    height?: string;
}

export function ScrollText({
    text,
    className = "",
    blockColor = "black",
    height = "20",
}: ScrollTextProps) {
    const refParent = useRef<HTMLDivElement | null>(null);
    const refChild = useRef<HTMLDivElement | null>(null);

    const thirdTabSize = useSelector(
        (state: RootState) => state.tabs.secondTabSize
    );

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
                    parent.classList.add("after:opacity-100");
                    const handleMouseEnter = () => {
                        if (!animation || animation.playState === "finished") {
                            parent.classList.add("before:opacity-100");
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
                                parent.classList.remove("before:opacity-100");
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
                    if (parent.classList.contains("after:opacity-100")) {
                        parent.classList.remove("after:opacity-100");
                        parent.classList.remove("before:opacity-100");
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
                if (parent && parent.classList.contains("after:opacity-100")) {
                    parent.classList.remove("after:opacity-100");
                    parent.classList.remove("before:opacity-100");
                }
            }
        };
    }, [text, refParent, refChild, thirdTabSize]);
    return (
        <div
            ref={refParent}
            className={`relative right-0 left-0 overflow-hidden 
                after:absolute 
                after:right-0 
                after:w-2 
                after:h-full 
                after:bg-gradient-to-r 
                after:from-transparent 
                after:z-10
                after:opacity-0 
                after:transition-opacity 

                before:absolute 
                before:left-0 
                before:w-2 
                before:h-full 
                before:bg-gradient-to-l 
                before:from-transparent 
                before:z-10 
                before:opacity-0 
                before:transition-opacity 

                after:to-${blockColor} 
                before:to-${blockColor}`}
            style={{ height: `${height}px` }}
        >
            <div ref={refChild} className="absolute">
                <span className={`${className} whitespace-nowrap`}>{text}</span>
            </div>
        </div>
    );
}