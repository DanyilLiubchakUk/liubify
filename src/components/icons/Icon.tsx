import { IIcon } from "../../models/icons";

export function Icon({
    width = "16",
    d,
    d2,
    viewBox,
    className,
}: IIcon) {
    return (
        <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox={`0 0 ${viewBox ? viewBox : width} ${
                viewBox ? viewBox : width
            }`}
            width={width}
            className={`${className ? className : ""}`}
        >
            <path d={d}></path>
            {d2 && <path d={d2}></path>}
        </svg>
    );
}
