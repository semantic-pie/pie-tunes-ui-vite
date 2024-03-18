import Library from "@/components/icons/Library";
import Player from "@/components/icons/Player";
import Search from "@/components/icons/Search";

const SidePill = () => {
    return (
        <div class="absolute top-0 bottom-0 left-5 flex flex-col justify-center items-center">
            <div class="flex flex-col gap-3 p-3 rounded-full sidepill">
                <div class="flex items-center justify-center rounded-full w-14 h-14">
                    <Player width="32" height="32" />
                </div>
                <div class="flex items-center justify-center rounded-full w-14 h-14 active">
                    <Library width="35" height="35" />
                </div>
                <div class="flex items-center justify-center rounded-full w-14 h-14">
                    <Search width="35" height="35" class="fill-white" />
                </div>
            </div>
        </div>
    );
}

export default SidePill;