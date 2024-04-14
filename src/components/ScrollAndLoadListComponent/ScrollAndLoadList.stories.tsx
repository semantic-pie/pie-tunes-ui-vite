import type { Meta, StoryObj } from '@storybook/preact';
import { ScrollAndLoadList } from './ScrollAndLoadList';
import { TrackCard } from '@components/TrackCardComponent/TrackCard';
import { api } from '@/api';
import { testTrack } from '../common/temp';
import { Default as AlbumDefault } from '../AlbumCardComponent/AlbumCard.stories';
import { Default as ArtistDefault } from '@components/ArtistCardComponent/ArtistCard.stories'

import { Default, Selected, Liked } from '@components/TrackCardComponent/TrackCard.stories';
import { AlbumCard } from '../AlbumCardComponent/AlbumCard';
import { ArtistCard } from '../ArtistCardComponent/ArtistCard';

const backgroundImage = <div style={{ zIndex: -99, backgroundImage: `url('${api.urlForTrackCoverById({ id: testTrack.musicAlbum.uuid })}')`, filter: 'blur(200px)' }}
    class='absolute inset-0 bg-cover bg-center'></div>


const meta: Meta<typeof ScrollAndLoadList> = {
    title: 'Scroll And Load List',
    tags: ['autodocs'],
    decorators:
        [(story: any) => <div class='w-full p-1 h-[300px] bg-black bg-opacity-15 border-dashed border-[2px] border-black '>{story()}</div>,
        (story: any) => <div>{backgroundImage}{story()}</div>],
    component: ScrollAndLoadList,
    subcomponents: { TrackCard },

};

export default meta;

type Story = StoryObj<typeof ScrollAndLoadList>;

export const Empty: Story = {
    args: {}
};


export const WithTracks: Story = {
    args: {
        children: (
            <>
                <TrackCard {...Default.args} />
                <TrackCard {...Selected.args} />
                <TrackCard {...Default.args} />
                <TrackCard {...Liked.args} />
                <TrackCard {...Default.args} />
                <TrackCard {...Default.args} />
                <TrackCard {...Liked.args} />
                <TrackCard {...Default.args} />
                <TrackCard {...Default.args} />
                <TrackCard {...Liked.args} />
            </>
        )
    } as any
};

export const WithAlbums: Story = {
    args: {
        gridLayout: true,
        children: (
            <>
                <AlbumCard {...AlbumDefault.args} />
                <AlbumCard {...AlbumDefault.args} />
                <AlbumCard {...AlbumDefault.args} />
                <AlbumCard {...AlbumDefault.args} />
                <AlbumCard {...AlbumDefault.args} />
            </>
        )
    } as any
};

export const WithArtist: Story = {
    args: {
        gridLayout: true,
        children: (
            <>
                <ArtistCard {...ArtistDefault.args} />
                <ArtistCard {...ArtistDefault.args} />
                <ArtistCard {...ArtistDefault.args} />
                <ArtistCard {...ArtistDefault.args} />
                <ArtistCard {...ArtistDefault.args} />
            </>
        )
    } as any
};

