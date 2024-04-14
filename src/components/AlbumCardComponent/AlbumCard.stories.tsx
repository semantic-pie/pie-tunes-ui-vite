import { api } from "@/api";
import { testTrack } from "../common/temp";
import { AlbumCard, AlbumCardProps } from "./AlbumCard";



export default {
    component: AlbumCard,
    title: 'Album Card',
    tags: ['autodocs'],
    decorators: [(story: any) => <div class='m-5 bg-black bg-opacity-15 border-black rounded-md'>
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
        album: testTrack.musicAlbum,
        albumCoverUrl: api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid }),
    } as AlbumCardProps
};
