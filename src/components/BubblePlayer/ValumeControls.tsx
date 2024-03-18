import Max from "@/components/icons/PlayerIcons/Volume/Max"
import { useState } from "preact/hooks"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import ProgresBar from "../common/ProgressBar"


const ValumeControls = () => {


    const { volume, setVolume, } = useGlobalAudioPlayer()
    const [kostyle, setKostyle] = useState(volume)

    return (
        <div class="flex flex-row items-center justify-center gap-1">
            <Max class="w-7 h-7" />
            <ProgresBar classes="w-20" value={kostyle * 100} setValue={val => {
                setVolume(val / 100)
                setKostyle(val / 100)
            }} relativeValue={100} polzunok />
        </div>
    )
}

export default ValumeControls