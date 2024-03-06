import { api } from "@/api"
import { Track } from "@/pieTunesApi"

type TrackCard = {
    track: Track
}

const TrackCard = ({ track }: TrackCard) => {
    return (
        <div class="w-full flex flex-row justify-start items-center gap-3">
            <img class="w-12 h-12 rounded-md" src={api.forTrackCover(track.uuid)} />
            <div class="text-start text-white text-base font-normal capitalize">{track.title}</div>
            <div class="text-start text-white text-opacity-60 text-sm font-normal capitalize">{track.musicBand.name}</div>
        </div>
    )
}

export default TrackCard