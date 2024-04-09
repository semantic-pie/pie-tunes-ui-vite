import { Playlist } from "@/api"
import { FunctionalComponent } from "preact"


export type PlaylistCardProps = {
    playlist: Playlist
    onPlaylistClick: () => void
    playlistCoverUrl: string
}

export const PlaylistCard: FunctionalComponent<PlaylistCardProps> = ({ playlist, onPlaylistClick, playlistCoverUrl }) => {
    return (
        <div onClick={onPlaylistClick} class={`w-full flex sm:flex-shrink-0 gap-3 sm:flex-col cursor-pointer  `}>
            <img class="min-w-20 min-h-20  w-20 h-20 sm:w-full sm:h-full rounded-md overflow-hidden bg-slate-200 bg-opacity-15" src={playlistCoverUrl} alt={playlist.name} />
            <div class="text-white font-normal capitalize truncate">{playlist.name}</div>
        </div>
    )
}
