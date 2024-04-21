import { Track } from "@/api";
import Library from "@/components/icons/Library";
import Player from "@/components/icons/Player";
import Search from "@/components/icons/Search";
import { FunctionalComponent } from "preact";

export type SidePillProps = {
    currentTrack?: Track
    onPlayerClick: () => void
    onLibraryClick: () => void
    onSearchClick: () => void
}

export const SidePill: FunctionalComponent<SidePillProps> = ({ currentTrack, onLibraryClick, onPlayerClick, onSearchClick }) => {
    return (
        <div class="absolute hidden sm:flex flex-col justify-center items-center z-10 self-center md:left-[1%] xl:left-[5%] 2xl:left-[10%] ">
            <div class="flex sm:flex-col gap-6 sm:gap-3 p-2.5 sm:p-3 rounded-full sidepill">
                {currentTrack &&
                    <div onClick={onPlayerClick} class="flex items-center justify-center rounded-full w-14 h-14 ">
                        <Player class='w-6 h-6 sm:w-8 sm:h-8' />
                    </div>
                }

                <div onClick={onLibraryClick} class="flex items-center justify-center rounded-full w-14 h-14">
                    <Library class='w-6 h-6 sm:w-8 sm:h-8' />
                </div>

                <div onClick={onSearchClick} class="flex items-center justify-center rounded-full w-14 h-14">
                    <Search class='w-6 h-6 sm:w-8 sm:h-8 fill-white' />
                </div>
            </div>
        </div>
    );
}
