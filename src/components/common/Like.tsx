import LikeIcon from "../icons/LikeIcon"
import { FunctionalComponent } from "preact"

export type LikeProps = {
    onLikeClick: () => void
}

const Like: FunctionalComponent<LikeProps> = ({ onLikeClick }) => {
    return (
        <LikeIcon class={`fill-white text-white w-7 h-7 cursor-pointer`} onClick={onLikeClick} />
    )
}

export default Like