import { Message } from "../constant/message.interface"; 
import { StatusCode } from "../constant/statusCode.interface"; 

export class expressError extends Error{
    status: number
    constructor(
        status: number = StatusCode.INTERNAL_SERVER_ERROR,
        message: string = Message.INTERNAL_SERVER_ERROR
    ){
        super(message)
        this.status = status
    }
}