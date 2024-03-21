import { api } from "@/api"
import ThreeDots from "@/components/icons/ThreeDots"
import { Track } from "@/api"
import { useAudioTime } from "./hooks.ts/useAudioTime"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import ProgresBar from "../common/ProgressBar"
import { useEffect } from "preact/hooks"
import { next, useAppDispatch } from "@/redux/store"
import Like from "../common/Like"

type BubbleTrackInfoProps = {
    track: Track
    class?: string
}

const calcPositionInPercent = (time?: number, duration?: number) => {
    if (time && duration) return (time / duration) * 100
    else return 0
}


const BubbleTrackInfo = (props: BubbleTrackInfoProps) => {
    const track = props.track
    const dispatch = useAppDispatch()

    const time = useAudioTime()
    const { duration, seek } = useGlobalAudioPlayer()
    const position = calcPositionInPercent(time, duration);

    useEffect(() => {
        if (position >= 99.5) dispatch(next())
    }, [time])

    return (
        <div className={`${props.class}  h-[74px] pt-2 bg-black bg-opacity-10 rounded-xl items-center flex flex-col overflow-hidden relative`}>
            <div class='w-full flex justify-between pb-[5px] px-1.5'>
                <div className="justify-start items-center gap-3.5 flex">
                    <img className="w-14 h-14 rounded-lg" src={api.forTrackCover(track.musicAlbum.uuid)} />
                    <div className="flex-col justify-center items-start gap-1 inline-flex">
                        <div className="text-center text-white text-lg font-normal font-['Helvetica Neue'] text-nowrap track-title">{track.title.length > 18 ? track.title.substring(0, 18) + '...' : track.title}</div>
                        <div className="text-center text-white text-opacity-40 text-base font-normal font-['Helvetica Neue']">{track.musicBand.name}</div>
                    </div>
                </div>
                <div class="flex flex-row gap-5 items-center justify-center">
                    <div class="w-4 h-4">
                        <ThreeDots class="w-4 h-4" />
                    </div>
                    <div>
                        <Like entity={track} />
                    </div>
                </div>
            </div>
            <ProgresBar classes="w-full" value={position} setValue={seek} relativeValue={duration}/>
        </div>
    )
}

export default BubbleTrackInfo