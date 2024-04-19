import { useAppDispatch } from "@/redux/store"
import { FunctionalComponent } from "preact"
import { Like, LikeProps } from "./Like"
import { Track } from "@/api"
import { fetchForLike, fetchForUnlike } from "@/redux/slices/userSlice"
import { useSignal } from "@preact/signals"

export const LikeWrapper: FunctionalComponent<{ track: Track }> = ({ track }) => {
    const dispatch = useAppDispatch()
    // const liked = useSignal<boolean>(track.isLiked)

    const props: LikeProps = {
        onClick: () => {
            track.isLiked ? dispatch(fetchForUnlike({ track })) : dispatch(fetchForLike({ track }))
            // liked.value = !liked.value
        },
        isLiked: track.isLiked
    }

    return <Like {...props} />
}
