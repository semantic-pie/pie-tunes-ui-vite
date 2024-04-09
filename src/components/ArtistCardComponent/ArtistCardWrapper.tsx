import { FunctionalComponent } from "preact"
import { MusicBand, api } from "@/api"
import { useNavigate } from "@tanstack/react-router"
import { ArtistCard, ArtistCardProps } from "./ArtistCard"

export const ArtistCardWrapper: FunctionalComponent<{ artist: MusicBand }> = ({ artist }) => {
    const nav = useNavigate()

    const props: ArtistCardProps = {
        artist,
        onArtistClick: () => nav({ to: '/library/artists/$artistId', params: { artistId: artist.uuid } }),
        artistCoverUrl: api.urlForTrackCoverById({ id: 'anon_artist.jpg' }),
    }

    return <ArtistCard {...props} />
}
