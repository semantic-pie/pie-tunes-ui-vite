import { useAppDispatch } from "@/redux/store"
import { FunctionalComponent } from "preact"
import { SignUp, SignUpProps } from "./SignUp"
import { useNavigate } from "@tanstack/react-router"
import { useSignal } from "@preact/signals"
import { PreferredGenres, PreferredGenresProps } from "../PreferredGenresComponent/PreferredGenres"
import { pieApiClient } from "@/api/client"
import Cookies from "js-cookie"
import { fetchForUser } from "@/redux/slices/userSlice"

export const SignUpWrapper: FunctionalComponent<{}> = ({ }) => {
    const dispatch = useAppDispatch()

    const nextStep = useSignal(false)


    const nav = useNavigate()

    const error = useSignal<string | undefined>(undefined)


    const signUpProps: SignUpProps = {
        onSubmit: async (data) => {
            try {
                if (data.password !== data.confirmPassword) {
                    error.value = 'Passwords must match'
                    return
                }

                if (data.email.length === 0) {
                    error.value = 'Email should not be empty'
                    return
                }

                if (data.username.length === 0) {
                    error.value = 'Username should not be empty'
                    return
                }

                if (data.password.length === 0) {
                    error.value = 'Password should not be empty'
                    return
                }

                await pieApiClient.authSignUp(data)
                .then(response => {
                    if (response.meta.status === 200 || response.meta.status === 201) {
                        nextStep.value = true
                        Cookies.set('token', response.data.accessToken)
                        dispatch(fetchForUser())
                    } else {
                        console.log('but error: ', (response.data as any).message)
                        error.value = (response.data as any).message
                    }
                })
            } catch (err) {
                console.log('error: ', err)
            }
           
        },
        onLoginLinkClick: () => nav({ to: '/auth/login' }),
        error: error.value,
    }

    const preferredGenresProps: PreferredGenresProps = {
        onSubmit: (data) => {
            pieApiClient.putPreferredGenres(data)
                .then(() => nav({ to: '/library/songs' }))
        },
    }

    return nextStep.value ? <PreferredGenres {...preferredGenresProps} /> : <SignUp {...signUpProps} />
}
