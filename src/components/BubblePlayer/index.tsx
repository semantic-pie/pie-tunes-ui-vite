
import BubbleTrackInfo from "./BubbleTrackInfo";
import TracksSwitchingControls from "./TracksSwitchingControls";
import ValumeControls from "./ValumeControls";
import { useCurrentPlaylist } from "./hooks.ts/useCurrentPlaylist";
import Play from "@/components/icons/PlayerIcons/Play";


const BubblePlayer = () => {
    const { currentTrack } = useCurrentPlaylist()

    return (
        <div class={`${currentTrack ? 'w-[800px]' : 'w-fit'} h-30 flex flex-row mx-auto items-center justify-between p-4 rounded-full bg-indigo-500`}>
            {currentTrack != undefined ?
                <>
                    <TracksSwitchingControls />
                    <BubbleTrackInfo track={currentTrack} />
                    <ValumeControls />
                </> :
                <div class='w-full flex justify-center p-5'>
                    <button class='cursor-pointer'>
                        <Play height={50} width={50} />
                    </button>
                </div>
            }
        </div >
    );
}

export default BubblePlayer;


