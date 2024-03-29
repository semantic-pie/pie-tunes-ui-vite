import BubblePlayer from "@/components/BubblePlayer"
import DevUploader from "@/components/DevUploader"
import ArtistCard from "@/components/common/ArtistCard"
import PlaylistCard from "@/components/common/PlaylistCard"
import MainPage from "@/components/pages/MainPage"
import Page from "@/components/pages/Page"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "."
import { useAppSelector } from "@/redux/store"
import AlbumPage from "@/components/pages/AlbumPage"
import AlbumsPage from "@/components/pages/AlbumsPage"
import TracksPage from "@/components/pages/TracksPage"


export const libraryScreen = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: () => {
    const track = useAppSelector(state => state.currentTrack)
    return (<div class='relative flex flex-col my-auto sm:gap-5'>
      <MainPage />
      {track && <div class="absolute bottom-[-100px] w-full">
        <BubblePlayer />
      </div>}

    </div>)
  }

})


export const madeForYouRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/made-for-you',
  component: () => <Page title="Made For You" list={[...Array(8).keys()].map(() => <PlaylistCard />)} wrap />
})

export const songsRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/songs',
  component: ({ }) => {
    return <TracksPage />
  }
})

export const albumsRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/albums/',
  component: () => <AlbumsPage />
})

export const albumViewRoute = createRoute({
  getParentRoute: () => albumsRoute,
  path: '/$albumId',
  component: () => <AlbumPage />
})

export const artistsRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/artists',
  component: () => <Page title="Artists" list={useAppSelector(state => state.library.artists).map((artist) => <ArtistCard band={artist} />)} wrap />,
})

export const uploadRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/upload',
  component: () => <DevUploader />
})

