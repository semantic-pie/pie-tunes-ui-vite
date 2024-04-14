import { FunctionalComponent } from "preact"

export type FailedCardProps = {
    name: string,
    errorCode: number
}

export const FailedCard: FunctionalComponent<FailedCardProps> = ({ name, errorCode }) => {
    
    let errorDescription: string | undefined

    if (errorCode === 409) errorDescription = 'This track is already exist'
    else if (errorCode === 500) errorDescription = 'Something wrong with file :('

    return (
        <div class={`min-h-14 h-14 w-full px-5 bg-red-500 bg-opacity-20 flex flex-row justify-between items-center gap-3 p-1 rounded-md`}>
            <div class="text-start text-white text-base font-normal capitalize truncate">{name}</div>
            <div class="text-start text-white text-opacity-60 text-sm font-normal truncate">{errorDescription ? errorDescription : errorCode}</div>
        </div>
    )
}
