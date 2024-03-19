import { Outlet } from "@tanstack/react-router";
import SideBar from "../common/SideBar";

const MainPage = () => {
    return (
        <div class="flex justify-center sm:mt-20 h-screen ">
            <div class="flex h-[740px] w-[1140px] backdrop-blur-3xl">
                <SideBar />
                <div class='flex w-full flex-col gap-3 p-6 mainview'>
                    <Outlet />
                </div>

            </div>
        </div>

    );
}

export default MainPage;