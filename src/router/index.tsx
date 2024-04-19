import { Outlet, createRootRoute, createRouter, useNavigate } from "@tanstack/react-router";
import { albumViewRoute, albumsRoute, artistsRoute, libraryScreen, madeForYouRoute, madeForYouViewRoute, racentsRoute, songsRoute, uploadRoute } from "./library";
import { playerScreen, sharePlayerScreen } from "./player";
import { searchScreen } from "./search";
import { loginRoute, signUpRoute } from "./auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchForUser } from "@/redux/slices/userSlice";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useEffect } from "preact/hooks";
import { api } from "@/api";
import { playNextQueueTrack } from "@/redux/slices/playerSlice";
import { blureBackgroundHook } from "@/utils/blureBackgroundHook";
import { useNavigatorMediaSessionHook } from "@/utils/useNavigatorMediaSessionHook";
import { useSignal } from "@preact/signals";
import { PageNotFoundWrapper } from "@/components/PageNotFoundComponent/PageNotFoundWrapper";

export const rootRoute = createRootRoute({
  component: () => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const user = useAppSelector(state => state.user.user)

    const userIsFetched = useSignal(false)

    useEffect(() => {
      if (!user) {
        dispatch(fetchForUser()).finally(() => {
          userIsFetched.value = true
        })
      }

    }, [user])

    if (!user) {
      if (userIsFetched.value) nav({ to: '/auth/signup' })
      if (!userIsFetched.value) return <div></div>

      nav({ to: '/auth/signup' })
    }

    // redirect from empty page
    if (location.pathname === '/') location.pathname = '/library/songs'

    const { load } = useGlobalAudioPlayer()
    const currentTrack = useAppSelector(state => state.player.queue.currentTrack)
    const trackInPlayerUuid = useSignal<string|undefined>(undefined) 

    useEffect(() => {
      if (currentTrack && currentTrack.uuid != trackInPlayerUuid.value) {
        console.log('change current track: ', currentTrack)
        load(api.urlForTrackStreamById({ id: currentTrack.uuid }), {
          html5: true,
          format: 'mp3',
          autoplay: true,
          onend: () => { dispatch(playNextQueueTrack()) }
        })
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: currentTrack.title,
            artist: currentTrack.musicBand.name,
            album: currentTrack.musicAlbum.name,
            artwork: [{ src: api.urlForTrackCoverById({ id: currentTrack.musicAlbum.uuid }), type: 'image/png' }]

          });
        }
        trackInPlayerUuid.value = currentTrack.uuid
      }
    }, [currentTrack])

    blureBackgroundHook()
    useNavigatorMediaSessionHook()

    return <div class='h-dvh ralative flex'>
      <Outlet />
    </div>
  },
  notFoundComponent: PageNotFoundWrapper
})

const routeTree = rootRoute.addChildren([
  libraryScreen, playerScreen, sharePlayerScreen,
  searchScreen, madeForYouRoute, madeForYouViewRoute,
  songsRoute, albumsRoute, artistsRoute, uploadRoute,
  albumViewRoute, signUpRoute, loginRoute
  // racentsRoute
])

export const router = createRouter({ routeTree })
