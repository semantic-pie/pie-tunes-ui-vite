import { useAudioTime } from "@/utils/useAudioTime";
import ProgresBar from "./ProgressBar";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { FunctionalComponent } from "preact";

const calcPositionInPercent = (time?: number, duration?: number) => {
    if (time && duration) return (time / duration) * 100
    else return 0
}

export const TrackTimeProgresBar: FunctionalComponent<{ classes?: string, classesInner?: string, polzunok?: boolean }> = ({ classes, classesInner, polzunok }) => {
    const time = useAudioTime()
    const { duration, seek } = useGlobalAudioPlayer()
    const position = calcPositionInPercent(time, duration);
    return (<>
        <ProgresBar classes={`w-full ${classes}`} classesInner={classesInner} value={position} setValue={seek} relativeValue={duration} polzunok={polzunok}  />
    </>)
}
