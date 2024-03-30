import { fetchToLike, fetchToUnlike, useAppDispatch, useAppSelector } from "@/redux/store"
import LikeIcon from "../icons/LikeIcon"
import { useState } from "preact/hooks"

type LikeProps = {
    entity: { uuid: string, liked: boolean }
}

const Like = (props: LikeProps) => {
    const dispatch = useAppDispatch()
    // const track = useAppSelector(state => state.queue.find(t => t.uuid === props.entity.uuid))
    
    return (
        <LikeIcon class={`fill-white w-7 h-7 cursor-pointer`} onClick={() => {
            dispatch(fetchToLike(props.entity.uuid))
            console.log('kek')
        }
        } />
    )
}

export default Like