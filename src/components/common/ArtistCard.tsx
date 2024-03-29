import { MusicBand, api } from "@/api"
import { useAppSelector } from "@/redux/store"

type ArtistCardProps = {
    band: MusicBand
}

const ArtistCard = (props: ArtistCardProps) => {
    const tracks = useAppSelector(state => state.queue)
    const track = tracks.find(t => t.band.uuid === props.band.uuid)
    
    return (
        <div class="flex flex-shrink-0 gap-3 sm:flex-col cursor-pointer">
            <img class='w-20 h-20 sm:w-52 sm:h-52 rounded-md overflow-hidden bg-slate-200 bg-opacity-15' src={ track ? api.urlForTrackCoverById({id: track.album.uuid}) : undefined} alt="" />
            <div class="text-center text-white text-base font-normal capitalize">{props.band?.name?.substring(0, 23) + '...' ?? 'No name'}</div>
        </div>
    )
}

export default ArtistCard