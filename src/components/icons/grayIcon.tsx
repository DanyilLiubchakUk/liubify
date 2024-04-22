import { grayIcon } from "../../models/icons";

export function GrayIcon({ width = "16", d, className }: grayIcon) {
    return (
        <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            width={width}
            className={`${className}`}
        >
            <path d={d}></path>
        </svg>
    );
}
