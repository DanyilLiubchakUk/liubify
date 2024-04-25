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

export enum Type {
    Artist = "artist",
}
