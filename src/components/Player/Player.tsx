import ThreeDots from "@/assets/icons/ThreeDots";
import Controls from "./Controls";
import Like from "@/assets/icons/Like";
import Max from "@/assets/icons/PlayerIcons/Volume/Max";

const Player = () => {
    return (
        <div class="absolute bottom-28 flex items-center justify-center w-full">
            <div class="flex flex-row gap-7 p-4 rounded-full bg-indigo-500">
                <Controls />

                <div className="w-96 h-16 pl-2 pr-1 pt-2 pb-2 bg-black bg-opacity-10 rounded-xl justify-start items-center gap-3.5 inline-flex">
                    <div className="justify-between items-center gap-24 flex">
                        <div className="justify-start items-center gap-3.5 flex">
                            <img className="w-14 h-14 rounded-lg" src="https://via.placeholder.com/52x52" />
                            <div className="flex-col justify-center items-start gap-1 inline-flex">
                                <div className="text-center text-white text-lg font-normal font-['Helvetica Neue']">Meltdown Mendy</div>
                                <div className="text-center text-white text-opacity-40 text-base font-normal font-['Helvetica Neue']">Niall Horan</div>
                            </div>
                        </div>
                        <div class="flex flex-row gap-5 items-center justify-center">
                            <div class="w-4 h-4">
                                <ThreeDots class="w-4 h-4" />
                            </div>
                            <div>
                                <Like class="w-7 h-7" />
                            </div>
                        </div>
                    </div>
                </div>


                <div class="flex flex-row items-center justify-center gap-1">
                    <Max class="w-7 h-7"/>
                    <hr class="w-28 border-2 rounded-full"></hr>
                </div>

            </div>
        </div>

    );
}

export default Player;