const AlbumCard = () => {
    return (
        <div class="flex flex-col">
            <img class="w-52 h-52 rounded-md overflow-hidden" src="/src/assets/master_cover.jpg" alt="" />
            <div class="text-start text-white text-base font-normal capitalize">Load</div>
            <div class="text-start text-white text-opacity-60 text-sm font-normal capitalize">Metallica</div>
        </div>
    )
}

export default AlbumCard