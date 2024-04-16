import GoogleIcon from "@/components/icons/GoogleIcon"
import { useSignal } from "@preact/signals"
import { FunctionalComponent } from "preact"


interface SignUpData {
    username: string
    email: string
    password: string
    confirmPassword: string
}
export type SignUpProps = {
    onSubmit?: (signUpData: SignUpData) => void
    onLoginLinkClick?: () => void
    error?: string
}


export const SignUp: FunctionalComponent<SignUpProps> = ({ onSubmit, onLoginLinkClick, error }) => {

    const username = useSignal<string>('')
    const email = useSignal<string>('')
    const password = useSignal<string>('')
    const confirmPassword = useSignal<string>('')

    const onSubmitClick = () => {
        onSubmit?.({
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        })
    }


    return (
        <div class='flex flex-col gap-8 m-1 sm:my-auto md:mx-auto px-4 sm:px-9 pt-5 pb-4 sm:py-12 sm:h-[490px] w-full sm:w-[910px] bg-black bg-opacity-10 authform backdrop-blur-[60px] rounded-[35px] sm:rounded-[45px] z-10'>
            <div class='flex items-center'>
                <h2 class='font-bold text-[42px]'>Sign Up</h2>
                <span class={`hidden sm:inline ml-auto text-red-500 opacity-0 ${error ? 'opacity-100' : ''} transition-all duration-150 ease-in`}>{error}</span>
            </div>

            <div class='w-full h-full flex flex-col sm:flex-row justify-between text-[20px] sm:text-[23px]'>
                <div class='flex flex-col gap-5 min-w-full sm:min-w-[450px] '>
                    <input value={username.value} onInput={(e) => username.value = e.currentTarget.value} class='placeholder-opacity-60 w-full px-[20px] bg-black bg-opacity-10 h-[45px] sm:h-[60px] authinput rounded-full' placeholder='Username' type="text" />
                    <input value={email.value} onInput={(e) => email.value = e.currentTarget.value} class='placeholder-opacity-60 w-full px-[20px] bg-black bg-opacity-10 h-[45px] sm:h-[60px] authinput rounded-full' placeholder='Email Adress' type="text" />
                    <input value={password.value} onInput={(e) => password.value = e.currentTarget.value} class='placeholder-opacity-60 w-full px-[20px] bg-black bg-opacity-10 h-[45px] sm:h-[60px] authinput rounded-full' placeholder='Password' type="password" />
                    <input value={confirmPassword.value} onInput={(e) => confirmPassword.value = e.currentTarget.value} class=' w-full px-[20px] bg-black bg-opacity-10 h-[45px] sm:h-[60px] authinput rounded-full' placeholder='Confirm Password' type="password" />
                    <span class={`inline sm:hidden text-[18px] text-center text-red-500 opacity-0 ${error ? 'opacity-100' : ''} transition-all duration-150 ease-in`}>{error}</span>
                </div>
                <div class='flex gap-5 sm:gap-0 flex-col text-center sm:w-[330px]'>

                    <span class='inline sm:hidden w-full mt-5 text-left text-[18px] opacity-75'>Already have an account? <a onClick={onLoginLinkClick} class='font-bold underline cursor-pointer'>Log in</a></span>
                    
                    <button onClick={onSubmitClick} class='w-full h-[60px] bg-black bg-opacity-10 hover:bg-opacity-15 authinput backdrop-blur-[60px] transition-all ease-in duration-150 rounded-full'>
                        Sign Up
                    </button>

                    <span class='hidden sm:inline w-full mt-5 text-left text-[18px] opacity-75'>Already have an account? <a onClick={onLoginLinkClick} class='font-bold underline cursor-pointer'>Log in</a></span>

                    <span class='hidden sm:inline my-auto text-[18px] opacity-75'>Or</span>

                    <button class='relative w-full h-[60px] border border-1 border-black  authinput transition-all ease-in duration-300 rounded-full'>
                        <GoogleIcon class='absolute inset-0 my-auto ml-[15px]' />
                        <span> Sign Up With Google</span>
                    </button>

                </div>
            </div>
        </div>
    )
}
