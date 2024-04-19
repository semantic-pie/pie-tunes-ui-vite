import { useEffect, useRef } from "preact/hooks"
import Search from "../icons/Search"

type GlobalSearchProps = {
    value: string
    setValue: (v: string) => void
    class?: string
}

const GlobalSearchInput = (props: GlobalSearchProps) => {
    const ref = useRef<HTMLInputElement>(null)
    useEffect(() => ref.current?.focus(), [])

    return (
        <div class={`min-h-[70px] flex items-center rounded-md sm:rounded-[29px] bg-black bg-opacity-10 px-5 gap-5 sm:search ${props.class} z-20`}>
            <Search class='w-6 h-6 opacity-50' />
            <input ref={ref} value={props.value} onInput={(e) => props.setValue(e.currentTarget.value)} placeholder={'Search'} class='w-full text-white placeholder-white placeholder-opacity-75 text-[24px] text-opacity-75 bg-transparent !outline-none' type="text" />
        </div>

    )
}

export default GlobalSearchInput
