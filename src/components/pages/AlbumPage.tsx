import { api } from "@/api"
import { useAppSelector } from "@/redux/store"
import { albumViewRoute } from "@/router/library"
import ThreeDots from "../icons/ThreeDots"
import Like from "../icons/LikeIcon"
import TrackCard from "../common/TrackCard"


const AlbumPage = () => {
    const { albumId } = albumViewRoute.useParams()
    const albumTracks = albumViewRoute.useLoaderData()

    const album = useAppSelector(state => state.library.albums.find(a => a.uuid === albumId) ?? { name: '' })

    let twoRows = false
    if (album) twoRows = album.name.length > 20 ? true : false

    return (
        <div class={`h-full flex flex-col gap-3 pr-[8px] mr-[-14px] overflow-y-scroll sm:overflow-hidden`}>
            <div class='sm:p-5 gap-3 flex flex-row justify-between'>
                <img class='h-28 w-28 sm:w-[200px] sm:h-[200px] rounded-md' src={api.urlForTrackCoverById({ id: albumId })} alt={album.name} />
                <div class='flex flex-col w-full justify-between'>
                    <h3 class="hidden sm:block text-[18px]">Album</h3>
                    <div class={`mt-auto sm:mt-0 flex flex-col p-2.5 albumview-info justify-between h-fit gap-4 leading-tight`}>
                        <h2 class={`${twoRows ? 'text-[20px] sm:text-[28px]' : 'text-[24px] sm:text-[42px]'}`}>{album.name}</h2>
                        <div class='hidden sm:flex justify-between'>
                            <div class='flex items-center gap-2.5'>
                                <img class='w-10 h-10 rounded-md' src={api.urlForTrackCoverById({ id: albumId })} alt={album.name} />
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

            <div class='flex sm:hidden justify-between p-3 albumview-info'>
                <div class='flex items-center gap-2.5'>
                    <img class='w-10 h-10 rounded-md' src={api.urlForTrackCoverById({ id: albumId })} alt={album.name} />
                    <span>Group Name</span>
                </div>
                <div class='flex justify-between items-center w-[80px]'>
                    <ThreeDots class={'w-[27px] h-[27px]'} />
                    <Like class={'w-[27px] h-[27px]'} />
                </div>
            </div>

            <div class='relative flex h-full w-full'>
                <div class="absolute p-2 sm:p-5 w-full top-0 left-0 right-0 flex flex-col sm:overflow-y-scroll">
                    {albumTracks.map((track, i) => <TrackCard class={`p-2.5 ${i !== 0 ? 'border-t-[0.75px] border-white border-opacity-50' : ''} `} track={track} />)}
                </div>
            </div>
        </div>
    )
}

export default AlbumPage