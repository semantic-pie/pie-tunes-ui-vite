import Backward from "@/assets/icons/PlayerIcons/Backward";
import Forward from "@/assets/icons/PlayerIcons/Forward";
import Pause from "@/assets/icons/PlayerIcons/Pause";

const Controls = () => {
    return (
        <div class="flex flex-row gap-4 items-center justify-center">
            <div class="flex items-center justify-center bg-yellow-400  w-14 h-14">
                <Backward width="35" height="35" class="fill-white" />
            </div>
            <div class="flex items-center justify-center bg-yellow-400  w-14 h-14">
                <Pause width="35" height="35" class="fill-white" />
            </div>
            <div class="flex items-center justify-center bg-yellow-400  w-14 h-14">
                <Forward width="35" height="35" class="fill-white" />
            </div>
        </div>
    )
}

export default Controls;