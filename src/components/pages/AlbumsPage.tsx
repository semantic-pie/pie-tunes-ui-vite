import { useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import AlbumCard from "../common/AlbumCard";
import { Outlet } from "@tanstack/react-router";
import { albumViewRoute } from "@/router/library";
import { useState } from "preact/hooks";

const AlbumsPage = () => {
    const [query, setQury] = useState<string>('')

    const albums = useAppSelector(state => query.length > 0 ? state.library.albums.filter(a => a.name.includes(query)) : state.library.albums)

    const { albumId } = albumViewRoute.useParams()
    const track = useAppSelector(state => state.currentTrack)

    return (
        <div class={`flex flex-col ${track ? 'h-[30rem]' : 'h-[40rem]'} gap-3  sm:h-[44rem]`}>
            {albumId ? <Outlet /> :
                <>
                    <div class="justify-between items-start inline-flex">
                        <div className="text-start text-white text-3xl font-bold">Albums</div>
                        <SortByIcon />
                    </div>
                    <SearchBar query={query} setQuery={setQury} />
                    <div class="flex sm:flex-wrap flex-grow gap-x-3 gap-y-3 overflow-y-scroll">
                        {albums.map((album) => <AlbumCard album={album} />)}
                    </div>
                </>
            }
        </div>
    )
}

export default AlbumsPage;