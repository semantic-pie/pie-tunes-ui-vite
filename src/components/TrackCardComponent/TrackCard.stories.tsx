import { api } from "@/api";
import { doNothing, testTrack } from "../common/temp";
import { TrackCard, TrackCardProps } from "./TrackCard";



export default {
    component: TrackCard,
    title: 'TrackCard',
    tags: ['autodocs'],
    decorators: [(story: any) => <div class='m-5 bg-black bg-opacity-15 border-black rounded-md'>
        <div style={{
            zIndex: -99,
            backgroundImage: `url('${api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid })}')`,
            filter: 'blur(200px)'
        }}
            class='absolute inset-0 bg-cover bg-center z-0'></div>
        {story()}
    </div>],
};


export const Default = {
    args: {
        onTrackClick: doNothing,
        track: testTrack,
        trackCoverUrl: api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid }),
        likeButton: true,
        liked: false,
        selected: false

    } as TrackCardProps,
};

export const Liked = {
    args: {
        ...Default.args,
        liked: true
    },
};

export const Selected = {
    args: {
        ...Default.args,
        selected: true
    },
};

export const SmallWidth = {
    args: {
        ...Default.args,
    },
};