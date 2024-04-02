import SidePill from "@/components/SidePill";
import { Outlet, createRootRoute, createRouter } from "@tanstack/react-router";
import { albumViewRoute, albumsRoute, artistsRoute, libraryScreen, madeForYouRoute, madeForYouViewRoute, songsRoute, uploadRoute } from "./library";
import { playerScreen, sharePlayerScreen } from "./player";
import { searchScreen } from "./search";
import { useEffect } from "preact/hooks";
import { api } from "@/api";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { ENTITY_PER_PAGE, albums, artists, playlists, tracks, useAppDispatch, useAppSelector } from "@/redux/store";
import { pieApiClient } from "@/api/client";
import { blureBackgroundHook } from "@/utils/blureBackgroundHook";
import { useNavigatorMediaSessionHook } from "@/utils/useNavigatorMediaSessionHook";
import { config, userUuid } from "@/appConfiguration";
import { Helmet } from '@notwoods/preact-helmet'

export const rootRoute = createRootRoute({
  component: () => {
    blureBackgroundHook()
    useNavigatorMediaSessionHook()

    const { load } = useGlobalAudioPlayer()

    const dispatch = useAppDispatch()

    const songsPages = useAppSelector(state => state.library.songsPages)
    const artistsPages = useAppSelector(state => state.library.artistsPages)
    const albumsPages = useAppSelector(state => state.library.albumsPages)

    const currentTrack = useAppSelector(state => state.currentTrack)

    useEffect(() => {
      pieApiClient.findPlaylistsByDate({ userUuid })
        .then(({ data }) => {
          dispatch(playlists(data))
        })
    }, [])

    useEffect(() => {
      pieApiClient.findArtistsDeprecated({ page: artistsPages * ENTITY_PER_PAGE, limit: ENTITY_PER_PAGE, query: 'iqnore' })
        .then(({ data }) => {
          dispatch(artists(data))
        })
    }, [artistsPages])

    useEffect(() => {
      pieApiClient.findAlbumsDeprecated({ page: albumsPages * ENTITY_PER_PAGE, limit: ENTITY_PER_PAGE, query: 'iqnore' })
        .then(({ data }) => {
          dispatch(albums(data))
        })
    }, [albumsPages])

    useEffect(() => {
      pieApiClient.findTrackByDate({ page: songsPages, limit: ENTITY_PER_PAGE, userUuid })
        .then(({ data }) => {
          dispatch(tracks(data))
          // if (songsPages === 0)
          //   dispatch(playTrack(data[0])) //Vladimir: я закомитил это потому что иначе не работают /player/{uuid}
        })
    }, [songsPages])

    useEffect(() => {
      if (currentTrack) {
        load(api.urlForTrackStreamById({ id: currentTrack.uuid }), {
          html5: true,
          format: 'mp3',
          autoplay: true
        })
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: currentTrack.title,
            artist: currentTrack.band.name,
            album: currentTrack.album.name,
            artwork: [{ src: api.urlForTrackCoverById({ id: currentTrack.album.uuid }), type: 'image/png' }]

          });
        }
      }
    }, [currentTrack])

    // const nav = useNavigate()

    // useEffect(() => {
    //   nav({ from: '/', to: '/library/songs'})
    // }, [])

    return (
      <div class='relative flex flex-col w-full sm:flex-row h-dvh'>
        <Helmet meta={[
          { name: "title", content: `Pie Tunes` },
          { name: "description", content: `Awesome music service` },
          { property: "og:title", content: `Pie Tunes` },
          { property: "og:site_name", content: `@pietunes` },
          { property: "og:description", content: `Awesome music service` },
          // { property: "og:image", content: api.urlForTrackCoverById({ id: track.album.uuid }) },
          // { property: "og:image:width", content: '400' },
          // { property: "og:image:height", content: '400' },
          { property: "og:url", content: `${config.host.domain}` },
          // { property: "og:type", content: 'music.song' },
          { property: "twitter:card", content: "summary" },
          { property: "twitter:site", content: "Pie Tunes" },
          // { property: "twitter:image", content: api.urlForTrackCoverById({ id: track.album.uuid }) },
          { property: "twitter:title", content: "Pie Tunes" },
          { property: "twitter:description", content: `Awesome music service` },
          // { name: "type", content: "mp3" }
        ]} title={`Pie Tunes`} />
        <SidePill />
        <Outlet />
      </div>
    )
  }

})

const routeTree = rootRoute.addChildren([libraryScreen, playerScreen, sharePlayerScreen, searchScreen, madeForYouRoute, madeForYouViewRoute, songsRoute, albumsRoute, artistsRoute, uploadRoute, albumViewRoute])

export const router = createRouter({ routeTree })
