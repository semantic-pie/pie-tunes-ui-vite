import { api } from "@/api";
import { TrackCard, TrackCardProps } from "./TrackCard";
import { doNothing, testTrack } from "../stories/test-entities";
import { WrappWithBlurAndRedux } from "../stories/test-wrappers";



export default {
    component: TrackCard,
    title: 'Track Card',
    tags: ['autodocs'],
    decorators: [(story: any) => <WrappWithBlurAndRedux>{story()}</WrappWithBlurAndRedux>],
};


export const Default = {
    args: {
        onTrackClick: doNothing,
        track: {...testTrack, isLiked: false},
        trackCoverUrl: api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid }),
        selected: false,
    } as TrackCardProps,
};

export const Liked = {
    args: {
        ...Default.args,
        track: {...testTrack, isLiked: true},
    },
};

export const Selected = {
    args: {
        ...Default.args,
        selected: true
    },
};
