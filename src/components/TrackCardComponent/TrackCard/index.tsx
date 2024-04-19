import { Track } from "@/api"
import { Like } from "@/components/LikeComponent/Like"
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
    console.log('track card: ', track)
    return (
        <div class={`group w-full flex flex-row justify-start items-center gap-3 p-1 rounded-md ${classes} ${selected ? 'border-white border-[0.4px] border-opacity-20 !bg-white !bg-opacity-15 selected' : ''}`}>
            {track.musicAlbum ?
                <img onClick={onTrackClick} class="w-12 h-12 rounded-md cursor-pointer" src={trackCoverUrl} /> :
                <div class="w-12 h-12 rounded-md bg-fuchsia-100 bg-opacity-40" />}

            <div class='w-full flex items-center justify-between overflow-hidden'>
                <div onClick={onTrackClick} class='w-4/5 flex flex-col cursor-pointer truncate' >
                    <div class="text-start text-white text-base font-normal capitalize truncate">{track.title}</div>
                    <div class="text-start text-white text-opacity-60 text-sm font-normal capitalize truncate">{track.musicBand ? track.musicBand.name : 'Band Name'}</div>
                </div>

                <div class={`flext min-w-20 items-center w-14 flex justify-between gap-3 pr-2`}>
                    {/* {likeButton && <Like onLikeClick={onTrackLike} />} */}
                    {/* <Like onClick={onTrackLike} isLiked={true} /> */}
                    <LikeWrapper track={track} />

                    <span class='test-white text-[14px] opacity-50'>
                        {toMinSec(track.lengthInMilliseconds)}
                    </span>
                </div>
            </div>
        </div>
    )
}
