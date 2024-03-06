import AlbumItem from "../common/AlbumCard";
import SearchBar from "../common/SearchBar";
import SortByIcon from "../icons/SortByIcon";

const MadeForYouPage = () => {
    return (
        <div class="flex flex-col gap-3 p-6 w-full">
            <div class="justify-between items-start inline-flex">
                <div className="text-start text-white text-3xl font-bold">Made for You</div>
                <SortByIcon />
            </div>
            <SearchBar />
            <div class="flex flex-wrap gap-4">
                {[...Array(8).keys()].map(() => <AlbumItem />)}
            </div>
        </div>
    )
}

export default MadeForYouPage;