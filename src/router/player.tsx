import { createRoute } from "@tanstack/react-router";
import { rootRoute } from ".";

export const playerScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/player',
    component: () => <div></div>
})


