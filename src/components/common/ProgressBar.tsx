import { useRef } from "preact/hooks"

type ProgresBarProps = {
    classes?: string
    relativeValue: number // max value
    value: number // should be between 0 and 100 (percents)
    setValue: (value: number) => void
}

const ProgresBar = ({ value, setValue, relativeValue, classes }: ProgresBarProps) => {
    const container = useRef<HTMLDivElement>(null)

    const onClickChangeValue = (e: MouseEvent) => {
        if (e.target && container.current) {
            const { width, left } = container.current.getBoundingClientRect()
            const x = e.clientX - left
            setValue(x / width * relativeValue)
        }
    }

    return (
        <div ref={container} class={`${classes} cursor-pointer`} onClick={onClickChangeValue} >
            <div style={{ width: value + '%' }} class={`mr-auto h-1 bg-black cursor-pointer`}>
            </div>
        </div>
    )
}

export default ProgresBar