
import { API_RESPONSE_HANDLER, STATUS } from '../Constants/API_RESPONSE_HANDLER';
import auth from '@react-native-firebase/auth';
 

export async function GetSignUp(email, password){

    let status, data, message, code
    try{

        const signInResponse = await auth().createUserWithEmailAndPassword(email, password)

        status = STATUS.SUCCESS
        data = signInResponse
    }
    catch(error){
        message =  error.message
        code = error.code
        status = STATUS.FAILED
    }

    return API_RESPONSE_HANDLER(status, message, data, code)
}

export async function GetSignIn(email, password){

    let status, data, message, code
    try{

        const signInResponse = await auth().signInWithEmailAndPassword(email, password)

        status = STATUS.SUCCESS
        data = signInResponse
    }
    catch(error){
        message =  error.message
        code = error.code
        status = STATUS.FAILED
    }

    return API_RESPONSE_HANDLER(status, message, data, code)
}


export async function GetSignOut(){

    let status, data, message, code
    try{

        await auth().signOut()

        status = STATUS.SUCCESS
        data = signInResponse
    }
    catch(error){
        message =  error.message
        code = error.code
        status = STATUS.FAILED
    }

    return API_RESPONSE_HANDLER(status, message, data, code)
}



export async function GetPasswordResetMail(email){

    let status, data, message, code
    try{

        await auth().sendPasswordResetEmail()

        status = STATUS.SUCCESS
        data = signInResponse
    }
    catch(error){
        message =  error.message
        code = error.code
        status = STATUS.FAILED
    }

    return API_RESPONSE_HANDLER(status, message, data, code)
}




