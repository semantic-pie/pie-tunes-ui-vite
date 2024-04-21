import { api } from "@/api";
import { ArtistCard, ArtistCardProps } from "./ArtistCard";
import { WrappWithBlur } from "../stories/test-wrappers";
import { testTrack } from "../stories/test-entities";



export default {
    component: ArtistCard,
    title: 'Artist Card',
    tags: ['autodocs'],
    decorators: [(story: any) => <div class='max-w-52'><WrappWithBlur>  {story()}</WrappWithBlur></div>],
};


export const Default = {
    args: {
        artist: testTrack.musicBand,
        artistCoverUrl: api.urlForTrackCoverById({ id: 'anon_artist.jpg' }),
    } as ArtistCardProps
};
