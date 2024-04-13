import { createRoute } from "@tanstack/react-router";
import { rootRoute } from ".";
import SearchPage from "@/components/Search/SearchPage";
import SidePill from "@/components/SidePill";


export const searchScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/search',
    component: () => <>
        <SidePill />
        <SearchPage />
    </>

})



