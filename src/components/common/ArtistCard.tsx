import { MusicBand, api } from "@/api"
import { useAppSelector } from "@/redux/store"

type ArtistCardProps = {
    band: MusicBand
}

const ArtistCard = (props: ArtistCardProps) => {
    const tracks = useAppSelector(state => state.queue)
    const track = tracks.find(t => t.musicBand.uuid === props.band.uuid)
    
    return (
        <div class="flex flex-col">
            <img class='w-52 h-52 rounded-full bg-slate-300 bg-opacity-15' src={ track ? api.urlForTrackCoverById({id: track.musicAlbum.uuid}) : undefined} alt="" />
            <div class="text-center text-white text-base font-normal capitalize">{props.band.name}</div>
        </div>
    )
}

export default ArtistCard