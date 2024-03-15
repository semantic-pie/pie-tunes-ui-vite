import { api } from "@/api"
import Like from "@/components/icons/Like"
import ThreeDots from "@/components/icons/ThreeDots"
import { Track } from "@/api"
import { useAudioTime } from "./hooks.ts/useAudioTime"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import ProgresBar from "../common/ProgressBar"
import { useEffect } from "preact/hooks"
import { next, useAppDispatch } from "@/redux/store"

type BubbleTrackInfoProps = {
    track: Track
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
        <div className="w-96 h-[74px] pt-2 bg-black bg-opacity-10 rounded-xl items-center flex flex-col overflow-hidden relative">
            <div class='w-full flex justify-between pb-[5px] px-1.5'>
                <div className="justify-start items-center gap-3.5 flex">
                    <img className="w-14 h-14 rounded-lg" src={api.forTrackCover(track.uuid)} />
                    <div className="flex-col justify-center items-start gap-1 inline-flex">
                        <div className="text-center text-white text-lg font-normal font-['Helvetica Neue'] text-nowrap">{track.title}</div>
                        <div className="text-center text-white text-opacity-40 text-base font-normal font-['Helvetica Neue']">{track.musicBand.name}</div>
                    </div>
                </div>
                <div class="flex flex-row gap-5 items-center justify-center">
                    <div class="w-4 h-4">
                        <ThreeDots class="w-4 h-4" />
                    </div>
                    <div>
                        <Like class="w-7 h-7" />
                    </div>
                </div>
            </div>
            <ProgresBar classes="w-full" value={position} setValue={seek} relativeValue={duration}/>
        </div>
    )
}

export default BubbleTrackInfo