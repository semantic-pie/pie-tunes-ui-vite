import { globalSearch, useAppDispatch, useAppSelector } from "@/redux/store"
import { useSearchQuery } from "@/utils/useSearchQuery"
import { useSignal } from "@preact/signals"
import { useEffect, useRef } from "preact/hooks"
import GlobalSearchInput from "./GlobalSearchInput"
import TrackCard from "../common/TrackCard"
import AlbumCard from "../common/AlbumCard"
import ArtistCard from "../common/ArtistCard"
import SnoopySearch from "./SnoopySearch"
import BubblePlayer from "../BubblePlayer"

const SearchPage = () => {
    const dispatch = useAppDispatch()

    const {
        currentTrack: track,
        search: searchResult
    } = useAppSelector(state => state)


    const controller = useRef<AbortController>()
    const containerHeight = useSignal<{ height: number }>(window.innerWidth < 640 ? { height: window.innerHeight - 90 } : { height: window.innerHeight - 400 })

    const { searchQuery, changeSearchQuery } = useSearchQuery((query) => {
        if (controller.current) controller.current.abort()
        controller.current = new AbortController()

        dispatch(globalSearch(query, controller.current))
    })



    const isSearchMode = searchQuery.length > 0

    useEffect(() => {
        containerHeight.value = window.innerWidth < 640 ? { height: window.innerHeight - 90 } : { height: window.innerHeight - 400 }
    }, [screen.height])

    return (<div class={`h-dvh sm:w-[1000px] flex flex-col sm:mx-auto ${isSearchMode ? 'gap-2 sm:gap-4' : 'sm:mt-[20%] gap-16'}`}>
        <GlobalSearchInput class={`center w-full sm:w-[1000px] sm:transform transition-all duration-200`} value={searchQuery} setValue={changeSearchQuery} />

        {isSearchMode &&
            <div class={`flex sm:w-[1000px] flex-col sm:mx-auto gap-5 overflow-x-hidden overflow-y-scroll rounded-[29px]`}>
                {searchResult.songs.length > 0 &&
                    <div class='w-full flex flex-col rounded-[29px] bg-black bg-opacity-15 px-5 gap-5 py-4 backdrop-blur-[60px]'>
                        <h2 class='text-[28px] font-bold'>Tracks</h2>
                        <div>
                            <div class={`w-full ${searchResult.songs.length > 4 ? 'h-[250px]' : 'h-fit'}  flex flex-col gap-4 overflow-y-scroll`}>
                                {searchResult.songs.map(t => (<TrackCard track={t} addButton />))}
                            </div>
                        </div>
                    </div>

                }

                    {searchResult.albums.length > 0 &&
                        <div class='w-full sm:w-fit mx-auto flex flex-col rounded-[29px] bg-black bg-opacity-15 px-5 py-2 backdrop-blur-[60px]'>
                            <h2 class='text-[28px] font-bold'>Albums</h2>
                            <div class={`flex flex-col sm:grid sm:grid-cols-4 gap-3 overflow-x-scroll `}>
                                {searchResult.albums.map((a) => <AlbumCard album={a} />)}
                            </div>
                        </div>
                    }

                    {searchResult.bands.length > 0 &&
                        <div class='w-full sm:w-fit mx-auto flex flex-col rounded-[29px] bg-black bg-opacity-15 px-5 py-2 backdrop-blur-[60px]'>
                            <h2 class='text-[28px] font-bold'>Artits</h2>
                            <div class={`flex flex-col sm:grid sm:grid-cols-4 gap-3 overflow-x-scroll `}>
                                {searchResult.bands.map((b) => <ArtistCard band={b} />)}
                            </div>
                        </div>
                    }

                {isSearchMode && searchQuery.length > 4 && <SnoopySearch query={searchQuery} />}
            </div>}


        {track && <div class={`mt-auto sm:mt-0 sm:w-full transition-all duration-200`}>
            <BubblePlayer />
        </div>}

    </div>)
}

export default SearchPage