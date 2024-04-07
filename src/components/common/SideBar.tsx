import Albums from "@/components/icons/Albums";
import Clock from "@/components/icons/Clock";
import MusicMicro from "@/components/icons/MusicMicro";
import MusicNote from "@/components/icons/MusicNote";
import Playlists from "@/components/icons/Playlists";
import Plus from "@/components/icons/Plus";
import ThreeDots from "@/components/icons/ThreeDots";
import User from "@/components/icons/User";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import UploadIcon from "../icons/UploadIcon";
import Search from "../icons/Search";
import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { useSwipeHook } from "@/utils/useSwipeHook";

const pages: { route: string }[] = [
    { route: '/library/songs' },
    { route: '/library/artists' },
    { route: '/library/albums' },
    { route: '/library/made-for-you' },
    { route: '/library/racent' },
    { route: '/library/upload' },
    { route: '/library/upload' }
]

const SideBar = () => {
    const ref = useRef(null)
    const router = useRouterState();
    const nav = useNavigate()

    const currentPage = useSignal<string>(router.location.pathname)

    const swipeLeft = () => {
        console.log('swipe left')
        const currentPageIndex = pages.findIndex(p => p.route === currentPage.value)
        const nextPageIndex = currentPageIndex + 1

        console.log('currentPageIndex: ', currentPageIndex)
        console.log('nextPageIndex: ', nextPageIndex)

        if (currentPageIndex != -1 && nextPageIndex < pages.length) {
            console.log('ok left')
            const next = pages[nextPageIndex].route
            currentPage.value = next
            nav({ to: next })
        }
    }

    const swipeRight = () => {
        console.log('swipe right')
        const currentPageIndex = pages.findIndex(p => p.route === currentPage.value)
        const prevPageIndex = currentPageIndex - 1

        console.log('currentPageIndex: ', currentPageIndex)
        console.log('prevPageIndex: ', prevPageIndex)

        if (currentPageIndex != -1 && prevPageIndex != -1) {
            console.log('ok right')
            const prev = pages[prevPageIndex].route
            currentPage.value = prev
            nav({ to: prev })
        }
    }

    useSwipeHook(swipeLeft, 'swiped-left', ref)
    useSwipeHook(swipeRight, 'swiped-right', ref)

    console.log(currentPage.value)
    return (
        <div ref={ref} class="sm:w-[260px] flex flex-col justify-between sm:py-5 p-2 sm:p-6 sm:gap-8 sm:sidebar">
            <div class='flex flex-row sm:flex-col sm:gap-5'>
                <div class="hidden sm:flex justify-between">
                    <div class="flex flex-col">
                        <div className="text-center  text-3xl font-bold">Library</div>
                        <div className="text-start  opacity-60 text-base font-normal ">Your Music</div>
                    </div>

                    <div class="w-8 h-8 bg-opacity-10 bg-white rounded-full flex items-center justify-center text-center">
                        <ThreeDots width="15" height="5" />
                    </div>
                </div>

                <div class="sm:mx-0 mx-5 w-full sm:w-auto justify-between flex flex-row sm:flex-col gap-1 sidebar-link-panel">
                    <Link to="/library/songs" class='sidebar-link' >
                        <div class="h-12 flex items-center gap-3">
                            <MusicNote class="w-8 h-8" />
                            <span class='hidden sm:inline'>Songs</span>
                        </div>
                    </Link>

                    <Link to="/library/artists" class='sidebar-link' >
                        <div class="h-12 flex items-center gap-3">
                            <MusicMicro class="w-8 h-8" />
                            <span class='hidden sm:inline'>Artist</span>
                        </div>
                    </Link>

                    <Link to="/library/albums" class='sidebar-link'>
                        <div class="h-12 flex items-center gap-3">
                            <Albums class="w-8 h-8" />
                            <span class='hidden sm:inline'>Albums</span>
                        </div>
                    </Link>

                    <Link to="/library/made-for-you" class='sidebar-link' >
                        <div class="h-12 flex items-center gap-3">
                            <User class="w-8 h-8" />
                            <span class='hidden sm:inline'>Made for You</span>
                        </div>
                    </Link>

                    <Link to="/library/racent" class='sidebar-link'>
                        <div class="h-12 flex items-center gap-3">
                            <Clock class="w-8 h-8" />
                            <span class='hidden sm:inline'>Recently Added</span>
                        </div>
                    </Link>

                    <Link to="/library/upload" class='sidebar-link'>
                        <div class="h-12 flex items-center gap-3">
                            <UploadIcon />
                            <span class='hidden sm:inline'>Upload</span>
                        </div>
                    </Link>


                    <Link to="/search" class='block sm:hidden sidebar-link'>
                        <div class="flex h-12 w-7 justify-center items-center gap-3">
                            <Search class={'h-5 w-5'} />
                        </div>
                    </Link>

                </div>
            </div>

            <div>
                <div className="hidden sm:inline text-start text-white text-2xl font-medium mt-8">Playlist</div>
                <div class="hidden sm:flex flex-row sm:flex-col gap-4">
                    <div class="flex items-center gap-3">
                        <Playlists class="w-8 h-8" />
                        <span class='hidden sm:inline'>All Playlists</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <Plus class="w-8 h-8" />
                        <span class='hidden sm:inline'>Add Playlist</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SideBar;