import SidePill from "@/components/SidePill";
import { Outlet, createRootRoute, createRouter } from "@tanstack/react-router";
import { albumsRoute, artistsRoute, libraryScreen, madeForYouRoute, songsRoute, uploadRoute } from "./library";
import { playerScreen } from "./player";
import { searchScreen } from "./search";

export const rootRoute = createRootRoute({
    component: () => (
      <>
        <SidePill />
        <div>
          <Outlet />
        </div>
      </>
    )
  })

const routeTree = rootRoute.addChildren([libraryScreen, playerScreen, searchScreen, madeForYouRoute, songsRoute, albumsRoute, artistsRoute, uploadRoute])

export const router = createRouter({ routeTree })
