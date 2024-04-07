import { MusicAlbum, api } from "@/api"
import { trancate } from "@/utils/hellpers"
import { useNavigate } from "@tanstack/react-router"

type AlbumCardProps = {
    album: MusicAlbum
}

const AlbumCard = (props: AlbumCardProps) => {
    const nav = useNavigate({ from: '/library/albums' })

    return (
        <div onClick={() => nav({ to: '/library/albums/$albumId', params: { albumId: props.album.uuid } })} class="w-full flex flex-shrink-0 gap-3 sm:flex-col cursor-pointer">
            <img class="w-20 h-20 sm:w-full sm:h-full rounded-md overflow-hidden bg-slate-200 bg-opacity-15" src={api.urlForTrackCoverById({ id: props.album.uuid })} alt={props.album.name} />
            <div>
                <div class="text-start text-white text-base font-normal capitalize truncate ...">{trancate(props.album?.name ?? 'No name', 28)}</div>
                <div class="text-start text-white text-opacity-60 text-sm font-normal capitalize truncate ...">{trancate((props.album as any).band?.name ?? 'No name', 28)}</div>
            </div>
        </div>
    )
}

export default AlbumCard

