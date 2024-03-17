import { RouterProvider, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import MainPage from "./components/pages/MainPage";
import SidePill from "./components/SidePill";
import BubblePlayer from "./components/BubblePlayer";
import Page from "./components/pages/Page";
import AlbumCard from "./components/common/AlbumCard";
import TrackCard from "./components/common/TrackCard";
import ArtistCard from "./components/common/ArtistCard";
import PlaylistCard from "./components/common/PlaylistCard";
import { Track, api } from "./api";
import { responseToObject } from "./utils/hellpers";
import { Provider } from "react-redux";
import { store } from "./redux/store";


const rootRoute = createRootRoute({
  component: () => (
    <>
      <SidePill />
      <MainPage />
      <div class="absolute bottom-28 w-full">
        <BubblePlayer />
      </div>
    </>
  )
})

const madeForYouRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/made-for-you',
  component: () => <Page title="Made For You" list={[...Array(8).keys()].map(() => <PlaylistCard />)} wrap />
})

const songsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/songs',
  component: ({ }) => {
    return <Page title="Songs" list={songsRoute.useLoaderData().map((track) => <TrackCard track={track} />)} col />
  },
  loader: () => fetch(api.forTracks({page: 0, limit: 1000})).then(responseToObject) as Promise<Track[]>
})

const albumsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/albums',
  component: () => <Page title="Albums" list={[...Array(8).keys()].map(() => <AlbumCard />)} wrap />
})

const artistsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/artists',
  component: () => <Page title="Artists" list={[...Array(8).keys()].map(() => <ArtistCard />)} wrap />
})


const routeTree = rootRoute.addChildren([madeForYouRoute, songsRoute, albumsRoute, artistsRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
