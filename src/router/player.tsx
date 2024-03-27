import { createRoute } from "@tanstack/react-router";
import { rootRoute } from ".";
import Player from "@/components/Player";
import MobilePlayer from "@/components/MobilePlayer";

export const playerScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/player',
    component: () => {
        const isMobile = window.innerWidth < 640

        if (isMobile) return <MobilePlayer />
        else return <Player />
        
    }
})


