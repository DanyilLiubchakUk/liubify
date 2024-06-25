import { IAllPlaylists } from "./api.d";
export type Itoken = string | null;

// User data
export interface IUser {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    type: string;
    uri: string;
    followers: Followers;
    country: string;
    product: string;
    explicit_content: ExplicitContent;
    email: string;
}

export interface IOtherUser {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    type: string;
    uri: string;
    followers: Followers;
}

export interface ExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
}

// Artists
export interface IUserTopsArtists {
    items: IItemArtist[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next: string | null;
    previous: string | null;
}

export interface IItemArtist {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: Type;
    uri: string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href: null;
    total: number;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}

export type Tfolder = string | "" | "playlist" | "artist";

// interface of playlist
export interface IPlaylist {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: IOwner;
    primary_color: null;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
}
export interface IOwner {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
}

export interface Tracks {
    href: string;
    total: number;
}

// interface of artist
export interface IArtist {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

// interface of all variable of fethed playlist
export type IAllPlaylists = {
    href: string;
    id: string;
    images: Image[];
    type: string;
    uri: string;
    name: string;
    external_urls: ExternalUrls;

    collaborative?: boolean;
    description?: string;
    owner?: IOwner;
    primary_color?: null;
    public?: boolean;
    snapshot_id?: string;
    tracks?: Tracks;
    followers?: Followers;
    genres?: string[];
    popularity?: number;
};

// export type IAllPlaylistsNOpti = Omit<IPlaylist, keyof IArtist> & IArtist;
// export type IAllPlaylists = {
//     readonly [K in keyof IAllPlaylistsNOpti]?: IAllPlaylistsNOpti[K];
// };
