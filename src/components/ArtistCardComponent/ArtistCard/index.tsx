import { MusicBand } from "@/api"
import { FunctionalComponent } from "preact"

export type ArtistCardProps = {
    artist: MusicBand
    onArtistClick: () => void
    artistCoverUrl: string
}

export const ArtistCard: FunctionalComponent<ArtistCardProps> = ({ artist, artistCoverUrl, onArtistClick }) => {
    return (
        <div onClick={onArtistClick} class="w-full p flex flex-shrink-0 gap-3 sm:flex-col cursor-pointer">
            <img class="min-w-20 min-h-20 w-20 h-20 sm:w-full sm:h-full bg-slate-200 bg-opacity-15 rounded-md " src={artistCoverUrl} alt={artist.name} />
            <div class="sm:p-1 text-center text-white text-base font-normal capitalize truncate">{artist.name}</div>
        </div>
    )
}
