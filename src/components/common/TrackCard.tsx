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

    const onClick = () => dispatch(playTrack({ track, continuePlaybackWithTracks: queue }))

    return (
        <div class={`w-full flex flex-row justify-start items-center gap-3  ${props.class}`}>
            {track.album ?
                <img onClick={onClick} class="w-12 h-12 rounded-md cursor-pointer" src={api.urlForTrackCoverById({ id: track.album.uuid })} /> :
                <div class="w-12 h-12 rounded-md bg-fuchsia-100 bg-opacity-40" />}

            <div class='w-full  flex justify-between items-center truncate'>
                <div onClick={onClick} class='cursor-pointer' >
                    <div class="text-start text-white text-base text-nowrap font-normal capitalize">{trancate(track.title, 28)}</div>
                    <div class="text-start text-white text-opacity-60 text-sm font-normal capitalize">{track.band ? trancate(track.band.name, 28) : 'Band Name'}</div>
                </div>

                <div class='flex items-center gap-3 pr-2'>
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