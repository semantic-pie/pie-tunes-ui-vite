import { useAppDispatch } from "@/redux/store"
import { FunctionalComponent } from "preact"
import { Login, LoginProps } from "./Login"
import { useNavigate } from "@tanstack/react-router"
import { useSignal } from "@preact/signals"
import { pieApiClient } from "@/api/client"
import Cookies from "js-cookie"
import { fetchForUser } from "@/redux/slices/userSlice"

export const LoginWrapper: FunctionalComponent<{}> = ({ }) => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const error = useSignal<string | undefined>(undefined)
    const submiting = useSignal<boolean>(false)

    const props: LoginProps = {
        error: error.value,
        onSubmit: async (data) => {
            try {
                if (data.email.length === 0) {
                    error.value = 'Email should not be empty'
                    return
                }

                if (data.password.length === 0) {
                    error.value = 'Password should not be empty'
                    return
                }

                submiting.value = true
                await pieApiClient.authLogin(data)
                .then(response => {
                    if (response.meta.status === 200 || response.meta.status === 201) {
                        Cookies.set('token', response.data.accessToken)
                        dispatch(fetchForUser()).then(() => nav({ to: '/library/songs'}) )
                    } else {
                        if (response.meta.status === 401) error.value = 'Wrong password or email'
                            else error.value = (response.data as any).message
                        
                    }
                })
            } catch (err) {
                console.log('error: ', err)
            } finally {
                submiting.value = false
            }
           
        },
        onSignUpLinkClick: () => nav({to: '/auth/signup'})
    }

    return <Login {...props} />
}
