import { api } from "@/api"
import ThreeDots from "@/components/icons/ThreeDots"
import { Track } from "@/api"
import { FunctionalComponent } from "preact"
import { TrackTimeProgresBar } from "@/components/common/TrackTimeProgresBar"
import { Like } from "@/components/LikeComponent/Like"

export type BubbleTrackInfoProps = {
    currentTrack: Track
    classes?: string
    isSearchScope?: boolean
    liked: boolean
    onTrackClick: () => void
    onTrackLike: () => void
}

export const BubbleTrackInfo: FunctionalComponent<BubbleTrackInfoProps> = ({ currentTrack, classes, liked, onTrackLike, onTrackClick }) => {
    return (
        <div className={`${classes} h-[74px] pt-2 bg-black bg-opacity-10 rounded-xl items-center flex flex-col overflow-hidden relative`}>
            <div class='w-full flex justify-between pb-[6px] pl-1.5 px-5'>

                <div onClick={onTrackClick} className="flex w-2/3 sm:w-3/5 justify-start items-center gap-3.5 cursor-pointer">

                    <img className="w-14 h-14 rounded-lg" src={api.urlForTrackCoverById({ id: currentTrack.musicAlbum.uuid })} />
                    <div className="w-full flex-col justify-center items-start gap-1 inline-flex  ">
                        <div className="w-full text-left text-white text-lg font-normal font-['Helvetica Neue'] track-title truncate">{currentTrack.title}</div>
                        <div className="w-full text-left text-white text-opacity-40 text-base font-normal font-['Helvetica Neue'] truncate">{currentTrack.musicBand.name}</div>
                    </div>

                </div>

                <div class={`group flex flex-row gap-5 items-center justify-center`}>
                    <Like onClick={onTrackLike} isLiked={liked} />

                    <div class="w-4 h-4">
                        <ThreeDots class="w-4 h-4" />
                    </div>
                </div>
            </div>
            <TrackTimeProgresBar />
        </div>
    )
}
