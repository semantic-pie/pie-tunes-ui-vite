import Max from "@/components/icons/PlayerIcons/Volume/Max"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import ProgresBar from "../common/ProgressBar"


const ValumeControls = () => {
    const { volume, setVolume } = useGlobalAudioPlayer()

    return (
        <div class="hidden sm:flex flex-row items-center justify-center gap-3">
            <Max class="w-7 h-7" />
            <ProgresBar classesInner="rounded-full" classes="w-20 rounded-full" value={volume * 100} setValue={val => setVolume(val / 100)} relativeValue={100} polzunok />
        </div>
    )
}

export default ValumeControls