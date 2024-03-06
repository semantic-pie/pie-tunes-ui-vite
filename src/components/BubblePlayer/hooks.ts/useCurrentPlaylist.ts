import { Track } from "@/pieTunesApi"
import { logAndPipe, responseToObject } from "@/utils/hellpers"
import { useEffect, useState } from "preact/hooks"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import useConditionalInterval from "./useConditionalInterval"
import { api } from "@/api"


export const useCurrentPlaylist = () => {
    const [trackNum, setTrackNum] = useState<number>(-1)
    const [tracks, setTracks] = useState<Track[]>([])
    const currentTrack = trackNum != -1 ? tracks[trackNum] : undefined

    const [time, setTime] = useState<number>()

    const { load, src, pause, play, playing, duration, getPosition, seek, volume, setVolume } = useGlobalAudioPlayer();

    useConditionalInterval(() => setTime(getPosition()), 200, currentTrack)

    const setStartTrack = (tracks: Track[]) => {
        if (tracks.length > 0) setTrackNum(0)
        else setTrackNum(-1)
        return tracks
    }

    useEffect(() => {
        if (currentTrack) {
            load(api.forTrackStream(currentTrack.uuid))
        }
    }, [currentTrack])


    useEffect(() => {
        fetch(api.forTracks())
            .then(responseToObject)
            .then(logAndPipe)
            .then(setStartTrack)
            .then(setTracks)
    }, [])

    const next = () => setTrackNum(prev => prev === (tracks.length - 1) ? prev : ++prev)

    const prev = () => setTrackNum(prev => prev === 0 ? prev : --prev)


    return {
        currentTrack,
        trackList: tracks,
        next,
        prev,
        pause,
        resume: play,
        src,
        seek,
        time,
        playing,
        duration, 
        volume, 
        setVolume
    }
}