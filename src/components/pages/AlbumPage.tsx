import { api } from "@/api"
import { useAppSelector } from "@/redux/store"
import { albumViewRoute } from "@/router/library"
import ThreeDots from "../icons/ThreeDots"
import Like from "../icons/LikeIcon"
import TrackCard from "../common/TrackCard"

type AlbumPageProps = {
    // uuid: string
}

const AlbumPage = () => {
    const { albumId } = albumViewRoute.useParams()
    const track = useAppSelector(state => state.currentTrack)
    const albumTracks = useAppSelector(state => state.queue.filter(t => t.musicAlbum.uuid === albumId))
    const album = useAppSelector(state => state.library.albums.find(a => a.uuid === albumId))

    const twoRows = album?.name.length > 20 ? true : false
    return (
        <>
            {album &&
                <div class={`flex flex-col gap-5 overflow-y-scroll sm:overflow-hidden`}>
                    <div class='p-1 sm:p-5 gap-5 flex flex-col sm:flex-row justify-between'>
                        <img class='w-full sm:w-[200px] sm:h-[200px] rounded-md' src={api.urlForTrackCoverById({id: albumId})} alt="" />
                        <div class='flex flex-col w-full  justify-between'>
                            <h3 class="text-[18px]">Album</h3>
                            <div class={`flex flex-col p-2.5 albumview-info justify-between h-fit gap-4 leading-tight`}>
                                <h2 class={`${twoRows ? 'text-[16px] sm:text-[28px]' : 'text-[24px] sm:text-[42px]'}`}>{album.name}</h2>
                                <div class='flex justify-between'>
                                    <div class='flex items-center gap-2.5'>
                                        <img class='w-10 h-10 rounded-md' src={api.urlForTrackCoverById({id: albumId})} alt="" />
                                        <span>Group Name</span>
                                    </div>
                                    <div class='flex justify-between items-center w-[80px] mx-5'>
                                        <ThreeDots class={'w-[27px] h-[27px]'} />
                                        <Like class={'w-[27px] h-[27px]'} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div class="sm:p-5 flex flex-col sm:overflow-y-scroll">
                        {albumTracks.map((track, i) => <TrackCard class={`p-2.5 ${i !== 0 ? 'border-t-[0.75px] border-white border-opacity-50' : ''} `} track={track} />)}
                    </div>
                </div>
            }
        </>
    )
}

export default AlbumPage