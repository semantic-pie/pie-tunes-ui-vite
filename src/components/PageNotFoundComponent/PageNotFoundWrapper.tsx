import { FunctionalComponent } from "preact"
import { useNavigate } from "@tanstack/react-router"
import { PageNotFound, PageNotFoundProps } from "./PageNotFound"

export const PageNotFoundWrapper: FunctionalComponent = () => {
    const nav = useNavigate()

    const props: PageNotFoundProps = {
        onGoHomeClick: () => nav({ to: '/library/songs' })
    }

    return <PageNotFound {...props} />
}
