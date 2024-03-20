import { createRoute } from "@tanstack/react-router";
import { rootRoute } from ".";
import Player from "@/components/Player";

export const playerScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/player',
    component: () => <Player />
})


