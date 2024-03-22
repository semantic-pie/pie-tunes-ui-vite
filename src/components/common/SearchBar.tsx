import Search from "@/components/icons/Search";

type SearchBarProps = {
    query: string
    setQuery: (q: string) => void
}

const SearchBar = (props: SearchBarProps) => {
    return (
        <form class='' method="GET">
            <div class="relative ">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" class="p-1 opacity-50">
                        <Search class="w-5 h-5 "/>
                    </button>
                </span>
                <input value={props.query} onInput={(e) => props.setQuery(e.currentTarget.value)} type="search" name="q" class="py-2 text-sm pl-10 w-full mainvew-search placeholder-white placeholder-opacity-50 outline-none" placeholder="Search..." autocomplete="off" />
            </div>
        </form>
    )
}

export default SearchBar;