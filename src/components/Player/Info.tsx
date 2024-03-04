import Like from "@/assets/icons/Like"
import ThreeDots from "@/assets/icons/ThreeDots"
import { Track } from "@/pieTunesApi"
import { useRef } from "preact/hooks"

type InfoProps = {
    track?: Track
    time?: number
    duration?: number
    seek: (position: number) => void
}

const calcPositionInPercent = (time?: number, duration?: number) => {
    if (time && duration) return (time / duration) * 100
    else return 0
}


const Info = (props: InfoProps) => {
    const track = props.track ?? { title: 'Kek', musicBand: { name: "hehe" } } as Track

    const progressContainer = useRef<HTMLDivElement>(null)

    const onClickSeek = (e: MouseEvent,) => {
        if (e.target && props.duration && progressContainer.current) {
            var rect = progressContainer.current.getBoundingClientRect()
            var x = e.clientX - rect.left

            console.log(rect)
            console.log(e)
            console.log('time: ', (x / rect.width) * props.duration)
            props.seek((x / rect.width) * props.duration)
        }

    }


    return (
        <div className="w-96 h-[74px] pt-2 bg-black bg-opacity-10 rounded-xl items-center flex flex-col overflow-hidden relative">
            <div class='w-full flex justify-between pb-[5px]'>
                <div className="justify-start items-center gap-3.5 flex">
                    <img className="w-14 h-14 rounded-lg" src="https://via.placeholder.com/52x52" />
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
            <div ref={progressContainer} class='absolute w-full mt-[16px] bottom-0' onClick={onClickSeek} >
                <div style={{ width: calcPositionInPercent(props.time, props.duration) + '%' }} class={`mr-auto h-1 bg-black`}>

                </div>
            </div>
        </div>
    )
}

export default Info