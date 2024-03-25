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

    const onClickChangeValue = (e: MouseEvent) => {
        if (e.target && container.current) {
            const { width, left } = container.current.getBoundingClientRect()
            const x = e.clientX - left
            setValue(x / width * relativeValue)
        }
    }

    return (
        <div ref={container} class={`${classes} h-[4px] cursor-pointer bg-black bg-opacity-20 flex justify-start `} onClick={onClickChangeValue} >
            <div style={{ width: value + '%' }} class={`${classesInner} bg-white bg-opacity-60 cursor-pointer`}>
            
            </div>
            {polzunok && <div  class={` h-2 w-2 rounded-full bg-white mt-[-2px] ml-[-2px]`}></div>}
        </div>
    )
}

export default ProgresBar
