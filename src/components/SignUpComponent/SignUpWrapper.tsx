import { useAppDispatch } from "@/redux/store"
import { FunctionalComponent } from "preact"
import { SignUp, SignUpProps } from "./SignUp"
import { useNavigate } from "@tanstack/react-router"

export const SignUpWrapper: FunctionalComponent<{}> = ({ }) => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const props: SignUpProps = {
        onSubmit: (data) => console.log('sign up data: ', data),
        onLoginLinkClick: () => nav({ to: '/auth/login' })
    }

    return <SignUp {...props} />
}
