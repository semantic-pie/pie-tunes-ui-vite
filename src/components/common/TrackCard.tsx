import { api } from "@/api"
import { Track } from "@/api"
import { playTrack, useAppDispatch } from "@/redux/store"
import { HTMLProps } from "preact/compat"

type TrackCardProps = {
    track: Track
} & HTMLProps<HTMLDivElement>

const toMinSec = (ms: number) => {
    const min = Math.floor((ms/1000/60) << 0)
    const sec = Math.floor((ms/1000) % 60)

    return `${min}:${sec < 10 ? '0' + sec : sec}`
} 


const TrackCard = (props: TrackCardProps) => {

    const { track } = props
    const dispatch = useAppDispatch()

    return (
        <div onClick={() => dispatch(playTrack(track))} class={`w-full flex flex-row justify-start items-center gap-3 cursor-pointer ${props.class}`}>
            {track.album ?
                <img class="w-12 h-12 rounded-md" src={api.urlForTrackCoverById({ id: track.album.uuid })} /> :
                <div class="w-12 h-12 rounded-md bg-fuchsia-100 bg-opacity-40" />}

            <div class='w-full flex justify-between items-center'>
                <div>
                    <div class="text-start text-white text-base font-normal capitalize">{track.title}</div>
                    <div class="text-stasrt text-white text-opacity-60 text-sm font-normal capitalize">{track.band.name}</div>
                </div>
                <span class='test-white text-[14px] opacity-50'>
                    {toMinSec(track.lengthInMilliseconds)}
                </span>
            </div>


        </div>
    )
}

export default TrackCard