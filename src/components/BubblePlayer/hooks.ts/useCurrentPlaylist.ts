import { Track } from "@/api"
import { logAndPipe, responseToObject } from "@/utils/hellpers"
import { useEffect } from "preact/hooks"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import { api } from "@/api"
import { setQueue, useAppDispatch, useAppSelector } from "@/redux/store"


export const useCurrentPlaylist = () => {
    // const dispatch = useAppDispatch()
    const tracks = useAppSelector(state => state.queue);

    const currentTrack = useAppSelector(state => state.currentTrack)

    const { seek, volume, setVolume } = useGlobalAudioPlayer();


    // const setStartTrack = (tracks: Track[]) => {
    //     if (tracks.length > 0) dispatch(setQueue(tracks))
    //     return tracks
    // }

    // useEffect(() => {
    //     fetch(api.forTracks({page: 0, limit: 1000}))
    //         .then(responseToObject)
    //         .then(logAndPipe)
    //         .then(setStartTrack)
    // }, [])

    return {
        currentTrack,
        trackList: tracks,
        seek,
        volume,
        setVolume
    }
}