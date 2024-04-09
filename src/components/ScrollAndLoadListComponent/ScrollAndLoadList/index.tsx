import { useIsLoadNeedScroll } from "@/utils/useIsLoadNeedWithScroll"
import { FunctionalComponent } from "preact"

export type ScrollAndLoadListProps = {
    onLoadNeed?: () => {},
    gridLayout?: boolean
}

export const ScrollAndLoadList: FunctionalComponent<ScrollAndLoadListProps> = ({ onLoadNeed, gridLayout, children }) => {
    const { containerWithScrollRef } = useIsLoadNeedScroll(() => {
        onLoadNeed?.()
    })

    return (
        <div class='relative flex h-full'>
            <div ref={containerWithScrollRef} class={`absolute top-0 left-0 right-0 flex flex-col gap-2 ${gridLayout ? 'sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : ''} h-full pr-[8px] mr-[-14px]  overflow-y-scroll`}>
                {children ? children : <span class='m-auto opacity-70'>Nothing found :(</span>}
            </div>
        </div>
    )
}
