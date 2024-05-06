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
    const submiting = useSignal<boolean>(false)

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

                submiting.value = true
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
            } finally {
                submiting.value = false
            }
           
        },
        onLoginLinkClick: () => nav({ to: '/auth/login' }),
        error: error.value,
        submiting: submiting.value
    }

    const preferredGenresProps: PreferredGenresProps = {
        onSubmit: async (data) => {
            submiting.value = true
            console.log('submiting s: ', submiting.value)
            try {
                await pieApiClient.putPreferredGenres(data.map(g => g.trim().toLowerCase().replace(' ', '-').replace('maidcore', 'maid-core')))
                    .then(() => pieApiClient.generatePlaylist())
                    .then(() => nav({ to: '/library/songs' }))
            } catch (err) {
                nav({ to: '/library/songs' }) 
            } finally {
                submiting.value = false
                console.log('submiting f: ', submiting.value)
            }
        },
        submiting: submiting.value
    }

    return nextStep.value ? <PreferredGenres {...preferredGenresProps} /> : <SignUp {...signUpProps} />
}
