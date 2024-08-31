import { ReactNode, useEffect, useRef, useState } from "react";

interface A11yFocusProps {
    children: ReactNode;
    className?: string;
    onlyHorizontal?: boolean;
    onlyVertical?: boolean;
    rememberFocus?: boolean;
    onFocusListElement?: (el: Element) => void;
    isParentFocusable?: boolean;
    id?: string;
    startFrom?: number;
}

const boforeChildrenModefirer = ":not(a):not(button):not(.a11yFocus)";
const disabled = ":not(:disabled):not([aria-disabled='true'])";

export function A11yFocus({
    children,
    className,
    onlyHorizontal = false,
    onlyVertical = false,
    isParentFocusable = true,
    rememberFocus = true,
    startFrom = -1,
    onFocusListElement,
    id = "a11yFocus",
}: A11yFocusProps) {
    const focusParentRef = useRef<HTMLDivElement>(null);

    const [currentIndexList, setCurrentIndexList] = useState(startFrom);

    useEffect(() => {
        const elements =
            focusParentRef.current?.querySelectorAll(`
                .${id} > ul > li > button${disabled},
                .${id} > ul > li > .a11yFocus${disabled},
                .${id} > ul > li > a${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > button${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > .a11yFocus${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > a${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > button${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > .a11yFocus${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > a${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > button${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > .a11yFocus${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > a${disabled}
            `) || [];

        elements.forEach((element) => {
            (element as HTMLElement).tabIndex = -1;
        });
    }, [focusParentRef, children]);

    const keyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (
            ((e.key === "ArrowLeft" || e.key === "ArrowRight") &&
                onlyHorizontal) ||
            ((e.key === "ArrowUp" || e.key === "ArrowDown") && onlyVertical) ||
            ((e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowDown") &&
                !onlyHorizontal &&
                !onlyVertical)
        ) {
            e.preventDefault();
            const elements = focusParentRef.current?.querySelectorAll(`
                .${id} > ul > li > button${disabled},
                .${id} > ul > li > .a11yFocus${disabled},
                .${id} > ul > li > a${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > button${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > .a11yFocus${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > a${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > button${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > .a11yFocus${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > a${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > button${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > .a11yFocus${disabled},
                .${id} > ul > li > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > *${boforeChildrenModefirer} > a${disabled}
            `);
            if (!elements) return;

            let currentTabIndex = currentIndexList;

            if (elements && elements[currentTabIndex]) {
                (elements[currentTabIndex] as HTMLElement).tabIndex = -1;
            }

            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                currentTabIndex = (currentTabIndex + 1) % elements.length;
            } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                if (currentIndexList === -1) {
                    currentTabIndex++;
                }
                currentTabIndex =
                    (currentTabIndex - 1 + elements.length) % elements.length;
            }

            setCurrentIndexList(currentTabIndex);

            if (elements && elements[currentTabIndex]) {
                (elements[currentTabIndex] as HTMLElement).tabIndex = 0;
                (elements[currentTabIndex] as HTMLElement).focus();

                if (typeof onFocusListElement === "function") {
                    onFocusListElement(elements[currentTabIndex]);
                }
                if (!rememberFocus) {
                    (elements[currentTabIndex] as HTMLElement).tabIndex = -1;
                }
            }
        }
    };

    return (
        <div
            tabIndex={isParentFocusable ? 0 : -1}
            onKeyDown={keyHandler}
            ref={focusParentRef}
            className={`${className} ${id}`}
        >
            {children}
        </div>
    );
}
