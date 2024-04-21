import { Login, LoginProps } from "./Login";
import { WrappWithBlur } from "../stories/test-wrappers";
import { doNothing } from "../stories/test-entities";



export default {
    component: Login,
    title: 'Login',
    tags: ['autodocs'],
    decorators: [(story: any) => <WrappWithBlur>{story()}</WrappWithBlur>],
};


export const Default = {
    args: {
        error: undefined,
        onSignUpLinkClick: doNothing,
        onSubmit: doNothing,
        submiting: false,
    } as LoginProps,
};

export const Submiting = {
    args: {
        error: undefined,
        onSignUpLinkClick: doNothing,
        onSubmit: doNothing,
        submiting: true,
    } as LoginProps,
};

export const Error = {
    args: {
        error: 'Error message',
        onSignUpLinkClick: doNothing,
        onSubmit: doNothing,
        submiting: false,
    } as LoginProps,
};
