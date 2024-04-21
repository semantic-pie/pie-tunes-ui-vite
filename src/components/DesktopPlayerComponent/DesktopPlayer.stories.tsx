import { api } from "@/api";
import { DesktopPlayer, DesktopPlayerProps } from "./DesktopPlayer";
import { doNothing, testTrack } from "../stories/test-entities";
import { WrappWithBlurAndRedux } from "../stories/test-wrappers";


export default {
    component: DesktopPlayer,
    title: 'Desktop Player',
    tags: ['autodocs'],
    decorators: [(story: any) => <WrappWithBlurAndRedux>{story()}</WrappWithBlurAndRedux>],
};


export const Default = {
    args: {
        volume: 1,
        isPlaying: false,
        currentTrack: testTrack,
        onNextTrackClick: doNothing,
        onPrevTrackClick: doNothing,
        onTogglePlayPause: doNothing,
        onTrackLike: doNothing,
        setVolume: doNothing,
        trackCoverUrl: api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid }),
        queue: []
    } as DesktopPlayerProps
};
