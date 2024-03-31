import { useRef, useState } from "preact/hooks"

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

    const [pressed, setPressed] = useState(false)

    const calculateAndSetProgres = (clientX: number) => {
        if (container.current) {
            const { width, left } = container.current.getBoundingClientRect()
            const x = clientX - left
            setValue(x / width * relativeValue)
        }
    }

    const onTouch = (e: TouchEvent) => {
        calculateAndSetProgres(e.targetTouches[0].clientX)
    }

    const onMouse = (e: MouseEvent) => {
        calculateAndSetProgres(e.clientX)
    }


    const onTouchMove = (e: TouchEvent) => {
        if (pressed) {
            calculateAndSetProgres(e.targetTouches[0].clientX)
        }
    }

    const onMouseMove = (e: MouseEvent) => {
        if (pressed) {
            calculateAndSetProgres(e.clientX)
        }
    }

    return (
        <div ref={container}
            class={`${classes} h-[4px] cursor-pointer bg-black bg-opacity-20 flex justify-start `}
            onClick={onMouse}
            onTouchStart={(e) => {setPressed(true), onTouch(e)}}
            onTouchEnd={() => setPressed(false)}
            onTouchCancel={() => setPressed(false)}
            onTouchMove={onTouchMove}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseMove={onMouseMove}
            onMouseLeave={() => setPressed(false)}
        >
            <div style={{ width: value + '%' }} class={`${classesInner} bg-white bg-opacity-60 ${polzunok ? '' : 'hover:bg-opacity-80'} cursor-pointer`}>

            </div>
            {polzunok && <div class={` h-2 w-2 rounded-full bg-white mt-[-2px] ml-[-2px] hover:scale-125`}></div>}
        </div>
    )
}

export default ProgresBar
