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

export const rootRoute = createRootRoute({
  // loader: loadUserOrUndefined,
  component: () => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    // const fetchedUser = rootRoute.useLoaderData()
    const user = useAppSelector(state => state.user.user)

    const userIsFetched = useSignal(false)

    useEffect(() => {
      if (!user) {
        console.log('kek')
        dispatch(fetchForUser()).finally(() => {
          userIsFetched.value = true
        })
      }
        
    }, [user])

    if (['/auth/signup', '/auth/login'].includes(location.pathname))
      return <div class='h-dvh ralative flex'>
        <Outlet />
      </div>

    console.log('user: ', user)
    console.log('userIsFetched: ', userIsFetched)
    
    if (!user && userIsFetched.value) nav({ to: '/auth/signup' })
    if (!user && !userIsFetched.value) return <></>
    if (!user) nav({ to: '/auth/signup' })

    const { load } = useGlobalAudioPlayer()
    const currentTrack = useAppSelector(state => state.player.queue.currentTrack)

    useEffect(() => {
      if (currentTrack) {
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
      }
    }, [currentTrack])

    blureBackgroundHook()
    useNavigatorMediaSessionHook()

    return <div class='h-dvh ralative flex'>
      <Outlet />
    </div>
  }
})

const routeTree = rootRoute.addChildren([
  libraryScreen, playerScreen, sharePlayerScreen,
  searchScreen, madeForYouRoute, madeForYouViewRoute,
  songsRoute, albumsRoute, artistsRoute, uploadRoute,
  albumViewRoute, racentsRoute, signUpRoute, loginRoute
])

export const router = createRouter({ routeTree })
