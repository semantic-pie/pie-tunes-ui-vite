import BubblePlayer from "@/components/BubblePlayer"
import DevUploader from "@/components/DevUploader"
import AlbumCard from "@/components/common/AlbumCard"
import ArtistCard from "@/components/common/ArtistCard"
import PlaylistCard from "@/components/common/PlaylistCard"
import TrackCard from "@/components/common/TrackCard"
import MainPage from "@/components/pages/MainPage"
import Page from "@/components/pages/Page"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "."
import { useAppSelector } from "@/redux/store"


export const libraryScreen = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: () => (<>
    <MainPage />
    <div class="absolute bottom-0 sm:bottom-28 w-full">
      <BubblePlayer />
    </div>
  </>)
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
    return <Page title="Songs" list={useAppSelector(state => state.queue).map((track) => <TrackCard track={track} />)} col />
  }
})

export const albumsRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/albums',
  component: () => <Page title="Albums" list={useAppSelector(state => state.albums).map((album) => <AlbumCard album={album} />)} wrap />,
})

export const artistsRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/artists',
  component: () => <Page title="Artists" list={useAppSelector(state => state.artists).map((artist) => <ArtistCard band={artist} />)} wrap />,
})

export const uploadRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/upload',
  component: () => <DevUploader />
})

