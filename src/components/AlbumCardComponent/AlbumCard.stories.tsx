import { api } from "@/api";
import { AlbumCard, AlbumCardProps } from "./AlbumCard";
import { WrappWithBlur } from "../stories/test-wrappers";
import { testTrack } from "../stories/test-entities";



export default {
    component: AlbumCard,
    title: 'Album Card',
    tags: ['autodocs'],
    decorators: [(story: any) => <div class='max-w-52'><WrappWithBlur>{story()}</WrappWithBlur></div>],
};


export const Default = {
    args: {
        album: testTrack.musicAlbum,
        albumCoverUrl: api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid }),
    } as AlbumCardProps
};
