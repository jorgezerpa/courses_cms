import { Response } from "express"

export const handleResponse = (res:Response, status:number, message:string, data:{}) => {
    res.status(status).json({
        message: message,
        data: {...data}
    })
}

export const handleErrorResponse = (res:Response, status:number, error:string, data:{}) => {
    res.status(status).json({
        error: error,
        data: {...data}
    })
}
