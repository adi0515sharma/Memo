export const STATUS = {
    SUCCESS : "SUCCESS",
    FAILED : "FAILED",
    LOADING : "LOADING"
}



export function API_RESPONSE_HANDLER(status, message, data, code){
    console.log(status)
    console.log(message)
    return {
        status,
        message,
        data,
        code
    }
}