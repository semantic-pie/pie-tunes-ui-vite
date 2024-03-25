import { fetchToLike, fetchToUnlike, useAppDispatch, useAppSelector } from "@/redux/store"
import LikeIcon from "../icons/LikeIcon"

type LikeProps = {
    entity: { uuid: string, isLiked: boolean }
}

const Like = (props: LikeProps) => {
    const dispatch = useAppDispatch()
    const track = useAppSelector(state => state.queue.find(t => t.uuid === props.entity.uuid))

    return (
        <LikeIcon class={`${track && track.isLiked ? 'fill-green-500' : 'fill-white'} w-7 h-7 cursor-pointer`} onClick={() => {
            if (track) {
                if (track.isLiked) {
                    dispatch(fetchToUnlike(track.uuid))
                } else {
                    dispatch(fetchToLike(track.uuid))
                }
            }
        }} />
    )
}

export default Like