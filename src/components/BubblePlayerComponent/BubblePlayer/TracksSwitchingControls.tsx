import Backward from "@/components/icons/PlayerIcons/Backward";
import Forward from "@/components/icons/PlayerIcons/Forward";
import Pause from "@/components/icons/PlayerIcons/Pause";
import Play from "@/components/icons/PlayerIcons/Play";
import { FunctionComponent } from "preact";

export type TracksSwitchingControlsProps = {
    isPlaying?: boolean
    classes?: string
    togglePlayPause: () => void
    onPlayNextClick: () => void
    onPlayPrevClick: () => void
}

export const TracksSwitchingControls: FunctionComponent<TracksSwitchingControlsProps> = ({ isPlaying, togglePlayPause, classes, onPlayNextClick, onPlayPrevClick }) => {
    return (
        <div class={`flex flex-row gap-4 items-center justify-between ${classes}`}>
            <button onClick={onPlayPrevClick} class="flex items-center justify-center w-14 h-14 hover:opacity-80 transition-all duration-100">
                <Backward width="35" height="35" class="fill-white" />
            </button>

            {isPlaying ?
                <button onClick={togglePlayPause} class="flex items-center justify-center w-14 h-14 hover:opacity-80 transition-all duration-100">
                    <Pause width="35" height="35" class="fill-white" />
                </button>
                :
                <button onClick={togglePlayPause} class="flex items-center justify-center w-14 h-14 hover:opacity-80 transition-all duration-100">
                    <Play width="35" height="35" class="fill-white" />
                </button>
            }

            <button onClick={onPlayNextClick} class="flex items-center justify-center w-14 h-14 hover:opacity-80 transition-all duration-100">
                <Forward width="35" height="35" class="fill-white" />
            </button>
        </div>
    )
}
