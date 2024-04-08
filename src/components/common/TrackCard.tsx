import { api } from "@/api"
import { Track } from "@/api"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import Like from "./Like"
import { toMinSec, trancate } from "@/utils/hellpers"
import { playTrack } from "@/redux/slices/playerSlice"

type TrackCardProps = {
    track: Track
    addButton?: boolean
    class?: string
}



const TrackCard = (props: TrackCardProps) => {

    const { track } = props

    const dispatch = useAppDispatch()

    const trackFromState = useAppSelector(state => state.library.songs.all.find(t => t.uuid === track.uuid))

    const liked = trackFromState ? trackFromState.liked === true ? true : false : false

    const queue = useAppSelector(state => state.library.songs.all)
    const currentTrack = useAppSelector(state => state.player.queue.currentTrack)


    const onClick = () => dispatch(playTrack({ track, continuePlaybackWithTracks: queue }))

    return (
        <div class={`w-full flex flex-row justify-start items-center gap-3 p-1 rounded-md ${props.class} ${currentTrack?.uuid === track.uuid ? 'border-white border-[0.4px] border-opacity-20 !bg-white !bg-opacity-15' : ''}`}>
            {track.album ?
                <img onClick={onClick} class="w-12 h-12 rounded-md cursor-pointer" src={api.urlForTrackCoverById({ id: track.album.uuid })} /> :
                <div class="w-12 h-12 rounded-md bg-fuchsia-100 bg-opacity-40" />}

            <div class='w-full flex items-center justify-between overflow-hidden'>
                <div onClick={onClick} class='w-4/5 flex flex-col cursor-pointer truncate' >
                    <div class="text-start text-white text-base font-normal capitalize truncate">{track.title}</div>
                    <div class="text-start text-white text-opacity-60 text-sm font-normal capitalize truncate">{track.band ? track.band.name : 'Band Name'}</div>
                </div>

                <div class={`flext ${props.addButton ? 'min-w-20' : 'max-w-10'} items-center w-14 flex justify-between gap-3 pr-2`}>
                    {props.addButton && !track.liked && !liked && <Like track={track} />}

                    <span class='test-white text-[14px] opacity-50'>
                        {toMinSec(track.lengthInMilliseconds)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TrackCard