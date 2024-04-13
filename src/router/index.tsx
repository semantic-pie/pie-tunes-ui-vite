import SidePill from "@/components/SidePill";
import { Outlet, createRootRoute, createRouter } from "@tanstack/react-router";
import { albumViewRoute, albumsRoute, artistsRoute, libraryScreen, madeForYouRoute, madeForYouViewRoute, racentsRoute, songsRoute, uploadRoute } from "./library";
import { playerScreen, sharePlayerScreen } from "./player";
import { searchScreen } from "./search";
import { useEffect } from "preact/hooks";
import { api } from "@/api";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { blureBackgroundHook } from "@/utils/blureBackgroundHook";
import { useNavigatorMediaSessionHook } from "@/utils/useNavigatorMediaSessionHook";
import { config } from "@/appConfiguration";
import { Helmet } from '@notwoods/preact-helmet'
import { fetchNextAlbumsPage, fetchNextBandsPage, fetchNextSongsPage, fetchPlaylists } from "@/redux/slices/dataSlice";
import { playNextQueueTrack } from "@/redux/slices/playerSlice";

export const rootRoute = createRootRoute({
  component: () => {
    const dispatch = useAppDispatch()

    blureBackgroundHook()
    useNavigatorMediaSessionHook()

    useEffect(() => {
      dispatch(fetchPlaylists())
      dispatch(fetchNextAlbumsPage())
      dispatch(fetchNextSongsPage())
      dispatch(fetchNextBandsPage())
    }, [])

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

    return (
      <div class='relative flex flex-col w-full sm:flex-row h-dvh'>
        {/* <Helmet meta={[
          { name: "title", content: `Pie Tunes` },
          { name: "description", content: `Awesome music service` },
          { property: "og:title", content: `Pie Tunes` },
          { property: "og:site_name", content: `@pietunes` },
          { property: "og:description", content: `Awesome music service` },
          { property: "og:url", content: `${config.host.domain}` },
          { property: "twitter:card", content: "summary" },
          { property: "twitter:site", content: "Pie Tunes" },
          { property: "twitter:title", content: "Pie Tunes" },
          { property: "twitter:description", content: `Awesome music service` },
        ]} title={`Pie Tunes`} /> */}
        <SidePill />
        <Outlet />
      </div>
    )
  }
})

const routeTree = rootRoute.addChildren([libraryScreen, playerScreen, sharePlayerScreen, searchScreen, madeForYouRoute, madeForYouViewRoute, songsRoute, albumsRoute, artistsRoute, uploadRoute, albumViewRoute, racentsRoute])

export const router = createRouter({ routeTree })
