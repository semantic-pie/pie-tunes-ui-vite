import { api } from "@/api"
import { useAppSelector } from "@/redux/store"
import { albumViewRoute } from "@/router/library"
import { useParams } from "@tanstack/react-router"
import ThreeDots from "../icons/ThreeDots"
import Like from "../icons/LikeIcon"
import TrackCard from "../common/TrackCard"
import { useSelector } from "react-redux"

type AlbumPageProps = {
    // uuid: string
}

const AlbumPage = (props: AlbumPageProps) => {
    const { albumId } = albumViewRoute.useParams()
    const albumTracks = useAppSelector(state => state.queue.filter(t => t.musicAlbum.uuid === albumId))
    const album = useAppSelector(state => state.albums.find(a => a.uuid === albumId))
    return (
        <>
            {album &&
                <div class='flex h-[680px] flex-col gap-5 overflow-hidden'>
                    <div class='p-5 gap-5 flex justify-between'>
                        <img class='w-[200px] h-[200px] rounded-md' src={api.forTrackCover(albumId)} alt="" />
                        <div class='flex flex-col w-full  justify-between'>
                            <h3 class="text-[18px]">Album</h3>
                            <div class='flex flex-col p-2.5 albumview-info justify-between h-[140px]'>
                                <h2 class='text-[42px]'>{album.name}</h2>
                                <div class='flex justify-between'>
                                    <div class='flex items-center gap-2.5'>
                                        <img class='w-10 h-10 rounded-md' src={api.forTrackCover(albumId)} alt="" />
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


                    <div class="p-5 flex flex-col overflow-y-scroll">
                        {albumTracks.map((track, i) => <TrackCard class={`p-2.5 ${i !== 0 ? 'border-t-[0.75px] border-white border-opacity-50' : ''} `} track={track} />)}
                    </div>
                </div>
            }
        </>
    )
}

export default AlbumPage