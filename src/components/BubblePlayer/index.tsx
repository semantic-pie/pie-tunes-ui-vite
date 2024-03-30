
import { Link } from "@tanstack/react-router";
import BubbleTrackInfo from "./BubbleTrackInfo";
import TracksSwitchingControls from "./TracksSwitchingControls";
import ValumeControls from "./ValumeControls";
import { useAppSelector } from "@/redux/store";


const BubblePlayer = () => {
    const currentTrack = useAppSelector(state => state.currentTrack);

    return (
        <div class={`flex-col-reverse sm:w-[840px] h-[11rem] sm:h-[90px] flex sm:flex-row sm:gap-0 gap-5 sm:mx-auto sm:items-center justify-between p-4 bubble-player backdrop-blur-[60px] bg-white bg-opacity-15 rounded-t-[28px] sm:rounded-full`}>
            {currentTrack != undefined &&
                <>
                    <TracksSwitchingControls />
                    <BubbleTrackInfo class='sm:w-96' track={currentTrack} />
                    <ValumeControls />
                </>
            }
        </div >
    );
}

export default BubblePlayer;


