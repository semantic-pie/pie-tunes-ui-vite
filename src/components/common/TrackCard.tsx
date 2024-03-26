import { api } from "@/api"
import { Track } from "@/api"
import { playTrack, useAppDispatch } from "@/redux/store"
import { HTMLProps } from "preact/compat"

type TrackCardProps = {
    track: Track
} & HTMLProps<HTMLDivElement>

const TrackCard = (props: TrackCardProps) => {

    const { track } = props
    const dispatch = useAppDispatch()

    return (
        <div onClick={() => dispatch(playTrack(track))} class={`w-full flex flex-row justify-start items-center gap-3 cursor-pointer ${props.class}`}>
            {track.musicAlbum ?
                <img class="w-12 h-12 rounded-md" src={api.urlForTrackCoverById({ id: track.musicAlbum.uuid })} /> :
                <div class="w-12 h-12 rounded-md bg-fuchsia-100 bg-opacity-40" />}

            <div class="text-start text-white text-base font-normal capitalize">{track.title}</div>
            <div class="text-stasrt text-white text-opacity-60 text-sm font-normal capitalize">{track.musicBand.name}</div>
        </div>
    )
}

export default TrackCard