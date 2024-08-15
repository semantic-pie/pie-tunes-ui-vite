import { Playlist } from "@/api"
import PieTunesTestLogo from "@/components/icons/PieTunesTestLogo"
import { useSignal } from "@preact/signals"
import { FunctionalComponent } from "preact"


export type PlaylistCardProps = {
    playlist: Playlist
    onPlaylistClick: () => void
    playlistCoverUrl: string
}

export const PlaylistCard: FunctionalComponent<PlaylistCardProps> = ({ playlist, onPlaylistClick, playlistCoverUrl }) => {
    const error = useSignal<boolean>(false)
    return (
        <div onClick={onPlaylistClick} class={`w-full flex sm:flex-shrink-0 gap-3 sm:flex-col cursor-pointer  `}>
            {
                error.value ?
                    <div class='min-w-20 min-h-20 w-20 h-20 sm:w-auto sm:h-auto aspect-square cursor-pointer bg-black bg-opacity-10 rounded-xl'><PieTunesTestLogo class={'fill-white opacity-10'} /></div> :
                    <img onError={() => error.value = true} class='aspect-square min-w-20 min-h-20  w-20 h-20 sm:w-auto sm:h-auto rounded-md cursor-pointer  bg-black bg-opacity-10' src={playlistCoverUrl} alt="" />
            }

            <div class="text-white font-normal capitalize truncate">{playlist.name}</div>
        </div>
    )
}
