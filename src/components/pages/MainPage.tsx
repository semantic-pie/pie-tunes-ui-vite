import { Outlet } from "@tanstack/react-router";
import SideBar from "../common/SideBar";

const MainPage = () => {
    return (
        <div class="flex flex-col justify-center sm:m-auto">
            <div class="flex flex-col-reverse sm:flex-row w-full sm:w-[800px] xl:w-[1000px] 2xl:w-[1140px] z-10">
                <SideBar />
                <div class='flex w-full flex-col gap-3 p-6 mainview rounded-br-[28px] rounded-bl-[28px] sm:rounded-bl-[0px] sm:rounded-tr-[28px] '>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MainPage;