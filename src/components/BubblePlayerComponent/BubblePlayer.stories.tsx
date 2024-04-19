import { api } from "@/api";
import { doNothing, testTrack } from "../common/temp";
import { BubblePlayer, BubblePlayerProps } from "./BubblePlayer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";



export default {
    component: BubblePlayer,
    title: 'Bubble Player',
    tags: ['autodocs'],
    decorators: [(story: any) => <div>
        <div style={{
            backgroundImage: `url('${api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid })}')`,
            filter: 'blur(200px)'
        }}
            class='absolute inset-0 bg-cover bg-center'></div>
        <Provider store={store}>
            {story()}
        </Provider>
    </div>],
};


export const Default = {
    args: {
        liked: true,
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
        liked: false
    },
};

export const Play = {
    args: {
        ...Default.args,
        isPlaying: true,
        volume: 0.77
    },
};
