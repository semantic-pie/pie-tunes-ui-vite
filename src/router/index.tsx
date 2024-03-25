import SidePill from "@/components/SidePill";
import { Outlet, createRootRoute, createRouter } from "@tanstack/react-router";
import { albumViewRoute, albumsRoute, artistsRoute, libraryScreen, madeForYouRoute, songsRoute, uploadRoute } from "./library";
import { playerScreen } from "./player";
import { searchScreen } from "./search";
import { useEffect } from "preact/hooks";
import { api } from "@/api";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { ENTITY_PER_PAGE, albums, artists, tracks, useAppDispatch, useAppSelector } from "@/redux/store";
import { colorHook } from "@/utils/colorHook";
import { pieApiClient } from "@/api/client";

export const rootRoute = createRootRoute({
  component: () => {
    colorHook()

    const dispatch = useAppDispatch()

    const songsPages = useAppSelector(state => state.library.songsPages)
    const currentTrack = useAppSelector(state => state.currentTrack)

    const { load } = useGlobalAudioPlayer()

    useEffect(() => {
      pieApiClient.findArtistsDeprecated({ page: 0, limit: 1000, query: 'iqnore' })
        .then(({ data }) => dispatch(artists(data)))

      pieApiClient.findAlbumsDeprecated({ page: 0, limit: 1000, query: 'iqnore' })
        .then(({ data }) => dispatch(albums(data)))
    }, [])

    useEffect(() => {
      pieApiClient.findTrackDeprecated({ page: songsPages, limit: ENTITY_PER_PAGE, query: 'iqnore'})
        .then(({ data }) => dispatch(tracks(data)))
    }, [songsPages])

    useEffect(() => {
      if (currentTrack) {
        load(api.urlForTrackStreamById({ id: currentTrack.uuid }), {
          html5: true,
          format: 'mp3',
          autoplay: true
        })
      }
    }, [currentTrack])

    return (
      <div class='flex flex-col sm:flex-row justify-start sm:mx-[2%] sm:gap-[2%] xl:mx-[5%] xl:gap-[5%] h-[100dvh]'>
        <SidePill />
        <Outlet />
      </div>
    )
  }

})



const routeTree = rootRoute.addChildren([libraryScreen, playerScreen, searchScreen, madeForYouRoute, songsRoute, albumsRoute, artistsRoute, uploadRoute, albumViewRoute])

export const router = createRouter({ routeTree })

{/* <div class='flex flex-col'>

<div class='flex'>
  {rgbs1?.map(r => (<span style={{backgroundColor: r}} class={`w-20 h-4 text-[8px] text-opacity-50`}>{r}</span>)) }
</div>
<div class='flex'>
  {/* {rgbs2?.map(r => (<span style={{backgroundColor: toRgb(r)}} class={`w-20 h-4 text-[8px] text-opacity-50`}>{toRgb(r)}</span>)) } */}
//   {rgbs2?.map(r => (<span style={{backgroundColor: r}} class={`w-20 h-4 text-[8px] text-opacity-50`}>{r}</span>)) }
// </div>
// </div> */}