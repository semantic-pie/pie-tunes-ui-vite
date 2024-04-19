import { useAppDispatch } from "@/redux/store"
import { FunctionalComponent } from "preact"
import { Like, LikeProps } from "./Like"
import { Track } from "@/api"
import { fetchForLike, fetchForUnlike } from "@/redux/slices/userSlice"

export const LikeWrapper: FunctionalComponent<{ track: Track, classes?: string }> = ({ track, classes }) => {
    const dispatch = useAppDispatch()
    // const liked = useSignal<boolean>(track.isLiked)

    const props: LikeProps = {
        onClick: () => {
            track.isLiked ? dispatch(fetchForUnlike({ track })) : dispatch(fetchForLike({ track }))
            // liked.value = !liked.value
        },
        isLiked: track.isLiked,
        classes
    }

    return <Like {...props} />
}
