import { MusicAlbum, MusicBand, Playlist, Track } from "@/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PieApiResponse, pieApiClient } from "@/api/client"
import { RootState } from "../store"
import { CONSTANTS } from "@/appConfiguration"
import { fetchForLike } from "./userSlice"

interface DataSlice {
    songs: {
        page: number
        all: Track[]
        searched: Track[]
    },
    bands: {
        page: number
        all: MusicBand[]
    },
    albums: {
        page: number
        all: MusicAlbum[]
    },
    playlist: {
        madeForYou: {
            all: Playlist[]
        }
    },
}

const initialState: DataSlice = {
    songs: {
        all: [],
        searched: [],
        page: 0
    },
    bands: {
        all: [],
        page: 0
    },
    albums: {
        all: [],
        page: 0
    },
    playlist: {
        madeForYou: {
            all: []
        }
    }
}

const limit = CONSTANTS.ENTITY_PER_PAGE


export const fetchForTrackSearchByTitle = createAsyncThunk<PieApiResponse<Track[]>, { query: string }, { state: RootState }>(
    'data/fetchForTrackSearchByTitle',
    async ({ query }, { getState }) => {
        const state = getState()
        return pieApiClient.findTrackByTitle({ page: state.library.songs.page, limit, query })
    }
)


export const fetchNextSongsPage = createAsyncThunk<PieApiResponse<Track[]>, void, { state: RootState }>(
    'data/fetchNextSongsPage',
    async (_args, { getState }) => {
        const state = getState()
        return pieApiClient.findTrackByDate({ page: state.library.songs.page, limit, order: "desc" })
    }
)

export const fetchNextAlbumsPage = createAsyncThunk<PieApiResponse<MusicAlbum[]>, void, { state: RootState }>(
    'data/fetchNextAlbumsPage',
    async (_args, { getState }) => {
        const state = getState()
        const page = state.library.albums.page === 0 ? 0 : state.library.albums.page
        // return pieApiClient.findAlbumsByDate({ page, limit, userUuid: getState().user.userUuid })
        return pieApiClient.findAlbumsDeprecated({ page, limit, query: 'ignore' })
    }
)

export const fetchNextBandsPage = createAsyncThunk<PieApiResponse<MusicBand[]>, void, { state: RootState }>(
    'data/fetchNextBandsPage',
    async (_args, { getState }) => {
        const state = getState()
        const page = state.library.albums.page === 0 ? 0 : state.library.albums.page 
        // return pieApiClient.findArtistsByDate({ page, limit, userUuid: getState().user.userUuid })
        return pieApiClient.findArtistsDeprecated({ page, limit, query: 'ignore' })
    }
)

export const fetchPlaylists = createAsyncThunk<PieApiResponse<Playlist[]>, void>(
    'data/fetchPlaylists',
    async (_args) => pieApiClient.findPlaylistsByDate({ userUuid: '' })
)



export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // addEntity: (state, action: PayloadAction<FetchLikeProps>) => {
        //     const track = action.payload.track
        //     const album = action.payload.album
        //     const band = action.payload.band
        //     if (track) {
        //         state.songs.all = [track, ...state.songs.all]
        //     }
        // }
    },
    extraReducers(builder) {
        builder.addCase(fetchNextSongsPage.fulfilled, (state, action) => {
            state.songs.all = [...state.songs.all, ...action.payload.data]
            state.songs.page += 1
        })
        builder.addCase(fetchNextAlbumsPage.fulfilled, (state, action) => {
            state.albums.all = [...state.albums.all, ...action.payload.data]
            state.albums.page += 1
        })
        builder.addCase(fetchNextBandsPage.fulfilled, (state, action) => {
            state.bands.all = [...state.bands.all, ...action.payload.data]
            state.bands.page += 1
        })
        builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
            state.playlist.madeForYou.all = [...state.playlist.madeForYou.all, ...action.payload.data]
        })
        builder.addCase(fetchForLike.fulfilled, (state, action) => {
            const track = action.payload.track
            const album = action.payload.album
            const band = action.payload.band
            if (track) {
                state.songs.all = [{...track, isLiked: true }, ...state.songs.all.filter(t => t.uuid !== track.uuid)]
            }
        })
    }
})
