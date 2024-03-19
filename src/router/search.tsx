import { createRoute } from "@tanstack/react-router";
import { rootRoute } from ".";


export const searchScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/serach',
    component: () => <div></div>
})


