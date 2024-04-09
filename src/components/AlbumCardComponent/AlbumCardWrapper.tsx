import { FunctionalComponent } from "preact"
import { MusicAlbum, api } from "@/api"
import { AlbumCard, AlbumCardProps } from "./AlbumCard"
import { useNavigate } from "@tanstack/react-router"

export const AlbumCardWrapper: FunctionalComponent<{ album: MusicAlbum }> = ({ album }) => {
    const nav = useNavigate()

    const props: AlbumCardProps = {
        album,
        onAlbumClick: () => nav({ to: '/library/albums/$albumId', params: { albumId: album.uuid } }),
        albumCoverUrl: api.urlForTrackCoverById({ id: album.uuid }),
    }

    return <AlbumCard {...props} />
}
