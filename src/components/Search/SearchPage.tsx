import { useAppDispatch, useAppSelector } from "@/redux/store"
import { useSearchQuery } from "@/utils/useSearchQuery"
import { useSignal } from "@preact/signals"
import { useEffect, useRef } from "preact/hooks"
import GlobalSearchInput from "./GlobalSearchInput"
import SnoopySearch from "./SnoopySearch"
import { fetchForGlobalSearch } from "@/redux/slices/searchSlice"
import { BubblePlayerWrapper } from "../BubblePlayerComponent/BubblePlayerWrapper"
import { TrackCardWrapper } from "../TrackCardComponent/TrackCardWrapper"
import { AlbumCardWrapper } from "../AlbumCardComponent/AlbumCardWrapper"
import { ArtistCardWrapper } from "../ArtistCardComponent/ArtistCardWrapper"

const SearchPage = () => {
    const dispatch = useAppDispatch()

    const currentTrack = useAppSelector(state => state.player.queue.currentTrack)
    const { albums, bands, songs } = useAppSelector(state => state.search.result)


    const controller = useRef<AbortController>()
    const containerHeight = useSignal<{ height: number }>(window.innerWidth < 640 ? { height: window.innerHeight - 90 } : { height: window.innerHeight - 400 })

    const { searchQuery, changeSearchQuery } = useSearchQuery((query) => {
        if (controller.current) controller.current.abort()
        controller.current = new AbortController()

        dispatch(fetchForGlobalSearch({ query, controller: controller.current }))
    })

    const isSearchMode = searchQuery.length > 0

    useEffect(() => {
        containerHeight.value = window.innerWidth < 640 ? { height: window.innerHeight - 90 } : { height: window.innerHeight - 400 }
    }, [screen.height])

    return (<div class={`h-dvh w-full flex flex-col sm:mx-auto  ${isSearchMode ? 'gap-2 sm:gap-4' : 'sm:mt-[20%] gap-16'} transition-all duration-200`}>
        <GlobalSearchInput class={`center mx-1 mt-1 sm:mx-auto  sm:w-[1000px] sm:transform transition-all duration-200`} value={searchQuery} setValue={changeSearchQuery} />

        {isSearchMode &&
            <div class={`flex sm:w-full flex-col sm:mx-auto gap-5 ml-[6px] overflow-x-hidden  overflow-y-scroll rounded-md sm:rounded-[29px]`}>
                {songs.length > 0 &&
                    <div class='w-full sm:w-[1000px] mx-auto flex flex-col rounded-md sm:rounded-[29px] bg-black bg-opacity-15 px-2 sm:px-5 gap-5 py-4 backdrop-blur-[60px]'>
                        <h2 class='text-[28px] font-bold'>Tracks</h2>
                        <div>
                            <div class={`w-full ${songs.length > 4 ? 'h-[250px]' : 'h-fit'}  flex flex-col gap-4 overflow-y-scroll`}>
                                {songs.map(t => (<TrackCardWrapper track={t} contextQueue={songs} search />))}
                            </div>
                        </div>
                    </div>

                }

                {albums.length > 0 &&
                    <div class='w-full mx-auto sm:w-[1000px] flex flex-col rounded-md sm:rounded-[29px] bg-black bg-opacity-15 px-2 sm:px-5 py-2 backdrop-blur-[60px]'>
                        <h2 class='text-[28px] font-bold'>Albums</h2>
                        <div class={`flex flex-col sm:grid sm:grid-cols-4 gap-3 overflow-x-scroll `}>
                            {albums.map((a) => <AlbumCardWrapper album={a} />)}
                        </div>
                    </div>
                }

                {bands.length > 0 &&
                    <div class='w-full mx-auto sm:w-[1000px] flex flex-col rounded-md sm:rounded-[29px] bg-black bg-opacity-15 px-2 sm:px-5 py-2 backdrop-blur-[60px]'>
                        <h2 class='text-[28px] font-bold'>Artits</h2>
                        <div class={`flex flex-col sm:grid sm:grid-cols-4 gap-3 overflow-x-scroll `}>
                            {bands.map((b) => <ArtistCardWrapper artist={b} />)}
                        </div>
                    </div>
                }

                {isSearchMode && <SnoopySearch query={searchQuery} />}
            </div>}


        {currentTrack && <div class={`mt-auto ${isSearchMode ? '!mt-auto' : ''} sm:mt-0 sm:w-full transition-all duration-300`}>
            <BubblePlayerWrapper />
        </div>}

    </div>)
}

export default SearchPage