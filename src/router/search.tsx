import { createRoute } from "@tanstack/react-router";
import { rootRoute } from ".";
import SearchPage from "@/components/Search/SearchPage";


export const searchScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/search',
    component: () => <SearchPage />
})



