import { MusicAlbum, api } from "@/api"
import { useAppSelector } from "@/redux/store"

type AlbumCardProps = {
    album: MusicAlbum
}

const AlbumCard = (props: AlbumCardProps) => {
    const tracks = useAppSelector(state => state.queue)
    const uuid = tracks.find(t => t.musicAlbum.uuid === props.album.uuid)?.uuid

    return (
        <div class="flex flex-col">
            <img class="w-52 h-52 rounded-md overflow-hidden bg-slate-200 bg-opacity-15" src={ uuid ? api.forTrackCover(uuid) : undefined} alt="" />
            <div class="text-start text-white text-base font-normal capitalize">{props.album.name.substring(0, 25)}</div>
            <div class="text-start text-white text-opacity-60 text-sm font-normal capitalize">{(props.album as any).musicBand?.name.substring(0, 25) ?? 'No name'}</div>
        </div>
    )
}

export default AlbumCard

