import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    IAllPlaylists,
    IOtherUser,
    ITracks,
    IUser,
    IUserTopsArtists,
    Itoken,
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
                countOfRequests?: number;
                itemsPerRequest?: number;
                type: string;
            }
        >({
            query: ({
                token,
                id,
                countOfRequests = 0,
                itemsPerRequest = 20,
                type,
            }: {
                token: Itoken;
                id: string;
                countOfRequests?: number;
                itemsPerRequest?: number;
                type: string;
            }) => ({
                url: `v1/playlists/${id}/tracks `,
                params: {
                    offset: countOfRequests,
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
    }),
});
