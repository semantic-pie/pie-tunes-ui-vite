import { FunctionalComponent } from "preact"
import { Playlist, api } from "@/api"
import { useNavigate } from "@tanstack/react-router"
import { PlaylistCard, PlaylistCardProps } from "./PlaylistCard"

export const PlaylistCardWrapper: FunctionalComponent<{ playlist: Playlist }> = ({ playlist }) => {
    const nav = useNavigate()

    const props: PlaylistCardProps = {
        playlist,
        onPlaylistClick: () => nav({ to: '/library/made-for-you/' + playlist.uuid }),
        playlistCoverUrl: api.urlForTrackCoverById({ id: 'dailyplaylist.jpeg' }),
    }

    return <PlaylistCard {...props} />
}
