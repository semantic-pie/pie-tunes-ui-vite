import { api } from "@/api";
import { testPLaylist, testTrack } from "../common/temp";
import { PlaylistCard, PlaylistCardProps } from "./PlaylistCard";



export default {
    component: PlaylistCard,
    title: 'Playlist Card',
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
        playlist: testPLaylist,
        playlistCoverUrl: api.urlForTrackCoverById({ id: 'dailyplaylist.jpeg' })
    } as PlaylistCardProps
};
