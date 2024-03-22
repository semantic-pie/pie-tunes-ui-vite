import { useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import AlbumCard from "../common/AlbumCard";
import { Outlet } from "@tanstack/react-router";
import { albumViewRoute } from "@/router/library";
import { useEffect, useState } from "preact/hooks";
import { MusicAlbum, api } from "@/api";
import { responseToObject } from "@/utils/hellpers";
import TrackCard from "../common/TrackCard";


type TracksPageProps = {
}

const TracksPage = (props: TracksPageProps) => {
    const [query, setQury] = useState<string>('')
    // const [albums, setAlbums] = useState<MusicAlbum[]>([])

    const tracks = useAppSelector(state => query.length > 0 ? state.queue.filter(a => a.title.includes(query)) : state.queue)


    return (
        <div class="flex flex-col gap-3 h-[680px]">


            <div class="justify-between items-start inline-flex">
                <div className="text-start text-white text-3xl font-bold">Songs</div>
                <SortByIcon />
            </div>
            <SearchBar query={query} setQuery={setQury} />
            <div class="flex flex-col gap-4 overflow-y-scroll">
                {tracks.map((track) => <TrackCard track={track} />)}
            </div>


        </div>
    )
}

export default TracksPage;