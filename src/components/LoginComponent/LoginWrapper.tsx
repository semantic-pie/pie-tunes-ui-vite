import { useAppDispatch } from "@/redux/store"
import { FunctionalComponent } from "preact"
import { Login, LoginProps } from "./Login"
import { useNavigate } from "@tanstack/react-router"

export const LoginWrapper: FunctionalComponent<{}> = ({ }) => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const props: LoginProps = {
        onSubmit: (data) => console.log('login data: ', data),
        onSignUpLinkClick: () => nav({to: '/auth/signup'})
    }

    return <Login {...props} />
}
