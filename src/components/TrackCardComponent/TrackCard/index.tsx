import { Track } from "@/api"
import { LikeWrapper } from "@/components/LikeComponent/LikeWrapper"

import { toMinSec } from "@/utils/hellpers"
import { FunctionalComponent } from "preact"

export type TrackCardProps = {
    track: Track
    trackCoverUrl: string
    likeButton?: boolean
    selected?: boolean
    classes?: string
    onTrackClick: () => void
    onTrackLike: () => void
}


export const TrackCard: FunctionalComponent<TrackCardProps> = ({ track, classes, likeButton, selected, onTrackClick, onTrackLike, trackCoverUrl }) => {
    return (
        <div class={`group w-full flex flex-row bg-black bg-opacity-10 justify-start items-center gap-3 p-1 rounded-md ${classes} ${selected ? 'border-white border-[0.4px] border-opacity-20  !bg-opacity-15 selected' : ''}`}>
            {track.musicAlbum ?
                <img onClick={onTrackClick} class="w-12 h-12 rounded-md cursor-pointer" src={trackCoverUrl} /> :
                <div class="w-12 h-12 rounded-md bg-fuchsia-100 bg-opacity-40" />}

            <div class='w-full flex items-center justify-between overflow-hidden'>
                <div onClick={onTrackClick} class='w-4/5 flex flex-col cursor-pointer truncate' >
                    <div class="text-start text-white text-base font-normal capitalize truncate">{track.title}</div>
                    <div class="text-start text-white text-opacity-60 text-sm font-normal capitalize truncate">{track.musicBand ? track.musicBand.name : 'Band Name'}</div>
                </div>

                <div class={`flext min-w-[60px] sm:min-w-[65px] items-center w-14 flex justify-between  mr-2`}>
                    {/* {likeButton && <Like onLikeClick={onTrackLike} />} */}
                    {/* <Like onClick={onTrackLike} isLiked={true} /> */}
                    <LikeWrapper classes='text-white opacity-50' track={track} />

                    <span class='text-white text-[14px] opacity-50'>
                        {toMinSec(track.lengthInMilliseconds)}
                    </span>
                </div>
            </div>
        </div>
    )
}
