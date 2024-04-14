import LoadingIcon from "@/components/icons/LoadingIcon"
import { FunctionalComponent } from "preact"

export type FailedCardProps = {
    name: string,
}

export const ProcessCard: FunctionalComponent<FailedCardProps> = ({ name }) => {
    return (
        <div class={`min-h-14 h-14 w-full px-5 bg-black bg-opacity-10 flex flex-row justify-start gap-5 items-center p-1 rounded-md`}>
            <LoadingIcon />
            <div class="text-start text-white text-base font-normal capitalize truncate">{name}</div>
        </div>
    )
}
