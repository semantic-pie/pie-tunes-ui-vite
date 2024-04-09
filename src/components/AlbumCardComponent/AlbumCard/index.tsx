import { MusicAlbum } from "@/api"
import { FunctionalComponent } from "preact"


export type AlbumCardProps = {
    album: MusicAlbum
    onAlbumClick: () => void
    albumCoverUrl: string
}

export const AlbumCard: FunctionalComponent<AlbumCardProps> = ({ album, onAlbumClick, albumCoverUrl }) => {
    return (
        <div onClick={onAlbumClick} class={`w-full flex sm:flex-shrink-0 gap-3 sm:flex-col cursor-pointer  `}>
            <img class="min-w-20 min-h-20  w-20 h-20 sm:w-full sm:h-full rounded-md overflow-hidden bg-slate-200 bg-opacity-15" src={albumCoverUrl} alt={album.name} />
            <div class=' sm:p-1 truncate'>
                <div class="text-white font-normal capitalize truncate">{album.name}</div>
                <div class="text-white text-opacity-60 text-sm capitalize truncate">{(album as any).musicBand?.name ?? 'No name'}</div>
            </div>
        </div>
    )
}
