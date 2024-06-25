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

// type of trucks fetch
export interface ITracks {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    primary_color: null;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
}

export interface Owner {
    display_name?: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: OwnerType;
    uri: string;
    name?: string;
}

export enum OwnerType {
    Artist = "artist",
    User = "user",
}

export interface Tracks {
    href: string;
    items: Item[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface Item {
    added_at: Date;
    added_by: Owner;
    is_local: boolean;
    primary_color: null;
    track: Track;
    video_thumbnail: VideoThumbnail;
}

export interface Track {
    preview_url: null | string;
    available_markets: string[];
    explicit: boolean;
    type: TrackType;
    episode: boolean;
    track: boolean;
    album: Album;
    artists: Owner[];
    disc_number: number;
    track_number: number;
    duration_ms: number;
    external_ids: ExternalIDS;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    popularity: number;
    uri: string;
    is_local: boolean;
}

export interface Album {
    available_markets: string[];
    type: AlbumTypeEnum;
    album_type: AlbumTypeEnum;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: Date;
    release_date_precision: ReleaseDatePrecision;
    uri: string;
    artists: Owner[];
    external_urls: ExternalUrls;
    total_tracks: number;
}

export enum AlbumTypeEnum {
    Album = "album",
    Compilation = "compilation",
    Single = "single",
}

export enum ReleaseDatePrecision {
    Day = "day",
}

export interface ExternalIDS {
    isrc: string;
}

export enum TrackType {
    Track = "track",
}

export interface VideoThumbnail {
    url: null;
}
