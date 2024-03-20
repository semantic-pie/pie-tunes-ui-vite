
import BubbleTrackInfo from "./BubbleTrackInfo";
import TracksSwitchingControls from "./TracksSwitchingControls";
import ValumeControls from "./ValumeControls";
import { useCurrentPlaylist } from "./hooks.ts/useCurrentPlaylist";


const BubblePlayer = () => {
    const { currentTrack } = useCurrentPlaylist()



    return (
        <div class={`flex-col-reverse sm:w-[840px] sm:h-[90px] flex sm:flex-row sm:gap-0 gap-5 sm:mx-auto sm:items-center justify-between p-4 bubble-player`}>
            {currentTrack != undefined && <>
                <TracksSwitchingControls />
                <BubbleTrackInfo class='sm:w-96' track={currentTrack} />
                <ValumeControls />
            </>}
        </div >
    );
}

export default BubblePlayer;


