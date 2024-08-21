import { animate, useAnimate } from "framer-motion";

type AnimaitonSequence = Parameters<typeof animate>[0];

interface ClickAnimaitonProps {
    children: React.ReactNode;
}

export function ClickAnimaiton({ children }: ClickAnimaitonProps) {
    const [scopeAnimationNode, animate] = useAnimate();

    const ClickHandler = async () => {
        const buttonClick: AnimaitonSequence = [
            ["div", { scale: 0.94 }, { duration: 0.1 }],
            ["div", { opacity: 0.6 }, { duration: 0.1, at: "<" }],
            ["div", { opacity: 1 }, { duration: 0.1 }],
            ["div", { scale: 1 }, { duration: 0.1 }],
        ];
        await animate([...buttonClick]);
    };

    return (
        <div ref={scopeAnimationNode} onClick={ClickHandler}>
            <div>{children}</div>
        </div>
    );
}
