import { Itoken } from "../models/api";

export function makeAPIForToken(
    apiURL: string,
    ClientID: string,
    RedirectURI: string,
    scope: string[]
): void {
    window.location.href = `${apiURL}?client_id=${ClientID}&redirect_uri=${RedirectURI}&scope=${scope.join(
        " "
    )}&response_type=token&show_daialog=true`;
    
}
export function getTokenFromHash(): Itoken {
    const hash = window.location.hash;
    if (hash) {
        return hash.substring(1).split("&")[0].split("=")[1];
    }
    else {
        return null
    }
}