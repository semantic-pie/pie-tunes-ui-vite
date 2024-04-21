import { BubblePlayer, BubblePlayerProps } from "./BubblePlayer";
import { doNothing, testTrack } from "../stories/test-entities";
import { WrappWithBlurAndRedux } from "../stories/test-wrappers";



export default {
    component: BubblePlayer,
    title: 'Bubble Player',
    tags: ['autodocs'],
    decorators: [(story: any) => <WrappWithBlurAndRedux>{story()}</WrappWithBlurAndRedux>],
};


export const Default = {
    args: {
        liked: false,
        volume: 1,
        currentTrack: testTrack,
        togglePlayPause: doNothing,
        isPlaying: false,
        setVolume: doNothing,
        onLikeClick: doNothing,
        isSearchScope: true,
        onTrackClick: doNothing,
        onPlayNextClick: doNothing,
        onPlayPrevClick: doNothing,
        onTrackLike: doNothing,
        onSwipeUp: doNothing
    } as BubblePlayerProps,
};

export const Liked = {
    args: {
        ...Default.args,
        liked: true
    },
};

export const Play = {
    args: {
        ...Default.args,
        liked: false,
        isPlaying: true,
        volume: 0.77
    },
};
