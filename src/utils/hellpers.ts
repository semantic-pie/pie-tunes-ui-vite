import { PieApiResponse } from "@/api/client"

export const responseToObject = async (response: Response) => response.json()

export const responseToPieApiResponse = async (response: Response) : Promise<PieApiResponse<any>> => {
    let data 
    try {
       data = await response.json()
    } catch (err) {}
    return {
        data,
        meta: {
            status: response.status,
            xTotalCount: Number(response.headers.get('X-Total-Count'))
        }
    } 
}

export const logAndPipe = async (obj: any) => {
    console.log('log: ', obj)
    return obj;
}
export const toMinSec = (ms?: number) => {

    if (!ms) {
        return undefined
    }
    const min = Math.floor((ms / 1000 / 60) << 0)
    const sec = Math.floor((ms / 1000) % 60)

    return `${min}:${sec < 10 ? '0' + sec : sec}`
}

export const trancate = (v: string, max: number) => v.length > max ? v.substring(0, max) + '...' : v