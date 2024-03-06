import { Outlet } from "@tanstack/react-router";
import SideBar from "../common/SideBar";

const MainPage = () => {
    return (
        <div class="flex justify-center mt-20 h-screen">
            <div class="flex bg-emerald-600 h-[75vh] w-[80vw] rounded-3xl shadow-inner backdrop-blur-3xl">
                <SideBar />
                <Outlet />
            </div>
        </div>

    );
}

export default MainPage;