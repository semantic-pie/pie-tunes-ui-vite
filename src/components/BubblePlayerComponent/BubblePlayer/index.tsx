import { BubbleTrackInfo, BubbleTrackInfoProps } from "./BubbleTrackInfo";
import { TracksSwitchingControls, TracksSwitchingControlsProps } from "./TracksSwitchingControls";
import { useRef } from "preact/hooks";
import { useSwipeHook } from "@/utils/useSwipeHook";
import { FunctionComponent } from "preact";
import { Track } from "@/api";
import { VolumeControls, VolumeControlsProps } from "./VolumeControls";


export type BubblePlayerProps = {
    currentTrack: Track
    onSwipeUp: () => void
    onTrackLike: () => void
}
    & TracksSwitchingControlsProps
    & VolumeControlsProps
    & BubbleTrackInfoProps

export const BubblePlayer: FunctionComponent<BubblePlayerProps> = ({ onSwipeUp, currentTrack, togglePlayPause, isPlaying, onPlayNextClick, onPlayPrevClick, volume, setVolume, isSearchScope, liked, onTrackLike, onTrackClick }) => {
    const ref = useRef<HTMLDivElement>(null)

    useSwipeHook(() => onSwipeUp, 'swiped-up', ref)

    return (
        <div ref={ref} class='flex flex-col-reverse sm:flex-row  sm:w-[840px] h-[11rem] sm:h-[90px] -0 p-4 gap-5 sm:gap sm:mx-auto sm:items-center justify-between rounded-[28px] sm:rounded-full backdrop-blur-[60px] bg-white bg-opacity-15 bubble-player'>
            <TracksSwitchingControls isPlaying={isPlaying} togglePlayPause={togglePlayPause} onPlayNextClick={onPlayNextClick} onPlayPrevClick={onPlayPrevClick} />
            <BubbleTrackInfo classes='sm:w-96' currentTrack={currentTrack} isSearchScope={isSearchScope} liked={liked} onTrackLike={onTrackLike} onTrackClick={onTrackClick} />
            <VolumeControls volume={volume} setVolume={setVolume} />
        </div >
    );
}
