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