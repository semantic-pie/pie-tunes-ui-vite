import { Track } from "@/api"
import { logAndPipe, responseToObject } from "@/utils/hellpers"
import { useEffect } from "preact/hooks"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import { api } from "@/api"
import { setQueue, useAppDispatch, useAppSelector } from "@/redux/store"


export const useCurrentPlaylist = () => {
    const dispatch = useAppDispatch()
    const tracks = useAppSelector(state => state.queue);

    const currentTrack = useAppSelector(state => state.currentTrack)

    const { load, seek, volume, setVolume } = useGlobalAudioPlayer();


    const setStartTrack = (tracks: Track[]) => {
        if (tracks.length > 0) dispatch(setQueue(tracks))
        return tracks
    }

    useEffect(() => {
        if (currentTrack) {
            load(api.forTrackStream(currentTrack.uuid), {
                html5: true,
                format: 'mp3',
                autoplay: true
            })
        }
    }, [currentTrack])


    useEffect(() => {
        fetch(api.forTracks())
            .then(responseToObject)
            .then(logAndPipe)
            .then(setStartTrack)
    }, [])

    return {
        currentTrack,
        trackList: tracks,
        seek,
        volume,
        setVolume
    }
}