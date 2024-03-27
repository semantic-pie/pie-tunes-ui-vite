import { useState } from "preact/hooks";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";


type PageProps = {
    title: string
    list: any[]
    col?: boolean
    wrap?: boolean
}

const Page = ({ title, list, col, wrap }: PageProps) => {
    const [query, setQuery] = useState('')
    return (
        <div style={{maxHeight: window.innerHeight - 290}} class={`flex flex-col gap-3`}>
            <div class="justify-between items-start inline-flex">
                <div className="text-start text-white text-3xl font-bold">{title}</div>
                <SortByIcon />
            </div>
            <SearchBar query={query} setQuery={setQuery} />
            {col &&
                <div class="flex flex-col gap-4 overflow-y-scroll">
                    {list}
                    {/* {[...Array(8).keys()].map(() => <AlbumItem />)} */}
                </div>
            }

            {wrap &&
                <div class="flex flex-wrap flex-grow gap-x-3 gap-y-3 overflow-y-scroll">
                    {list}
                </div>
            }
        </div>
    )
}

export default Page;