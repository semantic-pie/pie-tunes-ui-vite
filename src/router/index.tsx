import SidePill from "@/components/SidePill";
import { Outlet, createRootRoute, createRouter } from "@tanstack/react-router";
import { albumViewRoute, albumsRoute, artistsRoute, libraryScreen, madeForYouRoute, songsRoute, uploadRoute } from "./library";
import { playerScreen } from "./player";
import { searchScreen } from "./search";
import { useEffect } from "preact/hooks";
import { api } from "@/api";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { albums, artists, setQueue, useAppDispatch, useAppSelector } from "@/redux/store";
import { colorHook } from "@/utils/colorHook";
import { responseToObject } from "@/utils/hellpers";

export const rootRoute = createRootRoute({
  component: () => {
    const dispatch = useAppDispatch()

    const { load } = useGlobalAudioPlayer()
    colorHook()
    const currentTrack = useAppSelector(state => state.currentTrack)
    
    useEffect(() => {
      fetch(api.forArtsits({ page: 0, limit: 1000 }))
        .then(responseToObject)
        .then(data => dispatch(artists(data)))

      fetch(api.forAlbums({ page: 0, limit: 1000 }))
        .then(responseToObject)
        .then(data => dispatch(albums(data)))
      
      fetch(api.forTracks({ page: 0, limit: 1000 }))
        .then(responseToObject)
        .then(data => dispatch(setQueue(data)))
      
    }, [])

    useEffect(() => {
      if (currentTrack) {
        load(api.forTrackStream(currentTrack.uuid), {
          html5: true,
          format: 'mp3',
          autoplay: true
        })
      }
    }, [currentTrack])

    return (
      <>
        <SidePill />
        <div class='flex h-screen'>
          <Outlet />
        </div>
      </>
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