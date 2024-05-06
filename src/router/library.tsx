import MainPage from "@/components/pages/MainPage"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "."
import { useAppDispatch, useAppSelector } from "@/redux/store"
import AlbumsPage from "@/components/pages/AlbumsPage"
import TracksPage from "@/components/pages/TracksPage"
import ArtistsPage from "@/components/pages/ArtistsPage"
import MadeForYouPage from "@/components/pages/MadeForYouPage"
import PlaylistPage from "@/components/pages/PlaylistPage"
import { pieApiClient } from "@/api/client"
import { BubblePlayerWrapper } from "@/components/BubblePlayerComponent/BubblePlayerWrapper"
import { TrackUploaderWrapper } from "@/components/TrackUploaderComponent/TrackUploaderWrapper"
import { SidePillWrapper } from "@/components/SidePillComponent/SidePillWrapper"
import { useEffect } from "preact/hooks"
import { fetchGenrePlaylists, fetchNextAlbumsPage, fetchNextBandsPage, fetchNextSongsPage, fetchPlaylists } from "@/redux/slices/dataSlice"
import AlbumPage from "@/components/pages/AlbumPage"
import ArtistPage from "@/components/pages/ArtistPage"

export const libraryScreen = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: () => {
    const dispatch = useAppDispatch()
    const track = useAppSelector(state => state.player.queue.currentTrack)
    const page = useAppSelector(state => state.library.songs.page)

    useEffect(() => {
      if (page === 0) {
        dispatch(fetchPlaylists())
        dispatch(fetchGenrePlaylists())
        dispatch(fetchNextAlbumsPage())
        dispatch(fetchNextSongsPage())
        dispatch(fetchNextBandsPage())
      }
    }, [])

    return (
      <>
        <SidePillWrapper />
        <div class='h-dvh w-full sm:w-auto sm:h-auto flex flex-col sm:gap-5 sm:mx-auto sm:my-auto'>
          <MainPage />

          {track && <div class="w-full mt-auto">
            <BubblePlayerWrapper />
          </div>}

        </div>
      </>
    )
  }
})


export const madeForYouRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/made-for-you',
  component: () => <MadeForYouPage />
})

export const madeForYouViewRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/made-for-you/$playlistId',
  loader: ({ params }) => pieApiClient.findTrackByPlaylist({ uuid: params.playlistId }).then(response => response.data),
  component: () => <PlaylistPage />
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
  path: '/albums',
  component: () => <AlbumsPage />
})

export const albumViewRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/albums/$albumId',
  loader: ({ params }) => pieApiClient.findAlbumsByUuid({ uuid: params.albumId }).then(data => data.data),
  component: () => <AlbumPage />
})

export const artistsRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/artists',
  component: () => <ArtistsPage />
})

export const artistViewRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/artists/$artistId',
  loader: ({ params }) => pieApiClient.findArtistsByUuid({ uuid: params.artistId }).then(data => data.data),
  component: () => <ArtistPage />
})

export const racentsRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/racent',
  component: () => <div></div>
})

export const uploadRoute = createRoute({
  getParentRoute: () => libraryScreen,
  path: '/upload',
  component: () =>
    <div class='h-full w-full ralative flex'>
      <TrackUploaderWrapper />
    </div>

})

