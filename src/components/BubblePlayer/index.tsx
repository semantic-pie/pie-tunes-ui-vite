
import { useNavigate } from "@tanstack/react-router";
import BubbleTrackInfo from "./BubbleTrackInfo";
import TracksSwitchingControls from "./TracksSwitchingControls";
import ValumeControls from "./ValumeControls";
import { useAppSelector } from "@/redux/store";
import { useRef } from "preact/hooks";
import { useSwipeHook } from "@/utils/useSwipeHook";


const BubblePlayer = () => {
    const currentTrack = useAppSelector(state => state.currentTrack);

    const nav = useNavigate()
    const ref = useRef<HTMLDivElement>(null)

    useSwipeHook(() => nav({ to: '/player' }), 'swiped-up', ref)

    return (
        <div ref={ref} class={`flex-col-reverse sm:w-[840px] h-[11rem] sm:h-[90px] flex sm:flex-row sm:gap-0 gap-5 sm:mx-auto sm:items-center justify-between p-4 bubble-player backdrop-blur-[60px] bg-white bg-opacity-15 rounded-[28px] sm:rounded-full`}>
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


