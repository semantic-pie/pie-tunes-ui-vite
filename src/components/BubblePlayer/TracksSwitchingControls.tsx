import Backward from "@/components/icons/PlayerIcons/Backward";
import Forward from "@/components/icons/PlayerIcons/Forward";
import Pause from "@/components/icons/PlayerIcons/Pause";
import Play from "@/components/icons/PlayerIcons/Play";
import { next, prev, useAppDispatch } from "@/redux/store";
import { useGlobalAudioPlayer } from "react-use-audio-player";


const TracksSwitchingControls = () => {
    const { playing, togglePlayPause } = useGlobalAudioPlayer()

    const dispatch = useAppDispatch()

    return (
        <div class="flex flex-row gap-4 items-center justify-center">
            <button onClick={() => dispatch(prev())} class="flex items-center justify-center bg-yellow-400  w-14 h-14">
                <Backward width="35" height="35" class="fill-white" />
            </button>
            {playing ?
                <button onClick={togglePlayPause} class="flex items-center justify-center bg-yellow-400  w-14 h-14">
                    <Pause width="35" height="35" class="fill-white" />
                </button>
                :
                <button onClick={togglePlayPause} class="flex items-center justify-center bg-yellow-400  w-14 h-14">
                    <Play width="35" height="35" class="fill-white" />
                </button>
            }

            <button onClick={() => dispatch(next())} class="flex items-center justify-center bg-yellow-400  w-14 h-14">
                <Forward width="35" height="35" class="fill-white" />
            </button>
        </div>
    )
}

export default TracksSwitchingControls;