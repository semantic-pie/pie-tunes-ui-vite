import BubblePlayer from "@/components/BubblePlayer"
import DevUploader from "@/components/DevUploader"
import MainPage from "@/components/pages/MainPage"
import { createRoute, useNavigate } from "@tanstack/react-router"
import { rootRoute } from "."
import { useAppSelector } from "@/redux/store"
import AlbumPage from "@/components/pages/AlbumPage"
import AlbumsPage from "@/components/pages/AlbumsPage"
import TracksPage from "@/components/pages/TracksPage"
import ArtistsPage from "@/components/pages/ArtistsPage"
import MadeForYouPage from "@/components/pages/MadeForYouPage"


export const libraryScreen = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: () => {
    const track = useAppSelector(state => state.currentTrack)
    const nav = useNavigate()

    nav({ from: '/library', to: '/library/songs' })

    return (
      <div class=' flex flex-col sm:gap-5 sm:mx-auto sm:my-auto'>
        <MainPage />

        {track && <div class="w-full">
          <BubblePlayer />
        </div>}

      </div>)
  }
})


export const madeForYouRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/made-for-you',
  component: () => <MadeForYouPage />
})

export const madeForYouViewRoute = createRoute({
  getParentRoute: () => madeForYouRoute,
  path: '/$playlist',
  component: () => <div>kek</div>
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
  component: () => <ArtistsPage />
})

export const uploadRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/upload',
  component: () => <DevUploader />
})

