import { useSignal } from "@preact/signals"
import { FunctionalComponent } from "preact"


export type PreferredGenresProps = {
    onSubmit: (signUpData: string[]) => void
}


export const PreferredGenres: FunctionalComponent<PreferredGenresProps> = ({ onSubmit }) => {


    const selectedGenres = useSignal<string[]>([])

    const onSubmitClick = () => {
        onSubmit(selectedGenres.value)
    }

    const toggleGenre = (genre: string) => {
        const temp = []

        let alreadyExist = false
        for (const g of selectedGenres.value) {
            if (g === genre)
                alreadyExist = true
            else
                temp.push(g)
        }

        if (!alreadyExist) temp.push(genre)

        selectedGenres.value = temp
    }

    const genres = [
        "Pop", "Hip-Hop", "Soul", "Electronic Music", "Jazz", "Rock",
        "Classic Music", "Alternative", "Country", "Metal", "Indie", "Latin",
        "Reggae", "Blues", "Techno", "House", "Funk", "Disco", "Punk", "Folk",
        "Drum and Bass", "Dubstep", "Ska"
    ]



    return (
        <div class='flex flex-col gap-8 m-auto px-9 pt-12 pb-6 w-[910px] bg-black bg-opacity-10 authform backdrop-blur-[60px] rounded-[45px] z-10'>
            <h2 class='font-bold text-[42px]'>Choose genres you like</h2>
            <div class='flex flex-wrap gap-4 items-start text-[23px]'>
                {genres.map(genre => <GenreCard active={selectedGenres.value.includes(genre)} genre={genre} toggleGenre={() => toggleGenre(genre)} />)}
            </div>
            <button onClick={onSubmitClick} class='group ml-auto bg-black bg-opacity-10 hover:bg-opacity-20 backdrop-blur-[60px] rounded-xl px-4 py-1 text-[23px] transition-all duration-150 ease-in'><span class='opacity-75 group-hover:opacity-95'>Submit</span></button>
        </div>
    )
}



export const GenreCard: FunctionalComponent<{ toggleGenre: () => void, genre: string, active?: boolean }> = ({ genre, toggleGenre, active, }) => {

    return (
        <button onClick={toggleGenre} class={`px-5 py-2 bg-black bg-opacity-10 forminput rounded-full border border-1 border-white border-opacity-0 ${active ? 'border-opacity-100 ' : ''} transition-all duration-150 ease-in`}><span class={`${active ? '' : 'opacity-60'}`}>{genre}</span></button>
    )
}