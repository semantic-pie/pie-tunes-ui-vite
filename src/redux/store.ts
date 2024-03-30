import { MusicAlbum, MusicBand, SearchResult, Track } from "@/api"
import { pieApiClient } from "@/api/client"
import { userUuid } from "@/appConfiguration"
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

interface PlayerSlice {
    numberInQueue?: number
    currentTrack?: Track
    queue: Track[]
    search: {
        songs: Track[]
        albums: MusicAlbum[]
        bands: MusicBand[]
    }
    library: {
        songsPages: number
        songs: Track[]
        searchSongs: Track[],
        artists: MusicBand[]
        searchArtists: MusicBand[]
        artistsPages: number
        albums: MusicAlbum[]
        searchAlbums: MusicAlbum[]
        albumsPages: number
    }
}

export const ENTITY_PER_PAGE = 15

const initialState = {
    numberInQueue: undefined,
    currentTrack: undefined,
    queue: [],
    search: {
        songs: [],
        albums: [],
        bands: []
    },
    library: {
        songsPages: 0,
        songs: [],
        searchSongs: [],
        artists: [],
        searchArtists: [],
        artistsPages: 0,
        albums: [],
        searchAlbums: [],
        albumsPages: 0,
    }
} as PlayerSlice

export const searchTracksFetch = (query: string) => async (dispatch: AppDispatch) => {
    pieApiClient.findTrackByTitle({ page: 0, limit: 10, query, userUuid })
        .then(({ data }) => dispatch(searchSongs(data)))
}

export const searchAlbumsFetch = (query: string) => async (dispatch: AppDispatch) => {
    pieApiClient.findAlbumsByTitle({ page: 0, limit: 10, query, userUuid })
        .then(({ data }) => dispatch(searchAlbums(data)))
}


export const fetchToLike = (track_uuid: string) => async (dispatch: AppDispatch) => {
    pieApiClient.postEvent({type: 'LIKE_TRACK', track_uuid, user_uuid: userUuid})
        .then(({}) =>  dispatch(like(track_uuid)))
}

export const fetchToUnlike = (track_uuid: string) => async (dispatch: AppDispatch) => {
    pieApiClient.postEvent({type: 'REMOVE_LIKE', track_uuid, user_uuid: userUuid})
        .then(({}) =>  dispatch(like(track_uuid)))
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        like: (state, action: PayloadAction<string>) => {
            state.search.songs = state.search.songs.map(s => s.uuid === action.payload ? {...s, liked: true} : s )
        },
        unlike: (state, action: PayloadAction<string>) => {
            // const track = state.queue.find(t => t.uuid === action.payload)
            // if (track) {
            //     track.liked = false
            //     state.queue = [...state.queue.filter(t => t.uuid !== track.uuid), track].sort((o1, o2) => o1.title.localeCompare(o2.title))
            // }
        },
        playTrack: (state, action: PayloadAction<Track>) => {
            state.currentTrack = action.payload
            state.numberInQueue = state.queue.findIndex((t) => t.uuid === action.payload.uuid)
        },
        addTrackToQueue: (state, action: PayloadAction<Track>) => {
            const temp = state.queue.filter(t => t.uuid !== action.payload.uuid)
            state.queue = [...temp, action.payload]
        },
        setQueue: (state, action: PayloadAction<Track[]>) => {
            if (action.payload.length > 0) {
                state.queue = [...action.payload].sort((o1, o2) => o1.title.localeCompare(o2.title))
                state.numberInQueue = 0
                state.currentTrack = state.queue[0]
            }
        },
        loadNextPage: (state) => {
            state.library.songsPages++
        },
        loadNextPageArtists: (state) => {
            console.log('next artists page')
            state.library.artistsPages++
        },
        loadNextPageAlbums: (state) => {
            state.library.albumsPages++
        },
        searchSongs: (state, action: PayloadAction<Track[]>) => {
            if (action.payload.length > 0) {
                state.library.searchSongs = action.payload
            } else {
                state.library.searchSongs = []
            }
        },
        searchAlbums: (state, action: PayloadAction<MusicAlbum[]>) => {
            if (action.payload.length > 0) {
                state.library.searchAlbums = action.payload
            } else {
                state.library.searchAlbums = []
            }
        },
        search: (state, action: PayloadAction<SearchResult>) => {
            state.search.songs = action.payload.tracks
            state.search.albums = action.payload.albums
            state.search.bands = action.payload.bands
        },
        tracks: (state, action: PayloadAction<Track[]>) => {
            if (action.payload.length > 0) {
                state.library.songs = [...state.library.songs, ...action.payload]
                state.queue = state.library.songs
            }
        },
        artists: (state, action: PayloadAction<MusicBand[]>) => {
            if (action.payload.length > 0) {
                state.library.artists = [...state.library.artists, ...action.payload]
                state.queue = state.library.songs
            }
        },
        albums: (state, action: PayloadAction<MusicAlbum[]>) => {
            if (action.payload.length > 0) {
                state.library.albums = [...state.library.albums, ...action.payload]
                state.queue = state.library.songs
            }
        },

        prev: (state) => {
            if (state.currentTrack && state.numberInQueue != undefined) {
                if (state.numberInQueue > 0)
                    state.numberInQueue -= 1
                state.currentTrack = state.queue[state.numberInQueue]
            }
        },
        next: (state) => {
            if (state.currentTrack && state.numberInQueue != undefined) {
                if (state.numberInQueue < state.queue.length)
                    state.numberInQueue += 1
                state.currentTrack = state.queue[state.numberInQueue]
            }
        }
    }
})

export const { playTrack, addTrackToQueue, setQueue, albums, artists, next, prev, like, unlike, loadNextPage, loadNextPageAlbums, loadNextPageArtists, tracks, search, searchSongs, searchAlbums } = playerSlice.actions

// types configuration
export const store = configureStore({ reducer: playerSlice.reducer })
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector