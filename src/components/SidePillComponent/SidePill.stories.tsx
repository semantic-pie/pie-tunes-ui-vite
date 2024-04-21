
import { testTrack } from "../stories/test-entities";
import { WrappWithBlur } from "../stories/test-wrappers";
import { SidePill, SidePillProps } from "./SidePill";



export default {
    component: SidePill,
    title: 'Side Pill',
    tags: ['autodocs'],
    decorators: [(story: any) => <WrappWithBlur>{story()}</WrappWithBlur>],
};


export const Default = {
    decorators: [(story: any) => <div class='min-h-40'>{story()}</div>],
    args: {
        currentTrack: undefined
    } as SidePillProps
};

export const WithTrackInPlayer = {
    decorators: [(story: any) => <div class='min-h-52'>{story()}</div>],
    args: {
        currentTrack: testTrack
    } as SidePillProps
};
