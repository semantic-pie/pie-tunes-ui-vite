import { MusicBand } from "@/api"
import PieTunesTestLogo from "@/components/icons/PieTunesTestLogo"
import { useSignal } from "@preact/signals"
import { FunctionalComponent } from "preact"

export type ArtistCardProps = {
    artist: MusicBand
    onArtistClick: () => void
    artistCoverUrl: string
}

export const ArtistCard: FunctionalComponent<ArtistCardProps> = ({ artist, artistCoverUrl, onArtistClick }) => {
    const error = useSignal<boolean>(false)

    return (
        <div onClick={onArtistClick} class="w-full p flex flex-shrink-0 gap-3 sm:flex-col cursor-pointer">
            {
                error.value ?
                    <div class='min-w-20 min-h-20 w-20 h-20 sm:w-auto sm:h-auto aspect-square cursor-pointer bg-black bg-opacity-10 rounded-xl'><PieTunesTestLogo class={'fill-white opacity-10'} /></div> :
                    <img onError={() => error.value = true} class='aspect-square min-w-20 min-h-20  w-20 h-20 sm:w-auto sm:h-auto rounded-md cursor-pointer  bg-black bg-opacity-10' src={artistCoverUrl} alt="" />
            }
            <div class="sm:p-1 text-center text-white text-base font-normal capitalize truncate">{artist.name}</div>
        </div>
    )
}
