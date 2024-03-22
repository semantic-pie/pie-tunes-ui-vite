import { useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import AlbumCard from "../common/AlbumCard";
import { Outlet } from "@tanstack/react-router";
import { albumViewRoute } from "@/router/library";
import { useEffect, useState } from "preact/hooks";
import { MusicAlbum, api } from "@/api";
import { responseToObject } from "@/utils/hellpers";


type AlbumsPageProps = {
}

const AlbumsPage = (props: AlbumsPageProps) => {
    const [query, setQury] = useState<string>('')
    // const [albums, setAlbums] = useState<MusicAlbum[]>([])

    const albums = useAppSelector(state => query.length > 0 ? state.albums.filter(a => a.name.includes(query)) : state.albums)

    // useEffect(() => {

    //     fetch(api.forAlbums({ page: 0, limit: 1000, query  }))
    //     .then(responseToObject)
    //     .then(data => {
    //         setAlbums(data)
    //         console.log(data)
    //     })

        
    // }, [query])

    const { albumId } = albumViewRoute.useParams()

    return (
        <div class="flex flex-col gap-3 h-[680px]">
            {albumId ? <Outlet /> :
                <>
                    <div class="justify-between items-start inline-flex">
                        <div className="text-start text-white text-3xl font-bold">Albums</div>
                        <SortByIcon />
                    </div>
                    <SearchBar query={query} setQuery={setQury} />
                    <div class="flex flex-wrap flex-grow gap-x-3 gap-y-3 overflow-y-scroll">
                        {albums.map((album) => <AlbumCard album={album} />)}
                    </div>
                </>
            }
        </div>
    )
}

export default AlbumsPage;