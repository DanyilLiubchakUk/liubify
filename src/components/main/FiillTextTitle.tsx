import { useEffect, useRef, useState } from "react";

interface FillTextByFontSizeProps {
    text: string;
    effectByArr: any[];
}

export function FillTextByFontSize({
    text,
    effectByArr,
}: FillTextByFontSizeProps) {
    const parent = useRef<HTMLInputElement>(null);
    const aboveText = useRef<HTMLInputElement>(null);
    const child = useRef<HTMLInputElement>(null);
    const [refSize, setRefSize] = useState(1);

    useEffect(() => {
        if (aboveText.current && parent.current) {
            let widthOfOneRem = aboveText.current.clientWidth / refSize;
            let newFontSize = 2;
            // try to make highes font size as child element can
            while (
                widthOfOneRem * newFontSize <
                parent.current.clientWidth - 10
            ) {
                //make steps like:2, 2.5, 3, 3.5, 4, 5, 5.5, 6 rems
                if (newFontSize <= 3.5 || newFontSize >= 5) {
                    newFontSize = newFontSize + 0.5;
                } else {
                    newFontSize++;
                }
            }
            if (newFontSize > 6) {
                newFontSize = 6;
            }
            newFontSize--;
            if (aboveText.current.clientWidth === parent.current.clientWidth) {
                newFontSize = 2;
            }
            if (newFontSize >= 2 && newFontSize <= 6) {
                setRefSize(newFontSize);
            }
        }
    }, [
        ...effectByArr,
        child.current?.clientWidth,
        child.current,
        parent.current?.clientWidth,
        parent.current,
        child.current?.innerText.length,
    ]);
    return (
        <div ref={parent}>
            <div ref={aboveText} className="inline-block">
                <h1
                    ref={child}
                    className="line-clamp-3 font-extrabold"
                    style={{
                        fontSize: refSize + "rem",
                        lineHeight: 1.36,
                    }}
                >
                    {text}
                </h1>
            </div>
        </div>
    );
}
