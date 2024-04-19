import { api } from "@/api"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { albumViewRoute, artistViewRoute } from "@/router/library"
import { AlbumPageHeader } from "./ArtistPageHeader"
import { ScrollAndLoadList } from "@/components/ScrollAndLoadListComponent/ScrollAndLoadList"
import { TrackCardWrapper } from "@/components/TrackCardComponent/TrackCardWrapper"
import { useEffect } from "preact/hooks"
import { currentOpenAlbum } from "@/redux/slices/dataSlice"



const ArtistPage = () => {
    const dispatch = useAppDispatch()

    const { artistId } = artistViewRoute.useParams()
    const artist = artistViewRoute.useLoaderData()

    // useEffect(() => {
    //     dispatch(currentOpenAlbum({ album }))
    // }, [album])



    // const tracks = album.tracks?.map(track => ({ ...track, musicAlbum: album, musicBand: album.musicBand }))

    const currentTrack = useAppSelector(state => state.player.queue.currentTrack)

    return (
        <div class={`h-full flex flex-col gap-3 pr-[8px] mr-[-14px] overflow-y-scroll sm:overflow-hidden`}>
            {/* <AlbumPageHeader album={album} albumCoverUrl={api.urlForTrackCoverById({ id: albumId })} bandCoverUrl={api.urlForTrackCoverById({ id: albumId })} />

            <ScrollAndLoadList >
                {tracks?.map(song => <TrackCardWrapper track={{ ...song, musicAlbum: { uuid: album.uuid } }} contextQueue={album.tracks!} selected={song.uuid === currentTrack?.uuid} />)}
            </ScrollAndLoadList> */}
            {JSON.stringify(artist)}
        </div>
    )
}

export default ArtistPage
