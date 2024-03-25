import Library from "@/components/icons/Library";
import Player from "@/components/icons/Player";
import Search from "@/components/icons/Search";
import { Link } from "@tanstack/react-router";

const SidePill = () => {
    return (
        <div class="hidden sm:flex flex-col justify-center items-center">
            <div class="flex sm:flex-col gap-6 sm:gap-3 p-2.5 sm:p-3 rounded-full sidepill">
                <Link to="/player">
                    <div class="flex items-center justify-center rounded-full w-14 h-14 ">
                        <Player class='w-6 h-6 sm:w-8 sm:h-8' />
                    </div>
                </Link>
                <Link to="/library">
                    <div class="flex items-center justify-center rounded-full w-14 h-14">
                        <Library class='w-6 h-6 sm:w-8 sm:h-8' />
                    </div>
                </Link>
                <Link to="/serach">
                    <div class="flex items-center justify-center rounded-full w-14 h-14">
                        <Search class='w-6 h-6 sm:w-8 sm:h-8 fill-white' />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SidePill;