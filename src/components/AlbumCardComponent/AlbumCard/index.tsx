import { MusicAlbum } from "@/api"
import PieTunesTestLogo from "@/components/icons/PieTunesTestLogo"
import { useSignal } from "@preact/signals"
import { FunctionalComponent } from "preact"


export type AlbumCardProps = {
    album: MusicAlbum
    onAlbumClick: () => void
    albumCoverUrl: string
}

export const AlbumCard: FunctionalComponent<AlbumCardProps> = ({ album, onAlbumClick, albumCoverUrl }) => {
    const error = useSignal<boolean>(false)
    return (
        <div onClick={onAlbumClick} class={`w-full flex  gap-3 sm:flex-col cursor-pointer  `}>
            {
                error.value ?
                    <div class='min-w-20 min-h-20 w-20 h-20 sm:w-auto sm:h-auto aspect-square cursor-pointer bg-black bg-opacity-10 rounded-xl'><PieTunesTestLogo class={'fill-white opacity-10'} /></div> :
                    <img onError={() => error.value = true} class='aspect-square min-w-20 min-h-20  w-20 h-20 sm:w-auto sm:h-auto rounded-md cursor-pointer  bg-black bg-opacity-10' src={albumCoverUrl} alt="" />
            }
            <div class=' sm:p-1 truncate'>
                <div class="text-white font-normal capitalize truncate">{album.name}</div>
                <div class="text-white text-opacity-60 text-sm capitalize truncate">{(album as any).musicBand?.name ?? 'No name'}</div>
            </div>
        </div>
    )
}
