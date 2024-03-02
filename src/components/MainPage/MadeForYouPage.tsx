import AlbumItem from "./AlbumItem";
import SearchBar from "./SearchBar";

const MadeForYouPage = () => {
    return (
        <div class="flex flex-col gap-3 p-6 w-full">
            <div class="justify-between items-start inline-flex">
                <div className="text-start text-white text-3xl font-bold">Made for You</div>
                <div class="w-8 h-8 rounded-full bg-opacity-10 bg-white flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none">
                        <path d="M1.18099 2.21284H15.6291C16.0326 2.21284 16.3585 1.87919 16.3585 1.4757C16.3585 1.0722 16.0326 0.746307 15.6291 0.746307H1.18099C0.769737 0.746307 0.451599 1.0722 0.451599 1.4757C0.451599 1.87919 0.777496 2.21284 1.18099 2.21284ZM2.7872 6.22447H14.0539C14.4574 6.22447 14.7833 5.89082 14.7833 5.48733C14.7833 5.07608 14.4652 4.75018 14.0539 4.75018H2.7872C2.37594 4.75018 2.05781 5.08384 2.05781 5.48733C2.05781 5.88306 2.3837 6.22447 2.7872 6.22447ZM4.36237 10.2283H12.4788C12.89 10.2283 13.2081 9.89469 13.2081 9.4912C13.2081 9.08771 12.89 8.76181 12.4788 8.76181H4.36237C3.95111 8.76181 3.63298 9.08771 3.63298 9.4912C3.63298 9.89469 3.95111 10.2283 4.36237 10.2283Z" fill="white" />
                    </svg>
                </div>
            </div>
            <SearchBar />
            <div class="flex flex-wrap gap-4">
                {[...Array(8).keys()].map(() => <AlbumItem />)}
            </div>
        </div>
    )
}

export default MadeForYouPage;