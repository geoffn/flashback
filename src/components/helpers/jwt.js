import { getNodeText } from '@testing-library/dom'

var jwt = require('jsonwebtoken')

const jwtkey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxNDY0MzExMCwiaWF0IjoxNjE0NjQzMTEwfQ.UQLQL86cAgeYwU78A3djiV9gc8eFQH9ZJ3RQCz3C-p8'
export async function validateJWTCookie(uid){
    //validate that the user data is correct.  Return empty array if not or user if correct.
    const cookieJWT = uid
    console.log("jwt UID Cookie" + uid)

    if(uid){
        const status = jwt.verify(uid,jwtkey, (err, decode)=> {
            if(err){
                console.log(err)
                return false
            }else{
            console.log(decode.uid)
            console.log("JWT Returning true")
            return true
            }
        })

        return status
    }
    
    console.log('returning false')
    return false
}

export async function getJWTUID(uid){
    
    const decode = jwt.verify(uid,jwtkey)
    return decode.uid
}

export async function createJWTCookie(uid){
    //create the jwt from the user data
    //console.log('JWT UserId' + uid)
    const user = {
        uid: uid
    }
    const jwtUser = jwt.sign(user,jwtkey,{expiresIn:'1d'})
    return jwtUser
}

