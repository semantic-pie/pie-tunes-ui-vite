import { MusicAlbum, MusicBand, Playlist, Track } from "@/api"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PieApiResponse, pieApiClient } from "@/api/client"
import { RootState } from "../store"
import { CONSTANTS } from "@/appConfiguration"
import { fetchForLike, fetchForUnlike } from "./userSlice"

interface DataSlice {
    songs: {
        page: number
        all: Track[]
        searched: Track[]
    },
    bands: {
        page: number
        all: MusicBand[]
        currentOpen?: MusicBand
    },
    albums: {
        page: number
        all: MusicAlbum[]
        currentOpen?: MusicAlbum
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
        page: 0,
        currentOpen: undefined
    },
    albums: {
        all: [],
        page: 0,
        currentOpen: undefined
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
        const result = await pieApiClient.findTrackByTitle({ page: 0, limit, query})
        console.log('serached: ', result)
        return result
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
        return pieApiClient.findAlbumsByDate({ page, limit, order: 'desc' })
    }
)

export const fetchNextBandsPage = createAsyncThunk<PieApiResponse<MusicBand[]>, void, { state: RootState }>(
    'data/fetchNextBandsPage',
    async (_args, { getState }) => {
        const state = getState()
        const page = state.library.bands.page === 0 ? 0 : state.library.bands.page 
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
        currentOpenAlbum: (state, action: PayloadAction<{album: MusicAlbum}>) => {
            state.albums.currentOpen = action.payload.album
        },
        currentOpenBand: (state, action: PayloadAction<{band: MusicBand}>) => {
            state.bands.currentOpen = action.payload.band
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchNextSongsPage.fulfilled, (state, action) => {
            state.songs.all = [...state.songs.all, ...action.payload.data.map(t => ({...t, isLiked: true}))] //
            state.songs.page += 1
        })
        builder.addCase(fetchNextAlbumsPage.fulfilled, (state, action) => {
            state.albums.all = [...state.albums.all, ...action.payload.data.map(t => ({...t, isLiked: true}))]
            state.albums.page += 1
        })
        builder.addCase(fetchNextBandsPage.fulfilled, (state, action) => {
            state.bands.all = [...state.bands.all, ...action.payload.data.map(t => ({...t, isLiked: true}))]
            state.bands.page += 1
        })
        builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
            state.playlist.madeForYou.all = [...state.playlist.madeForYou.all, ...action.payload.data]
        })
        builder.addCase(fetchForTrackSearchByTitle.fulfilled, (state, action) => {
            state.songs.searched = action.payload.data
        })
        builder.addCase(fetchForLike.fulfilled, (state, action) => {
            const track = action.payload.track
            const album = action.payload.album
            const band = action.payload.band
            if (track) {
                state.songs.all = [{...track, isLiked: true }, ...state.songs.all.filter(t => t.uuid !== track.uuid)]
                if (state.songs.searched.length > 0) {
                    state.songs.searched = state.songs.searched.map(t => t.uuid === track.uuid ? {...t, isLiked: true} : t )  
                }
            }
            if (album) {
                state.albums.all = [{...album, isLiked: true }, ...state.albums.all.filter(a => a.uuid !== album.uuid)]
                if (album.uuid === state.albums.currentOpen?.uuid) state.albums.currentOpen.isLiked = true
            }
            if (band) {
                state.bands.all = [{...band, isLiked: true }, ...state.bands.all.filter(b => b.uuid !== band.uuid)]
            }
        })
        builder.addCase(fetchForUnlike.fulfilled, (state, action) => {
            const track = action.payload.track
            const album = action.payload.album
            const band = action.payload.band
            if (track) {
                state.songs.all = state.songs.all.map(s => s.uuid === track.uuid ? {...s, isLiked: false} : s )
                if (state.songs.searched.length > 0) {
                    state.songs.searched = state.songs.searched.map(t => t.uuid === track.uuid ? {...t, isLiked: false} : t )  
                }
            }
            if (album) {
                state.albums.all = state.albums.all.map(a => a.uuid === album.uuid ? {...a, isLiked: false} : a ) 
                if (album.uuid === state.albums.currentOpen?.uuid) state.albums.currentOpen.isLiked = false
            }
            if (band) {
                state.bands.all = state.bands.all.map(b => b.uuid === band.uuid ? {...b, isLiked: false} : b ) 
            }
        })
    }
})

export const { currentOpenAlbum, currentOpenBand } = dataSlice.actions