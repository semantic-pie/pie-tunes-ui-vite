import { SignUp, SignUpProps } from "./SignUp";
import { doNothing } from "../stories/test-entities";
import { WrappWithBlur } from "../stories/test-wrappers";



export default {
    component: SignUp,
    title: 'Sign Up',
    tags: ['autodocs'],
    decorators: [(story: any) => <WrappWithBlur>{story()}</WrappWithBlur>],
};


export const Default = {
    args: {
        error: undefined,
        onSubmit: doNothing,
        onLoginLinkClick: doNothing,
        submiting: false
    } as SignUpProps,
};

export const Submiting = {
    args: {
        submiting: true
    } as SignUpProps,
};


export const Error = {
    args: {
        error: 'Error message'
    } as SignUpProps,
};