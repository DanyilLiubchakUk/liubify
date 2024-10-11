export const ClientID = "b00dc8c136614d7f909617415763c3c4";
export const RedirectURI =
    window.location.href.split("/")[3] === "liubify"
        ? window.location.origin + "/liubify/"
        : window.location.origin + "/";
export const apiURL = "https://accounts.spotify.com/authorize";
// scope can do not use for more data
export const scope = [
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-position",
    "user-top-read",
];
