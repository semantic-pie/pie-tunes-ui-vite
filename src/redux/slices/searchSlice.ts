import { MusicAlbum, MusicBand, SearchResult, Track } from "@/api"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PieApiResponse, SnoopySearchTrackExtended, SnoopyTrackStatus, pieApiClient } from "@/api/client"
import { fetchForLike, fetchForUnlike } from "./userSlice"

interface SearchSlice {
    result: {
        songs: Track[]
        albums: MusicAlbum[]
        bands: MusicBand[]
    },
    snoopy: {
        result: SnoopySearchTrackExtended[]
    }

}

const initialState: SearchSlice = {
    result: {
        songs: [],
        albums: [],
        bands: []
    },
    snoopy: {
        result: []
    }
}

type Query = {
    query: string,
    controller?: AbortController
}

export const fetchForGlobalSearch = createAsyncThunk<PieApiResponse<SearchResult>, Query>(
    'search/fetchForGlobalSearch',
    async ({ query, controller }) => pieApiClient.searchByTitle({ query, controller })
)

export const fetchForSnoopySearch = createAsyncThunk(
    'search/fetchForSnoopySearch',
    async ({ query }: { query: string }) => pieApiClient.searchSnoopy({ q: query })
)

type FetchForSnoopyDownloadProps = { query: string, id: string }

export const fetchForSnoopyDownload = createAsyncThunk<unknown, FetchForSnoopyDownloadProps>(
    'search/fetchForSnoopyDownload',
    async ({ query, id }, { dispatch, rejectWithValue, }) => {
        dispatch(setSnoopyTrackStatus({ id, status: SnoopyTrackStatus.IN_PROCESS }))
        return pieApiClient.uploadSnoopy({ query })
            .then(response => {
                if (response.meta.status === 200) {
                    dispatch(setSnoopyTrackStatus({ id, status: SnoopyTrackStatus.SUCCESSFULLY }))
                    return response.data.uploadedTrack.uuid
                }
                else {
                    dispatch(setSnoopyTrackStatus({ id, status: SnoopyTrackStatus.FAILED }))
                    throw rejectWithValue(response.meta.status)
                }
            })
            .then(addedTrackUuid => pieApiClient.findTrackByUuid({ uuid: addedTrackUuid }))
            .then(response => dispatch(addTrackToSearchResult(response.data)))
    }
)

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSnoopySearch: (state) => {
            state.snoopy.result = []
        },
        setSnoopyTrackStatus: (state, action: PayloadAction<{ id: string, status: SnoopyTrackStatus }>) => {
            state.snoopy.result = state.snoopy.result.map(track => track.id === action.payload.id ? { ...track, status: action.payload.status } : track)
        },
        addTrackToSearchResult: (state, action: PayloadAction<Track>) => {
            state.result.songs = [action.payload, ...state.result.songs]
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchForGlobalSearch.fulfilled, (state, action) => {
            const { tracks, albums, bands } = action.payload.data

            state.result.songs = tracks
            state.result.albums = albums
            state.result.bands = bands
        })
        builder.addCase(fetchForSnoopySearch.fulfilled, (state, action) => {
            state.snoopy.result = action.payload.data
        })
        builder.addCase(fetchForLike.fulfilled, (state, action) => {
            const track = action.payload.track
            const album = action.payload.album
            const band = action.payload.band
            if (track) {
                state.result.songs = state.result.songs.map(song => song.uuid === track.uuid ? { ...song, isLiked: true } : song)
            }
            if (album) {
                state.result.albums = state.result.albums.map(a => a.uuid === album.uuid ? {...a, isLiked: true} : a ) 
            }
            if (band) {
                state.result.bands = state.result.bands.map(b => b.uuid === band.uuid ? {...b, isLiked: true} : b ) 
            }
        })
        builder.addCase(fetchForUnlike.fulfilled, (state, action) => {
            const track = action.payload.track
            const album = action.payload.album
            const band = action.payload.band
            if (track) {
                state.result.songs = state.result.songs.map(song => song.uuid === track.uuid ? { ...song, isLiked: false } : song)
            }
            if (album) {
                state.result.albums = state.result.albums.map(a => a.uuid === album.uuid ? {...a, isLiked: false} : a ) 
            }
            if (band) {
                state.result.bands = state.result.bands.map(b => b.uuid === band.uuid ? {...b, isLiked: false} : b ) 
            }
            
        })
    },
})

export const { setSnoopyTrackStatus, addTrackToSearchResult, clearSnoopySearch } = searchSlice.actions
