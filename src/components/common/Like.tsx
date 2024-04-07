import { useAppDispatch } from "@/redux/store"
import LikeIcon from "../icons/LikeIcon"
import { fetchForLike } from "@/redux/slices/userSlice"

type LikeProps = {
    entity: { uuid: string, liked: boolean }
}

const Like = (props: LikeProps) => {
    const dispatch = useAppDispatch()

    return (
        <LikeIcon class={`fill-white w-7 h-7 cursor-pointer`} onClick={() => {
            dispatch(fetchForLike({ trackUuid: props.entity.uuid }))
        }
        } />
    )
}

export default Like