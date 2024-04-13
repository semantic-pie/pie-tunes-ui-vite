import GoogleIcon from "@/components/icons/GoogleIcon"
import { useSignal } from "@preact/signals"
import { FunctionalComponent } from "preact"


interface LoginData {
    email: string
    password: string
    confirmPassword: string
}
export type LoginProps = {
    onSubmit?: (signUpData: LoginData) => void
    onSignUpLinkClick?: () => void
}


export const Login: FunctionalComponent<LoginProps> = ({ onSubmit, onSignUpLinkClick }) => {


    const email = useSignal<string>('')
    const password = useSignal<string>('')
    const confirmPassword = useSignal<string>('')

    const onSubmitClick = () => {
        onSubmit?.({
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        })
    }


    return (
        <div class='flex flex-col gap-8 m-auto px-9 py-12 h-[400px] w-[910px] bg-black bg-opacity-10 authform backdrop-blur-[60px] rounded-[45px] z-10'>
            <h2 class='font-bold text-[42px]'>Login</h2>
            <div class='flex justify-between text-[23px]'>
                <div class='flex flex-col gap-5 min-w-[450px] '>
                    <input value={email.value} onInput={(e) => email.value = e.currentTarget.value} class='placeholder-opacity-60 w-full px-[20px] bg-black bg-opacity-10 h-[60px] authinput rounded-full' placeholder='Email Adress' type="text" />
                    <input value={password.value} onInput={(e) => password.value = e.currentTarget.value} class='placeholder-opacity-60 w-full px-[20px] bg-black bg-opacity-10 h-[60px] authinput rounded-full' placeholder='Password' type="text" />
                    <input value={confirmPassword.value} onInput={(e) => confirmPassword.value = e.currentTarget.value} class=' w-full px-[20px] bg-black bg-opacity-10 h-[60px] authinput rounded-full' placeholder='Confirm Password' type="text" />
                </div>
                <div class='flex flex-col text-center w-[330px]'>
                    <button onClick={onSubmitClick} class='w-full h-[60px] bg-black bg-opacity-10 hover:bg-opacity-15 authinput backdrop-blur-[60px] transition-all ease-in duration-150 rounded-full'>
                        Login
                    </button>

                    <span class='w-full mt-5 text-left text-[18px] opacity-75'>Still don't have an account? <a onClick={onSignUpLinkClick} class='font-bold underline cursor-pointer'>Sign Up</a></span>

                    <span class='my-auto text-[18px] opacity-75'>Or</span>

                    <button class='relative w-full h-[60px] border border-1 border-black  authinput transition-all ease-in duration-300 rounded-full'>
                        <GoogleIcon class='absolute inset-0 my-auto ml-[15px]' />
                        <span> Sign Up With Google</span>
                    </button>

                </div>
            </div>
        </div>
    )
}
