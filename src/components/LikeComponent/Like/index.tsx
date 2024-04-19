
import LikeIcon from "@/components/icons/LikeIcon"
import { FunctionalComponent } from "preact"


export type LikeProps = {
    onClick: () => void
    isLiked?: boolean
    classes?: string
}

export const Like: FunctionalComponent<LikeProps> = ({ onClick, isLiked, classes }) => {
    return (
        <LikeIcon class={`${classes} fill-white text-white w-7 h-7 cursor-pointer rotate-1 ${isLiked ? 'rotate-45 group-hover:opacity-95' : ''} transition-all duration-150 ease-in-out`}
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                e.stopImmediatePropagation()
                onClick()
            }} />
    )
}
