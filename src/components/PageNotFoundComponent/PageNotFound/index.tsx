import { FunctionalComponent } from "preact";

export type PageNotFoundProps = {
    onGoHomeClick: () => void
}

export const PageNotFound: FunctionalComponent<PageNotFoundProps> = ({ onGoHomeClick }) => {
    return (
        <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] z-10">
            <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <button onClick={onGoHomeClick} class="rounded-[45px] px-8 py-3 opacity-80 hover:opacity-100 border border-current mt-5 cursor-pointer transition-opacity duration-150 ease-in">
                <span  >Go Home</span>
            </button>
        </main>
    )
}