import { createRoute } from "@tanstack/react-router";
import { rootRoute } from ".";
import { useAppSelector } from "@/redux/store";
import BubblePlayer from "@/components/BubblePlayer";
import { useState } from "preact/hooks";
import Search from "@/components/icons/Search";
import { SearchResponseRoot, pieApiClient } from "@/api/client";
import TrackCard from "@/components/common/TrackCard";
import AlbumCard from "@/components/common/AlbumCard";
import ArtistCard from "@/components/common/ArtistCard";


export const searchScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/serach',
    component: () => {
        const track = useAppSelector(state => state.currentTrack)
        const [query, setQuery] = useState<string>('')

        const [res, setRes] = useState<SearchResponseRoot>()

        const onChnage = (query: string) => {
            setQuery(query)
            pieApiClient.searchByTitle({ query })
                .then(response => {
                    console.log('search:', response)
                    setRes(response.data)
                }

                )
        }
        return (<div class='w-[950px]  flex flex-col m-auto gap-[50px] z-10'>
            <div class='w-full h-[70px] flex items-center rounded-[29px] bg-black bg-opacity-10 px-5 gap-5 search'>
                <Search class='w-6 h-6 opacity-50' />
                <input value={query} onInput={(e) => onChnage(e.currentTarget.value)} placeholder={'Search'} class='w-full text-white text-[24px] text-opacity-75 bg-transparent !outline-none' type="text" />
            </div>

            {/* <div class=' h-[30rem] flex flex-col gap-5 overflow-y-scroll'> */}
                {res?.tracks.length && query.length > 0 &&
                    <div class='w-full flex flex-col rounded-[29px] bg-black bg-opacity-15 px-5 gap-5 py-4 backdrop-blur-[60px]'>
                        <h2 class='text-[28px] font-bold'>Tracks</h2>
                        <div>
                            <div class={`w-full ${res.tracks.length > 4 ? 'h-[250px]' : 'h-fit'}  flex flex-col gap-4 overflow-y-scroll`}>
                                {res.tracks.map(t => (<TrackCard track={{ band: { name: t.band_name }, title: t.name, uuid: t.uuid }} />))}
                            </div>
                        </div>
                    </div>

                }

                {res?.albums.length && query.length > 0 &&
                    <div class='w-fit mx-auto flex flex-col rounded-[29px] bg-black bg-opacity-15 px-5 py-2 backdrop-blur-[60px]'>
                        <h2 class='w-fit text-[28px] font-bold'>Albums</h2>
                        {/* <div class=''> */}
                        <div class={`w-fit flex flex-row  h-72 gap-3 overflow-x-scroll `}>
                            {res.albums.map((album) => <AlbumCard album={{ name: album.name, uuid: album.uuid, band: { name: album.bandName } }} />)}
                        </div>
                        {/* </div> */}
                    </div>
                }

                {res?.bands.length && query.length > 0 &&
                    <div class='w-fit mx-auto flex flex-col rounded-[29px] bg-black bg-opacity-15 px-5 py-2 backdrop-blur-[60px]'>
                        <h2 class='w-fit text-[28px] font-bold'>Artits</h2>
                        {/* <div class=''> */}
                        <div class={`w-fit flex flex-row  h-72 gap-3 overflow-x-scroll `}>
                            {res.bands.map((band) => <ArtistCard band={{ name: band.name, uuid: band.uuid }} />)}
                        </div>
                        {/* </div> */}
                    </div>
                }


            {/* </div> */}
            {track && <div class=" bottom-[-100px] w-full">
                <BubblePlayer />
            </div>}

        </div>)
    }
})


