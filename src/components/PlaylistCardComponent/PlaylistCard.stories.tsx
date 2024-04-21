import { api } from "@/api";
import { PlaylistCard, PlaylistCardProps } from "./PlaylistCard";
import { WrappWithBlur } from "../stories/test-wrappers";
import { testPLaylist } from "../stories/test-entities";



export default {
    component: PlaylistCard,
    title: 'Playlist Card',
    tags: ['autodocs'],
    decorators: [(story: any) => <WrappWithBlur><div class='max-w-52'>{story()}</div></WrappWithBlur>],
};


export const Default = {
    args: {
        playlist: testPLaylist,
        playlistCoverUrl: api.urlForTrackCoverById({ id: 'dailyplaylist.jpeg' })
    } as PlaylistCardProps
};
