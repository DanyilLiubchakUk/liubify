import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    IAllPlaylists,
    IArtistsTopTracks,
    IOtherUser,
    ISearch,
    ITracks,
    ITracksOfAlbum,
    IUser,
    IUserTopsArtists,
    Itoken,
    RecentyPlayedTracksData,
    Tfolder,
} from "../models/api";

export const userAPI = createApi({
    reducerPath: "curentUserSpotify",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.spotify.com/" }),
    endpoints: (build) => ({
        fetchCurentUser: build.query<IUser, Itoken>({
            query: (token: Itoken) => ({
                url: "v1/me",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),
        fetchCurentUserTopArtists: build.query<
            IUserTopsArtists,
            {
                token: Itoken;
                countOfOffsets?: number;
                itemsPerRequest?: number;
            }
        >({
            query: ({
                token,
                countOfOffsets = 0,
                itemsPerRequest = 20,
            }: {
                token: Itoken;
                countOfOffsets?: number;
                itemsPerRequest?: number;
            }) => ({
                url: "v1/me/top/artists",
                params: {
                    offset: countOfOffsets,
                    limit: itemsPerRequest,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),

        fetchCurentUsersPlaylistst: build.query<
            any,
            { token: Itoken; countOfOffsets: number; itemsPerRequest?: number }
        >({
            query: ({
                token,
                countOfOffsets = 0,
                itemsPerRequest = 100,
            }: {
                token: Itoken;
                countOfOffsets?: number;
                itemsPerRequest?: number;
            }) => ({
                url: "v1/me/playlists",
                params: {
                    offset: countOfOffsets,
                    limit: itemsPerRequest,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),
        fetchFolderByID: build.query<
            IAllPlaylists,
            { token: Itoken; id: string; type: Tfolder }
        >({
            query: ({
                token,
                id,
                type,
            }: {
                token: Itoken;
                id: string;
                type: Tfolder;
            }) => ({
                url: `v1/${type}s/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),
        fetchPlaylistTracksByID: build.query<
            ITracks,
            {
                token: Itoken;
                id: string;
                countOfOffsets?: number;
                itemsPerRequest?: number;
            }
        >({
            query: ({
                token,
                id,
                countOfOffsets = 0,
                itemsPerRequest = 15,
            }: {
                token: Itoken;
                id: string;
                countOfOffsets?: number;
                itemsPerRequest?: number;
            }) => ({
                url: `v1/playlists/${id}/tracks`,
                params: {
                    offset: countOfOffsets,
                    limit: itemsPerRequest,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),
        fetchUserByID: build.query<IOtherUser, { token: Itoken; id: string }>({
            query: ({ token, id }: { token: Itoken; id: string }) => ({
                url: `v1/users/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),
        fetchTopTracksOfArtistByID: build.query<
            { tracks: IArtistsTopTracks[] },
            {
                token: Itoken;
                id: string;
            }
        >({
            query: ({ token, id }: { token: Itoken; id: string }) => ({
                url: `v1/artists/${id}/top-tracks`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),
        fetchAlbumTracksByID: build.query<
            ITracksOfAlbum,
            {
                token: Itoken;
                id: string;
                countOfOffsets?: number;
                itemsPerRequest?: number;
            }
        >({
            query: ({
                token,
                id,
                countOfOffsets = 0,
                itemsPerRequest = 15,
            }: {
                token: Itoken;
                id: string;
                countOfOffsets?: number;
                itemsPerRequest?: number;
            }) => ({
                url: `v1/albums/${id}/tracks`,
                params: {
                    offset: countOfOffsets,
                    limit: itemsPerRequest,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),
        fetchRecentyPlayedTracks: build.query<RecentyPlayedTracksData, Itoken>({
            query: (token: Itoken) => ({
                url: "v1/me/player/recently-played",
                params: {
                    limit: 50,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),
        fetchSearch: build.query<
            ISearch,
            {
                token: Itoken;
                types: string[];
                query: string;
            }
        >({
            query: ({
                token,
                types,
                query,
            }: {
                token: Itoken;
                types: string[];
                query: string;
            }) => ({
                url: `v1/search`,
                params: {
                    type: types.join(",").toLocaleLowerCase(),
                    q: query,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});
