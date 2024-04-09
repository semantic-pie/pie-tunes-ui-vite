import { api } from "@/api";
import { doNothing, testTrack } from "../common/temp";
import { DesktopPlayer, DesktopPlayerProps } from "./DesktopPlayer";



export default {
    component: DesktopPlayer,
    title: 'DesktopPlayer',
    tags: ['autodocs'],
    decorators: [(story: any) => <div class='m-5'>
        <div style={{
            zIndex: -99,
            backgroundImage: `url('${api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid })}')`,
            filter: 'blur(200px)'
        }}
            class='absolute inset-0 bg-cover bg-center z-0'></div>
        <div class='min-w-58'>{story()}</div>
    </div>],
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
        trackCoverUrl: api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid}),
        queue: []
    } as DesktopPlayerProps
};
