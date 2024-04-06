import { useSignal } from "@preact/signals"
import { useRef } from "preact/hooks"

type ProgresBarProps = {
    classes?: string
    classesInner?: string
    relativeValue: number // max value
    value: number // should be between 0 and 100 (percents)
    setValue: (value: number) => void
    polzunok?: boolean
}

const ProgresBar = ({ value, setValue, relativeValue, classes, classesInner, polzunok }: ProgresBarProps) => {
    const container = useRef<HTMLDivElement>(null)

    const isPressed = useSignal(false)

    const calculateAndSetProgres = (clientX: number) => {
        if (container.current) {
            const { width, left } = container.current.getBoundingClientRect()
            const x = clientX - left
            setValue(x / width * relativeValue)
        }
    }

    const onTouch = (e: TouchEvent) => {
        e.preventDefault()
        e.stopPropagation()
        calculateAndSetProgres(e.targetTouches[0].clientX)
    }

    const onMouse = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        calculateAndSetProgres(e.clientX)
    }


    const onTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isPressed.value) {
            calculateAndSetProgres(e.targetTouches[0].clientX)
        }
    }

    const onMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isPressed.value) {
            calculateAndSetProgres(e.clientX)
        }
    }

    return (
        <div ref={container}
            class={` ${classes} h-[4px] cursor-pointer bg-black bg-opacity-20 flex justify-start group`}
            onClick={onMouse}
            onTouchStart={(e) => {e.preventDefault(), e.stopPropagation(), isPressed.value = true, onTouch(e) }}
            onTouchEnd={() => isPressed.value = false}
            onTouchCancel={() => isPressed.value = false}
            onTouchMove={onTouchMove}
            onMouseDown={() => isPressed.value = true}
            onMouseUp={() => isPressed.value = false}
            onMouseMove={onMouseMove}
            onMouseLeave={() => isPressed.value = false}
        >
            <div style={{ width: value + '%' }} class={`${classesInner} bg-white bg-opacity-60 ${polzunok ? '' : 'group-hover:bg-opacity-80'} cursor-pointer`}>

            </div>
            {polzunok && <div class={` h-2 w-2 rounded-full bg-white mt-[-2px] ml-[-2px] hover:scale-125`}></div>}
        </div>
    )
}

export default ProgresBar
