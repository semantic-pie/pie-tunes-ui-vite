import { Track } from "@/api"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchForLike, fetchForUnlike } from "./userSlice"

interface PlayerSlice {
    queue: {
        currentTrack?: Track,
        currentTrackIndex?: number,
        tracks: Track[]
    }
}

const initialState: PlayerSlice = {
    queue: {
        currentTrack: undefined,
        currentTrackIndex: undefined,
        tracks: []
    }
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        // start play track and set player queue
        playTrack: (state, action: PayloadAction<{ track: Track, continuePlaybackWithTracks?: Track[] }>) => {
            state.queue.currentTrack = action.payload.track

            if (action.payload.continuePlaybackWithTracks) {
                state.queue.currentTrackIndex = action.payload.continuePlaybackWithTracks.findIndex(track => track.uuid === action.payload.track.uuid)
                state.queue.tracks = [...action.payload.continuePlaybackWithTracks]
            }
        },
        // 
        pushForwardToQueue: (state, action: PayloadAction<Track>) => {
            state.queue.tracks = [action.payload, ...state.queue.tracks.filter(t => t.uuid !== action.payload.uuid)]
        },
        pushBackToQueue: (state, action: PayloadAction<Track>) => {
            state.queue.tracks = [...state.queue.tracks.filter(t => t.uuid !== action.payload.uuid), action.payload]
        },
        setQueueTracks: (state, action: PayloadAction<Track[]>) => {
            state.queue.tracks = action.payload
        },
        playPrevQueueTrack: (state) => {
            if (state.queue.currentTrackIndex === undefined || state.queue.tracks.length <= 1) return

            const prevTrackIndexInQueue = state.queue.currentTrackIndex - 1

            if (prevTrackIndexInQueue < 0 || prevTrackIndexInQueue >= state.queue.tracks.length) return

            state.queue.currentTrackIndex = prevTrackIndexInQueue
            state.queue.currentTrack = state.queue.tracks[prevTrackIndexInQueue]
        },
        playNextQueueTrack: (state) => {
            console.log(state.queue.currentTrackIndex)
            console.log(state.queue.tracks.length)
            if (state.queue.currentTrackIndex === undefined || state.queue.tracks.length <= 1) return
            console.log(2)
            const nextTrackIndexInQueue = state.queue.currentTrackIndex + 1
            console.log(3)
            if (nextTrackIndexInQueue < 0 || nextTrackIndexInQueue >= state.queue.tracks.length) return
            console.log(4)
            state.queue.currentTrackIndex = nextTrackIndexInQueue
            state.queue.currentTrack = state.queue.tracks[nextTrackIndexInQueue]
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchForUnlike.fulfilled, (state, action) => {
            const track = action.payload.track
            const album = action.payload.album
            const band = action.payload.band
            if (track) {
                if (track.uuid === state.queue.currentTrack?.uuid) state.queue.currentTrack.isLiked = false
                
                state.queue.tracks = state.queue.tracks.map(s => s.uuid === track.uuid ? {...s, isLiked: false} : s)   
            }
        })
        builder.addCase(fetchForLike.fulfilled, (state, action) => {
            const track = action.payload.track
            const album = action.payload.album
            const band = action.payload.band
            if (track) {
                if (track.uuid === state.queue.currentTrack?.uuid) state.queue.currentTrack.isLiked = true
                
                state.queue.tracks = state.queue.tracks.map(s => s.uuid === track.uuid ? {...s, isLiked: true} : s)   
            }
        })
    }

})

export const { playNextQueueTrack, playPrevQueueTrack, playTrack, pushBackToQueue, pushForwardToQueue, setQueueTracks } = playerSlice.actions
