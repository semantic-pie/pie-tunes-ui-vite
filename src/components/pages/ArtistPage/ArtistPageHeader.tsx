import { MusicAlbum } from "@/api";
import { Like } from "@/components/LikeComponent/Like";
import { LikeWrapper } from "@/components/LikeComponent/LikeWrapper";
import PieTunesTestLogo from "@/components/icons/PieTunesTestLogo";
import ThreeDots from "@/components/icons/ThreeDots";
import { fetchForLike, fetchForUnlike } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/store";
import { useSignal } from "@preact/signals";
import { FunctionalComponent } from "preact";


export const AlbumPageHeader: FunctionalComponent<{
    album: MusicAlbum
    albumCoverUrl?: string
    bandCoverUrl?: string

}> = ({ albumCoverUrl, bandCoverUrl, album }) => {
    const dispatch = useAppDispatch()

    const error = useSignal<boolean>(false)

    let twoRows = album.name.length > 20 ? true : false

    const isLiked = useSignal<boolean>(!!album.isLiked)

    console.log(album)

    const onLike = () => {
        if (isLiked.value) {
            dispatch(fetchForUnlike({ album }))
            isLiked.value = false
        } else {
            dispatch(fetchForLike({ album }))
            isLiked.value = true
        } 
    }

    return (
        <>
            <div class='gap-3 flex flex-row justify-between'>
                {
                    error.value ?
                        <div class='min-w-20 w-20 sm:min-w-[200px] sm:w-[200px] aspect-square cursor-pointer bg-black bg-opacity-10 rounded-xl'><PieTunesTestLogo class={'fill-white opacity-10'} /></div> :
                        <img onError={() => error.value = true} class='aspect-square min-w-28 w-28 sm:min-w-[200px] sm:w-[200px] rounded-md cursor-pointer bg-black bg-opacity-10' src={albumCoverUrl} alt={album.name} />
                }
                <div class='flex flex-col w-full justify-between'>
                    <h3 class="hidden sm:block text-[18px]">Album</h3>
                    <div class={`mt-auto sm:mt-0 flex flex-col p-2.5 albumview-info justify-between h-fit gap-4 leading-tight`}>
                        <h2 class={`${twoRows ? 'text-[20px] sm:text-[28px]' : 'text-[24px] sm:text-[42px]'}`}>{album.name}</h2>
                        <div class='hidden sm:flex justify-between'>
                            <div class='flex items-center gap-2.5'>
                                <img class='w-10 h-10 rounded-md' src={bandCoverUrl} />
                                <span>Group Name</span>
                            </div>
                            <div class='flex justify-between items-center w-[80px] mx-5'>
                                <ThreeDots class={'w-[27px] h-[27px]'} />
                                {/* <LikeWrapper album={album} /> */}
                                <Like onClick={onLike} isLiked={isLiked.value} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='flex sm:hidden justify-between p-3 albumview-info'>
                <div class='flex items-center gap-2.5'>
                    <img class='w-10 h-10 rounded-md' src={bandCoverUrl} alt={album.name} />
                    <span>Group Name</span>
                </div>
                <div class='flex justify-between items-center w-[80px]'>
                    <ThreeDots class={'w-[27px] h-[27px]'} />
                    <LikeWrapper album={album} />
                </div>
            </div>
        </>
    )
}