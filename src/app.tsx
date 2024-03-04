import MainPage from "./components/MainPage/MainPage";
import Player from "./components/Player/Player";
import SidePill from "./components/SidePill";

export function App() {
  return (
    <>
      <SidePill />
      <MainPage />
      <div class="absolute bottom-28 w-full">
        <Player />
      </div>
    </>
  )
}
