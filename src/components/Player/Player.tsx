import TracksControls from "./TracksControls";
import Info from "./Info";
import ValumeControls from "./ValumeControls";
import { useCurrentPlaylist } from "./useCurrentPlaylist";
import { useEffect, useState } from "preact/hooks";

const Player = () => {

    const {
        currentTrack,
        next,
        prev,
        pause,
        resume,
        playing,
        time,
        duration,
        seek
    } = useCurrentPlaylist()

   

    console.log(time)
    return (
        <div class="w-[800px] flex flex-row mx-auto items-center justify-between  p-4 rounded-full bg-indigo-500">
            <TracksControls playing={playing} onNext={next} onPrev={prev} onPause={pause} onResume={resume} />
            <Info track={currentTrack} time={time} duration={duration} seek={seek} />
            <ValumeControls />
        </div>
    );
}

export default Player;