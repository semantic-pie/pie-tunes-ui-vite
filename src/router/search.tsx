import { createRoute } from "@tanstack/react-router";
import { rootRoute } from ".";
import { search, useAppDispatch, useAppSelector } from "@/redux/store";
import BubblePlayer from "@/components/BubblePlayer";
import { useEffect, useRef, useState } from "preact/hooks";
import Search from "@/components/icons/Search";
import { SnoopySearchTrack, pieApiClient } from "@/api/client";
import TrackCard from "@/components/common/TrackCard";
import AlbumCard from "@/components/common/AlbumCard";
import ArtistCard from "@/components/common/ArtistCard";
import { userUuid } from "@/appConfiguration";
import { toMinSec } from "@/utils/hellpers";
import UploadIcon from "@/components/icons/UploadIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import LoadingIcon from "@/components/icons/LoadingIcon";


export const searchScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/search',
    component: () => {

        const track = useAppSelector(state => state.currentTrack)
        const [query, setQuery] = useState<string>('')
        const [searchResultH, setSearchResultH] = useState<number>(window.innerHeight - 250)

        const controller = useRef<AbortController>()

        // const [res, setRes] = useState<SearchResult>()
        const searchResult = useAppSelector(state => state.search)

        const dispatch = useAppDispatch()

        const onChnage = (query: string) => {
            setQuery(query)

            if (controller.current) controller.current.abort()
            controller.current = new AbortController()

            pieApiClient.searchByTitle({ query, userUuid, controller: controller.current })
                .then(response => {
                    console.log('search:', response)
                    dispatch(search(response.data))
                })
        }

        const isSearchMode = query.length > 0


        useEffect(() => {
            const isMobile = window.innerWidth < 640

            if (isMobile) {
                setSearchResultH(window.innerHeight - 250)
            } else {
                setSearchResultH(window.innerHeight - 400)
            }
        }, [screen.height])

        return (<div class='sm:w-[950px] flex flex-col mt-auto sm:m-auto gap-[50px]'>
            <GlobalSearch class={`absolute center w-full sm:w-[1000px] ${track && !isSearchMode ? 'top-0 sm:top-[40%]' : 'sm:top-1/2 sm:-translate-y-1/2'}  ${isSearchMode ? 'sm:top-10' : 'sm:left-1/2 sm:transform sm:-translate-x-1/2'} `} value={query} setValue={onChnage} />

            {isSearchMode &&
                <div style={{ height: searchResultH }} class={`flex sm:w-[1000px] mt-[80px] sm:mt-[90px] flex-col sm:mx-auto gap-5 overflow-y-scroll`}>
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
                            <h2 class='w-fit text-[28px] font-bold'>Albums</h2>
                            <div class={`w-fit flex flex-col sm:flex-row  sm:h-72 gap-3 overflow-x-scroll `}>
                                {searchResult.albums.map((a) => <AlbumCard album={a} />)}
                            </div>
                        </div>
                    }

                    {searchResult.bands.length > 0 &&
                        <div class='w-full sm:w-fit mx-auto flex flex-col rounded-[29px] bg-black bg-opacity-15 px-5 py-2 backdrop-blur-[60px]'>
                            <h2 class='w-fit text-[28px] font-bold'>Artits</h2>
                            <div class={`w-fit flex flex-col sm:flex-row  sm:h-72 gap-3 overflow-x-scroll `}>
                                {searchResult.bands.map((b) => <ArtistCard band={b} />)}
                            </div>
                        </div>
                    }
                    {isSearchMode && query.length > 4 && <SnoopySearch query={query} />}
                </div>}


            {track && <div class={`${!isSearchMode ? 'sm:mt-[20%]' : ''}  sm:w-full`}>
                <BubblePlayer />
            </div>}

        </div>)
    }
})

type SnoopySearchTrackExtended = SnoopySearchTrack & { status?: SnoopyTrackStatus }

type SnoopySearchProps = {
    query: string
}

enum SnoopyTrackStatus {
    IN_PROCESS,
    SUCCESSFULLY,
    FAILED
}

