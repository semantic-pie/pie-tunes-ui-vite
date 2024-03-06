import Max from "@/components/icons/PlayerIcons/Volume/Max"
import { useRef } from "preact/hooks"

type ValumeControlsProps = {
    volume: number
    setVolume: (v: number) => void
}

const calcVolume = (v: number) => {
    return v * 100
}

const ValumeControls = (props: ValumeControlsProps) => {
    const volumeContainer = useRef<HTMLDivElement>(null)

    const onClickChangeValue = (e: MouseEvent) => {
        if (e.target && props.volume && volumeContainer.current) {
            var rect = volumeContainer.current.getBoundingClientRect()
            var x = e.clientX - rect.left

            props.setVolume((x / rect.width))
            console.log((x / rect.width))
        }

    }

    return (
        <div class="flex flex-row items-center justify-center gap-1">
            <Max class="w-7 h-7" />
            <div ref={volumeContainer} class='w-20 cursor-pointer' onClick={onClickChangeValue} >
                <div style={{ width: calcVolume(props.volume) + '%' }} class={`mr-auto h-1 bg-black cursor-pointer`}>

                </div>
            </div>
            {/* <hr class="w-28 border-2 rounded-full"></hr> */}
        </div>
    )
}

export default ValumeControls