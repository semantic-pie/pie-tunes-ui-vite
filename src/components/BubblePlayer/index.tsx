
import BubbleTrackInfo from "./BubbleTrackInfo";
import TracksSwitchingControls from "./TracksSwitchingControls";
import ValumeControls from "./ValumeControls";
import { useCurrentPlaylist } from "./hooks.ts/useCurrentPlaylist";
import Play from "@/components/icons/PlayerIcons/Play";

const BubblePlayer = () => {

    const {
        currentTrack,
        next,
        prev,
        pause,
        resume,
        playing,
        time,
        duration,
        seek,
        volume,
        setVolume
    } = useCurrentPlaylist()

    // const currentTrack = { title: 'Kek', musicBand: { name: 'kuuuu' } } as Track

    console.log(time)
    return (

        <div class={`${currentTrack ? 'w-[800px]' : 'w-fit'} h-30 flex flex-row mx-auto items-center justify-between  p-4 rounded-full bg-indigo-500`}>
            {currentTrack != undefined ?
                <>
                    <TracksSwitchingControls playing={playing} onNext={next} onPrev={prev} onPause={pause} onResume={resume} />
                    <BubbleTrackInfo track={currentTrack} time={time} duration={duration} seek={seek} />
                    <ValumeControls volume={volume} setVolume={setVolume}/>
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


