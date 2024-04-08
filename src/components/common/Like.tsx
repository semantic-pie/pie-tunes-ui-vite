import { useAppDispatch } from "@/redux/store"
import LikeIcon from "../icons/LikeIcon"
import { fetchForLike } from "@/redux/slices/userSlice"
import { MusicAlbum, MusicBand, Track } from "@/api"

type LikeProps = {
    // entity: { uuid: string, liked: boolean }
    track?: Track
    album?: MusicAlbum
    band?: MusicBand 
}

const Like = (props: LikeProps) => {
    const dispatch = useAppDispatch()

    return (
        <LikeIcon class={`fill-white w-7 h-7 cursor-pointer`} onClick={() => {
            dispatch(fetchForLike({ ...props }))
        }
        } />
    )
}

export default Like