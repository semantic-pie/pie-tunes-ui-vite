import Albums from "@/components/icons/Albums";
import Clock from "@/components/icons/Clock";
import MusicMicro from "@/components/icons/MusicMicro";
import MusicNote from "@/components/icons/MusicNote";
import Playlists from "@/components/icons/Playlists";
import Plus from "@/components/icons/Plus";
import ThreeDots from "@/components/icons/ThreeDots";
import User from "@/components/icons/User";
import { Link } from "@tanstack/react-router";
import UploadIcon from "../icons/UploadIcon";

const SideBar = () => {
    return (
        <div class="w-[220px] flex flex-col p-6 gap-8  sidebar">
            <div class="flex justify-between">
                <div class="flex flex-col">
                    <div className="text-center  text-3xl font-bold">Library</div>
                    <div className="text-start  opacity-60 text-base font-normal ">Your Music</div>
                </div>

                <div class="w-8 h-8 bg-opacity-10 bg-white rounded-full flex items-center justify-center text-center">
                    <ThreeDots width="15" height="5" />
                </div>
            </div>

            <div class="flex flex-col gap-4">
                <Link to="/" class='flex items-center gap-3' >
                    <div class="flex items-center gap-3">
                        <Clock class="w-8 h-8" />
                        Recently Added
                    </div>
                </Link>
                <Link to="/artists" class='flex items-center gap-3' >
                    <div class="flex items-center gap-3">
                        <MusicMicro class="w-8 h-8" />
                        Artist
                    </div>
                </Link>

                <Link to="/albums" class='flex items-center gap-3' >
                    <div class="flex items-center gap-3">
                        <Albums class="w-8 h-8" />
                        Albums
                    </div>
                </Link>

                <Link to="/songs" class='flex items-center gap-3' >
                    <div class="flex items-center gap-3">
                        <MusicNote class="w-8 h-8" />
                        Songs
                    </div>
                </Link>
                <Link to="/made-for-you" class='flex items-center gap-3' >
                    <div class="flex items-center gap-3">
                        <User class="w-8 h-8" />
                        Made for You
                    </div>
                </Link>
                <Link to="/upload" class='flex items-center gap-3' >
                    <div class="flex items-center gap-3 px-1.5">
                        <UploadIcon />
                        Upload
                    </div>
                </Link>

            </div>

            <div>
                <div className="text-start text-white text-2xl font-medium mt-8">Playlist</div>
                <div class="flex flex-col gap-4">
                    <div class="flex items-center gap-3">
                        <Playlists class="w-8 h-8" />
                        All Playlists
                    </div>
                    <div class="flex items-center gap-3">
                        <Plus class="w-8 h-8" />
                        Add Playlist
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SideBar;