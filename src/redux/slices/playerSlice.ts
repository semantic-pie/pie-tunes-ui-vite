import { Track } from "@/api"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

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
            if (!state.queue.currentTrackIndex || state.queue.tracks.length <= 1) return

            const prevTrackIndexInQueue = state.queue.currentTrackIndex - 1

            if (prevTrackIndexInQueue < 0 || prevTrackIndexInQueue >= state.queue.tracks.length) return

            state.queue.currentTrackIndex = prevTrackIndexInQueue
            state.queue.currentTrack = state.queue.tracks[prevTrackIndexInQueue]
        },
        playNextQueueTrack: (state) => {
            if (!state.queue.currentTrackIndex || state.queue.tracks.length <= 1) return

            const nextTrackIndexInQueue = state.queue.currentTrackIndex + 1

            if (nextTrackIndexInQueue < 0 || nextTrackIndexInQueue >= state.queue.tracks.length) return

            state.queue.currentTrackIndex = nextTrackIndexInQueue
            state.queue.currentTrack = state.queue.tracks[nextTrackIndexInQueue]
        }
    }
})

export const { playNextQueueTrack, playPrevQueueTrack, playTrack, pushBackToQueue, pushForwardToQueue, setQueueTracks } = playerSlice.actions
