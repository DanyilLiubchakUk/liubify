import { useEffect, useState } from "react";

export function UseRandomId(watch?: any) {
    const [id, setId] = useState(crypto.randomUUID());

    useEffect(() => {
        if (watch !== undefined) {
            setId(watch);
        } else {
            setId(crypto.randomUUID());
        }
    }, [watch]);

    return id;
}
