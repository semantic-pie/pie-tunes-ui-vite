
import { Link } from "@tanstack/react-router";
import BubbleTrackInfo from "./BubbleTrackInfo";
import TracksSwitchingControls from "./TracksSwitchingControls";
import ValumeControls from "./ValumeControls";
import { useAppSelector } from "@/redux/store";


const BubblePlayer = () => {
    const currentTrack = useAppSelector(state => state.currentTrack);

    return (
        <div class={`flex-col-reverse sm:w-[840px] sm:h-[90px] flex sm:flex-row sm:gap-0 gap-5 sm:mx-auto sm:items-center justify-between p-4 bubble-player`}>
            {currentTrack != undefined &&
                <>
                    <TracksSwitchingControls />
                    <Link to={'/player'}>
                        <BubbleTrackInfo class='sm:w-96' track={currentTrack} />
                    </Link>
                    <ValumeControls />
                </>
            }
        </div >
    );
}

export default BubblePlayer;


