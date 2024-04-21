import { createRoute } from "@tanstack/react-router";
import { rootRoute } from ".";
import SearchPage from "@/components/Search/SearchPage";
import { SidePillWrapper } from "@/components/SidePillComponent/SidePillWrapper";


export const searchScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/search',
    component: () => <>
        <SidePillWrapper />
        <SearchPage />
    </>

})



