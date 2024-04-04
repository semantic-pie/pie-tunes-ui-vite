import { MusicBand, api } from "@/api"
import { trancate } from "@/utils/hellpers"

type ArtistCardProps = {
    band: MusicBand
}

const ArtistCard = (props: ArtistCardProps) => {
    return (
        <div class="w-full flex flex-shrink-0 gap-3 sm:flex-col cursor-pointer">
            <img class="w-20 h-20 sm:w-full sm:h-full bg-gray-300 rounded-md " src={api.urlForTrackCoverById({ id: 'anon_artist.jpg' })} alt={props.band.name} />
            <div class="text-center text-white text-base font-normal capitalize truncate ...">{trancate(props.band?.name?.substring(0, 23) ?? 'No name', 28)}</div>
        </div>
    )
}

export default ArtistCard