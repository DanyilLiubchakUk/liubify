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
    added_by?: Owner;
    is_local?: boolean;
    primary_color?: null;
    track: Track;
    video_thumbnail?: VideoThumbnail;
}

export interface Track {
    preview_url?: null | string;
    available_markets?: string[];
    explicit?: boolean;
    type?: TrackType;
    episode?: boolean;
    track?: boolean;
    album?: Album;
    artists?: Owner[];
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

// Artists top tracks(they got from artist id)

export interface IArtistsTopTracks {
    album: Album;
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
    type: IArtistsTopTrackType;
    uri: string;
}

export interface Album {
    album_type: AlbumType;
    artists: Artist[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_playable: boolean;
    name: string;
    release_date: Date;
    release_date_precision: ReleaseDatePrecision;
    total_tracks: number;
    type: AlbumTypeEnum;
    uri: string;
}

export enum AlbumType {
    Single = "single",
}

export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: ID;
    name: Name;
    type: ArtistType;
    uri: URI;
}

export interface ExternalUrls {
    spotify: string;
}

export enum ID {
    The0JrsAkTEhQvGQ4REFtSe5X = "0jrsAkTEhQvGQ4REFtSe5X",
    The0LyfQWJT6NXafLPZqxe9Of = "0LyfQWJT6nXafLPZqxe9Of",
    The0OCiizjmum5FKZOy8EwTHA = "0OCiizjmum5fKZOy8ewTHA",
    The21WkRmVqBLt0Cd9OJ7YZkW = "21wkRmVqBLt0Cd9OJ7yZkW",
    The2CMmIudgukX0NvW43VUVOz = "2cMmIudgukX0nvW43VUVOz",
    The59A4SG6JBogxt0Zx9UXAEa = "59a4SG6JBogxt0zx9UXAEa",
}

export enum Name {
    SkubenichBrothers = "Skubenich Brothers",
    VariousArtists = "Various Artists",
    СкубеничАндрей = "Скубенич Андрей",
    СкубеничВиталий = "Скубенич Виталий",
    СкубеничИгорь = "Скубенич Игорь",
    СкубеничМаксим = "Скубенич Максим",
}

export enum ArtistType {
    Artist = "artist",
}

export enum URI {
    SpotifyArtist0JrsAkTEhQvGQ4REFtSe5X = "spotify:artist:0jrsAkTEhQvGQ4REFtSe5X",
    SpotifyArtist0LyfQWJT6NXafLPZqxe9Of = "spotify:artist:0LyfQWJT6nXafLPZqxe9Of",
    SpotifyArtist0OCiizjmum5FKZOy8EwTHA = "spotify:artist:0OCiizjmum5fKZOy8ewTHA",
    SpotifyArtist21WkRmVqBLt0Cd9OJ7YZkW = "spotify:artist:21wkRmVqBLt0Cd9OJ7yZkW",
    SpotifyArtist2CMmIudgukX0NvW43VUVOz = "spotify:artist:2cMmIudgukX0nvW43VUVOz",
    SpotifyArtist59A4SG6JBogxt0Zx9UXAEa = "spotify:artist:59a4SG6JBogxt0zx9UXAEa",
}

export interface Image {
    url: string;
    width: number;
    height: number;
}

export enum ReleaseDatePrecision {
    Day = "day",
}

export enum AlbumTypeEnum {
    Album = "album",
}

export interface ExternalIDS {
    isrc: string;
}

export enum IArtistsTopTrackType {
    Track = "track",
}
