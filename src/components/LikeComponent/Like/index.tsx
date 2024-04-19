
import LikeIcon from "@/components/icons/LikeIcon"
import { FunctionalComponent } from "preact"


export type LikeProps = {
    onClick: () => void
    isLiked?: boolean

}

export const Like: FunctionalComponent<LikeProps> = ({ onClick, isLiked }) => {
    return (
        <LikeIcon class={`fill-white text-white w-7 h-7 cursor-pointer rotate-1 ${isLiked ? 'opacity-0 rotate-45 group-hover:opacity-95' : ''} transition-all duration-150 ease-in-out`} onClick={onClick} />
    )
}
