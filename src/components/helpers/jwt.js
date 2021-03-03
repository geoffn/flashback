
import { getNodeText } from '@testing-library/react'
import { useCookies } from 'react-cookie'
var jwt = require('jsonwebtoken')
export async function validateJWTCookie(jwtkey, guid){
    //validate that the user data is correct.  Return empty array if not or user if correct.
    const cookieJWT = guid
    if(cookieJWT.guid){
        const jwtGUID = cookieJWT.guid
        console.log('KEY: ' + jwtkey)
        
        try{
        const decode = jwt.verify(jwtGUID,jwtkey)
        console.log("decode:" + JSON.stringify(decode))
        console.log("Cookie:" + cookieJWT.guid)
        return decode
            
        }catch(err){
            console.log(err)
            //invalid token and user should auth
            return []
        }
        

        
    }
    return []
}

export async function createJWTCookie(user){
    //create the jwt from the user data

    return user
}

