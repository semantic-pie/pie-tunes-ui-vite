import { PreferredGenres, PreferredGenresProps } from "./PreferredGenres";
import { WrappWithBlur } from "../stories/test-wrappers";
import { doNothing } from "../stories/test-entities";


export default {
    component: PreferredGenres,
    title: 'Preferred Genres',
    tags: ['autodocs'],
    decorators: [(story: any) => <WrappWithBlur>{story()}</WrappWithBlur>],
};


export const Default = {
    args: {
        onSubmit: doNothing,
    } as PreferredGenresProps,
};

export const Submiting = {
    args: {
        onSubmit: doNothing,
        submiting: true
    } as PreferredGenresProps,
};