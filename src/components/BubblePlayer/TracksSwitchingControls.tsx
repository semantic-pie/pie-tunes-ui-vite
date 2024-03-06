import Backward from "@/components/icons/PlayerIcons/Backward";
import Forward from "@/components/icons/PlayerIcons/Forward";
import Pause from "@/components/icons/PlayerIcons/Pause";
import Play from "@/components/icons/PlayerIcons/Play";

type TracksSwitchingControlsProps = {
    playing: boolean
    onNext: () => void
    onPrev: () => void
    onPause: () => void
    onResume: () => void
}

const TracksSwitchingControls = (props: TracksSwitchingControlsProps) => {
    return (
        <div class="flex flex-row gap-4 items-center justify-center">
            <button onClick={props.onPrev} class="flex items-center justify-center bg-yellow-400  w-14 h-14">
                <Backward width="35" height="35" class="fill-white" />
            </button>
            {props.playing ?
                <button onClick={props.onPause} class="flex items-center justify-center bg-yellow-400  w-14 h-14">
                    <Pause width="35" height="35" class="fill-white" />
                </button>
                :
                <button onClick={props.onResume} class="flex items-center justify-center bg-yellow-400  w-14 h-14">
                    <Play width="35" height="35" class="fill-white" />
                </button>
            }

            <button onClick={props.onNext} class="flex items-center justify-center bg-yellow-400  w-14 h-14">
                <Forward width="35" height="35" class="fill-white" />
            </button>
        </div>
    )
}

export default TracksSwitchingControls;