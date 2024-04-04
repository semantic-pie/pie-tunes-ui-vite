import { Playlist, api } from "@/api"
import { trancate } from "@/utils/hellpers"


type PlaylistCardProps = {
    playlist: Playlist
    onClick: () => void
}
const PlaylistCard = (props: PlaylistCardProps) => {
    return (
        <div onClick={props.onClick} class="w-full flex flex-shrink-0 gap-3 sm:flex-col cursor-pointer">
            <img class="w-20 h-20 sm:w-full sm:h-full rounded-md overflow-hidden" src={api.urlForTrackCoverById({ id: 'dailyplaylist.jpg' })} alt={props.playlist.name} />
            <div class="sm:w-full">
                <div class="text-start text-white text-base font-normal capitalize truncate ...">{trancate(props.playlist.name, 28)}</div>
            </div>
        </div>
    )
}

export default PlaylistCard