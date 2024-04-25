import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserTopsArtists, Itoken } from "../models/api";
export const userAPI = createApi({
    reducerPath: "curentUserSpotify",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.spotify.com/" }),
    endpoints: (build) => ({
        fetchCurentUser: build.query<IUser, Itoken>({
            query: (token: Itoken) => ({
                url: "v1/me",
                params: {
                    // add more in end (?_limit)
                    //_limit: limit
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),
        fetchCurentUserTopArtists: build.query<
            IUserTopsArtists,
            { token: Itoken; countOfRequests: number }
        >({
            query: ({ token, countOfRequests = 0 }: { token: Itoken; countOfRequests: number }) => ({
                url: "v1/me/top/artists",
                params: {
                    offset: countOfRequests,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});
