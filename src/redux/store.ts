import { LikeTrackBody, MusicAlbum, MusicBand, Track, api } from "@/api"
import { PayloadAction, asyncThunkCreator, configureStore, createSlice } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

interface PlayerSlice {
    numberInQueue?: number
    currentTrack?: Track
    queue: Track[]
    artists: MusicBand[]
    albums: MusicAlbum[]
}

const initialState = {
    numberInQueue: undefined,
    currentTrack: undefined,
    queue: [],
    albums: [],
    artists: []
} as PlayerSlice

export const fetchToLike = (track_uuid: string) => async (dispatch: AppDispatch) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const user_uuid = '768b9113-5036-40c6-a440-127fc054337a'
    await fetch(api.forLike(), {method: 'POST', headers, body: JSON.stringify({type: "LIKE_TRACK", track_uuid, user_uuid})})
    dispatch(like(track_uuid))
  }

export const fetchToUnlike = (track_uuid: string) => async (dispatch: AppDispatch) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const user_uuid = '768b9113-5036-40c6-a440-127fc054337a'
    await fetch(api.forLike(), {method: 'POST', headers, body: JSON.stringify({type: "REMOVE_LIKE", track_uuid, user_uuid})})
    dispatch(unlike(track_uuid))
  }


const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        like: (state, action: PayloadAction<string>) => {
            const track = state.queue.find(t => t.uuid === action.payload)
            if (track) {
                track.isLiked = true
                state.queue = [...state.queue.filter(t => t.uuid !== track.uuid), track].sort((o1,o2) => o1.title.localeCompare(o2.title))
            }
        },
        unlike: (state, action: PayloadAction<string>) => {
            const track = state.queue.find(t => t.uuid === action.payload)
            if (track) {
                track.isLiked = false
                state.queue = [...state.queue.filter(t => t.uuid !== track.uuid), track].sort((o1,o2) => o1.title.localeCompare(o2.title))
            }
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
                state.queue = [...action.payload].sort((o1,o2) => o1.title.localeCompare(o2.title))
                state.numberInQueue = 0
                state.currentTrack = state.queue[0]
            }
        },
        artists: (state, action: PayloadAction<MusicBand[]>) => {
            if (action.payload.length > 0) {
                state.artists = action.payload
            }
        },
        albums: (state, action: PayloadAction<MusicAlbum[]>) => {
            if (action.payload.length > 0) {
                state.albums = action.payload
            }
        },

        prev: (state) => {
            if (state.currentTrack && state.numberInQueue != undefined) {
                if (state.numberInQueue > 0)
                    state.numberInQueue -= 1
                state.currentTrack = state.queue[state.numberInQueue]
                console.log('play prev track: ', state.currentTrack)
            }
        },
        next: (state) => {
            if (state.currentTrack && state.numberInQueue != undefined) {
                if (state.numberInQueue < state.queue.length)
                    state.numberInQueue += 1
                state.currentTrack = state.queue[state.numberInQueue]
                console.log('play next track: ', state.currentTrack)
            }
        }
    }
})

export const { playTrack, addTrackToQueue, setQueue, albums, artists, next, prev, like, unlike } = playerSlice.actions

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