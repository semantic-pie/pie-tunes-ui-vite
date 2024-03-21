import { api } from "@/api"
import { useAppSelector } from "@/redux/store"
import { useEffect, useState } from "preact/hooks"
import { getKek } from "./rgbAplit"

export const colorHook = () => {
    const track = useAppSelector(state => state.currentTrack)
    const [rgbs1, setRgbs1] = useState<string[]>()
    const [rgbs2, setRgbs2] = useState<string[]>()


    const changeRgbs1 = (rgbs: any) => {
        setRgbs1(rgbs)
    }

    const changeRgbs2 = (rgbs: any) => {
        setRgbs2(rgbs)
    }

    useEffect(() => {
        if (track) {
            console.log('start fetch')
            fetch(api.forTrackCover(track.musicAlbum.uuid))
                .then(res => res.blob())
                .then(blob => {
                    console.log('fetched')
                    const file = new File([blob], 'img', blob)
                    getKek(file, changeRgbs1, changeRgbs2)
                })
        }
    }, [track])

    useEffect(() => {

        if ( rgbs1 && rgbs2) {
            console.log('update background gradient')
            document.getElementsByTagName('html')[0].style.backgroundImage = createLinearGradient(rgbs1[3], rgbs1[Math.floor(rgbs1.length/2)], rgbs2[rgbs2.length-2])
        }
    }, [rgbs1, rgbs2])

    return {
        rgbs1,
        rgbs2
    }
}

const createLinearGradient = (c1: string, c2: string, c3: string) => `linear-gradient(175deg, ${c1}, ${c2}, ${c3})`

export const toRgb = (kek: { r: number, g: number, b: number }) =>
    `rgb(${kek.r},${kek.g},${kek.b})`
