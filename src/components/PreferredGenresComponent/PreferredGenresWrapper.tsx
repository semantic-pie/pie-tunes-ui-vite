import { useAppDispatch } from "@/redux/store"
import { FunctionalComponent } from "preact"
import { PreferredGenres, PreferredGenresProps } from "./PreferredGenres"

export const SignUpWrapper: FunctionalComponent<{}> = ({ }) => {
    const dispatch = useAppDispatch()

    const props: PreferredGenresProps = {
        onSubmit: (data) => console.log('login data: ', data)
    }

    return <PreferredGenres {...props} />
}