const SnoopySearch = (props: SnoopySearchProps) => {

    const [snoopySearchResult, setSnoopySearchResult] = useState<SnoopySearchTrackExtended[]>()

    const snoopySearchFetch = () =>
        pieApiClient.searchSnoopy({ q: props.query })
            .then(data => setSnoopySearchResult(data.data))

    const changeTrackStatus = (id: string) =>
        (status: SnoopyTrackStatus) => {
            if (snoopySearchResult) setSnoopySearchResult(prev => prev!.map(t => t.id === id ? { ...t, status } : t))
        }


    console.log('snoopySearchResult: ', snoopySearchResult)

    return (
        <>
            {!snoopySearchResult ?
                <button onClick={snoopySearchFetch} class='mx-auto w-fit text-[20px] px-5 py-2 bg-black bg-opacity-15 hover:bg-opacity-20 backdrop-blur-[60px] rounded-[20px]'>Search in other music services</button>
                : <div class='w-full flex flex-col rounded-[29px] bg-black bg-opacity-15 px-5 gap-5 py-4 backdrop-blur-[60px]'>
                    <h2 class='text-[28px] font-bold'>Tracks from other sources</h2>


                    <div class={`w-full h-fit flex flex-col gap-4 overflow-y-scroll`}>
                        {snoopySearchResult.map(snoop => <SnoopyTrack snoopyTrack={snoop} changeStatus={changeTrackStatus(snoop.id)} />)}
                    </div>

                </div>}
        </>
    )
}

type SnoopyTrackProps = {
    snoopyTrack: SnoopySearchTrackExtended
    changeStatus: (status: SnoopyTrackStatus) => void
}

const SnoopyTrack = (props: SnoopyTrackProps) => {

    const upload = (query: string) => {
        if (!props.snoopyTrack.status) {
            props.changeStatus(SnoopyTrackStatus.IN_PROCESS)
            pieApiClient.uploadSnoopy({ query })
                .then(response => response.meta.status === 200 ? props.changeStatus(SnoopyTrackStatus.SUCCESSFULLY) : props.changeStatus(SnoopyTrackStatus.FAILED))
        }
       
    }

    const status = props.snoopyTrack.status

    return (
        <div class={`w-full flex flex-row justify-start items-center gap-3`}>
            <img class="w-12 h-12 rounded-md cursor-pointer" src={props.snoopyTrack.coverUrl} /> :


            <div class='w-full flex justify-between items-center'>
                <div class='cursor-pointer' >
                    <div class="text-start text-white text-base font-normal capitalize">{props.snoopyTrack.title}</div>
                    <div class="text-stasrt text-white text-opacity-60 text-sm font-normal capitalize">{props.snoopyTrack.bandName}</div>
                </div>

                <div class='flex items-center gap-3'>
                    <div onClick={() => upload(`${props.snoopyTrack.bandName} ${props.snoopyTrack.title}`)} class={`${props.snoopyTrack.status ? '' : 'cursor-pointer'}`}>
                        {
                            status != undefined ? status === SnoopyTrackStatus.IN_PROCESS ? <LoadingIcon /> : status === SnoopyTrackStatus.SUCCESSFULLY ? <CheckIcon class='w-5 h-5' /> : <CrossIcon class='w-5 h-5' /> : <UploadIcon />
                        }

                    </div>

                    <span class='test-white text-[14px] opacity-50'>
                        {toMinSec(props.snoopyTrack.lengthInMilliseconds)}
                    </span>

                </div>

            </div>


        </div>
    )
}

type GlobalSearchProps = {
    value: string
    setValue: (v: string) => void
    class?: string
}

const GlobalSearch = (props: GlobalSearchProps) => {
    return (
        <div class={`h-[70px] flex items-center sm:rounded-[29px] bg-black bg-opacity-10 px-5 gap-5 search ${props.class} z-20`}>
            <Search class='w-6 h-6 opacity-50' />
            <input value={props.value} onInput={(e) => props.setValue(e.currentTarget.value)} placeholder={'Search'} class='w-full text-white placeholder-white placeholder-opacity-75 text-[24px] text-opacity-75 bg-transparent !outline-none' type="text" />
        </div>

    )
}


