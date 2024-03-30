import { api } from "@/api"
import { Track } from "@/api"
import { playTrack, useAppDispatch, useAppSelector } from "@/redux/store"
import { HTMLProps, useState } from "preact/compat"
import Like from "./Like"
import { useSelector } from "react-redux"

type TrackCardProps = {
    track: Track
    addButton?: boolean
} & HTMLProps<HTMLDivElement>

const toMinSec = (ms?: number) => {

    if (!ms) {
        return undefined
    }
    const min = Math.floor((ms / 1000 / 60) << 0)
    const sec = Math.floor((ms / 1000) % 60)

    return `${min}:${sec < 10 ? '0' + sec : sec}`
}


const TrackCard = (props: TrackCardProps) => {

    const { track } = props
    const dispatch = useAppDispatch()

    const trackFromState = useAppSelector(state => state.library.songs.find(t => t.uuid === track.uuid))

    const liked =  trackFromState ? trackFromState.liked === true ? true : false : false

    return (
        <div class={`w-full flex flex-row justify-start items-center gap-3  ${props.class}`}>
            {track.album ?
                <img onClick={() => dispatch(playTrack(track))} class="w-12 h-12 rounded-md cursor-pointer" src={api.urlForTrackCoverById({ id: track.album.uuid })} /> :
                <div class="w-12 h-12 rounded-md bg-fuchsia-100 bg-opacity-40" />}

            <div class='w-full flex justify-between items-center'>
                <div onClick={() => dispatch(playTrack(track))} class='cursor-pointer' >
                    <div class="text-start text-white text-base font-normal capitalize">{track.title}</div>
                    <div class="text-stasrt text-white text-opacity-60 text-sm font-normal capitalize">{track.band.name}</div>
                </div>

                <div class='flex items-center gap-3'>
                    {props.addButton && !track.liked && !liked && <Like entity={track} />}

                    <span class='test-white text-[14px] opacity-50'>
                        {toMinSec(track.lengthInMilliseconds)}
                    </span>

                </div>

            </div>


        </div>
    )
}

export default TrackCard