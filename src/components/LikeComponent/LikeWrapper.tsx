import { useAppDispatch } from "@/redux/store"
import { FunctionalComponent } from "preact"
import { Like, LikeProps } from "./Like"
import { MusicAlbum, MusicBand, Track } from "@/api"
import { fetchForLike, fetchForUnlike } from "@/redux/slices/userSlice"

export const LikeWrapper: FunctionalComponent<{
    track?: Track,
    band?: MusicBand,
    album?: MusicAlbum,
    classes?: string
}> = ({ track, band, album, classes }) => {
    const dispatch = useAppDispatch()
    // const liked = useSignal<boolean>(track.isLiked)

    const props: LikeProps = {
        onClick: () => {
            if (track) {
                track?.isLiked ? dispatch(fetchForUnlike({ track })) : dispatch(fetchForLike({ track }))
            }
            if (band) {
                band?.isLiked ? dispatch(fetchForUnlike({ band })) : dispatch(fetchForLike({ band }))
            }
            if (album) {
                album?.isLiked ? dispatch(fetchForUnlike({ album })) : dispatch(fetchForLike({ album }))
            }
        },
        isLiked: track?.isLiked || band?.isLiked || album?.isLiked,
        classes
    }

    return <Like {...props} />
}
