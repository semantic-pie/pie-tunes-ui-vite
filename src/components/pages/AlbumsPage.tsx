import { loadNextPageAlbums, useAppDispatch, useAppSelector } from "@/redux/store";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";
import AlbumCard from "../common/AlbumCard";
import { Outlet } from "@tanstack/react-router";
import { albumViewRoute } from "@/router/library";
import { useEffect, useRef, useState } from "preact/hooks";

const AlbumsPage = () => {
    const [query, setQury] = useState<string>('')

    const albums = useAppSelector(state => query.length > 0 ? state.library.albums.filter(a => a.name.includes(query)) : state.library.albums)

    const { albumId } = albumViewRoute.useParams()
    const track = useAppSelector(state => state.currentTrack)

    const [isLoadNeed, setIsLoadNeed] = useState(false)

    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (isLoadNeed) {
          dispatch(loadNextPageAlbums())
          setTimeout(() => {
            setIsLoadNeed(false)
          }, 200)
          
        }
      }, [isLoadNeed])


      const handleScroll = () => {
        if (!ref.current) return

        const { scrollTop, scrollHeight } = ref.current
        // play around with the trigger factor instead of fixed px
        const trigger = 1
        if (scrollHeight - (scrollTop + window.innerHeight) < window.innerHeight * trigger) {
          setIsLoadNeed(true)
        }
      }
    
      useEffect(() => {
        if (!ref.current) return
        // const app = document.querySelector('#app')
        // if (!app) return

        ref.current.addEventListener('scroll', handleScroll)
        return () => {
            if (!ref.current) return
            ref.current.removeEventListener('scroll', handleScroll)
        }
      }, [])

    return (
        <>
            {albumId ? <Outlet /> :
                <>
                    <div class="justify-between items-start inline-flex">
                        <div className="text-start text-white text-3xl font-bold">Albums</div>
                        <SortByIcon />
                    </div>
                    <SearchBar query={query} setQuery={setQury} />
                    <div ref={ref} class="flex max-h-[100%] flex-col sm:flex-row sm:flex-wrap gap-x-3 gap-y-3 overflow-y-scroll">
                        {albums.map((album) => <AlbumCard album={album} />)}
                    </div>
                </>
            }
        </>
    )
}

export default AlbumsPage;