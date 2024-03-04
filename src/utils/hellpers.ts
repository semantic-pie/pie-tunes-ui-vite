
export const responseToObject = async (response: Response) => response.json()

export const logAndPipe = async (obj: any) => {
    console.log('log: ', obj)
    return obj;
}