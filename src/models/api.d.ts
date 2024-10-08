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
    height?: number;
    url: string;
    width?: number;
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
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
    name?: string;
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
    owner: IOwner;
    primary_color: null;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
}

export interface Tracks {
    href?: string;
    items: Item[];
    limit?: number;
    next?: string | null;
    offset?: number;
    previous?: string | null;
    total?: number;
}

export interface Item {
    added_at?: Date;
    added_by?: IOwner;
    is_local?: boolean;
    primary_color?: null;
    track: Track;
    video_thumbnail?: VideoThumbnail;
}

export interface Track {
    preview_url?: null | string;
    available_markets?: string[];
    explicit?: boolean;
    type?: string;
    episode?: boolean;
    track?: boolean;
    album?: Album;
    artists?: IOwner[];
    disc_number?: number;
    track_number?: number;
    duration_ms: number;
    external_ids?: ExternalIDS;
    external_urls?: ExternalUrls;
    href?: string;
    id: string;
    name: string;
    popularity?: number;
    uri?: string;
    is_local?: boolean;
}

export interface Album {
    available_markets?: string[];
    type?: string;
    album_type?: string;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    release_date?: Date;
    release_date_precision?: string;
    uri?: string;
    artists?: IOwner[];
    external_urls?: ExternalUrls;
    total_tracks?: number;
}

export interface VideoThumbnail {
    url: null;
}

// Artists top tracks(they got from artist id)

export interface IArtistsTopTracks {
    album?: Album;
    artists: Artist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIDS;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

export interface Album {
    album_type?: string;
    artists?: Artist[];
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    is_playable?: boolean;
    name?: string;
    release_date?: Date;
    release_date_precision?: string;
    total_tracks?: number;
    type?: string;
    uri?: string;
}

export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface ExternalIDS {
    isrc: string;
}

export interface ITrackPlayedData {
    url: string;
    title: string;
    id: string;
    img: string;
    artist: string;
    albumName: string
}
