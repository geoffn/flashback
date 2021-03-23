
var jwt = require('jsonwebtoken')

const jwtkey = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxNDY0MzExMCwiaWF0IjoxNjE0NjQzMTEwfQ.UQLQL86cAgeYwU78A3djiV9gc8eFQH9ZJ3RQCz3C-p8'
export async function validateJWTCookie(uid){
    //validate that the user data is correct.  Return empty array if not or user if correct.
    //const cookieJWT = uid
    //console.log("jwt UID Cookie" + uid)

    if(uid){
        try{
            return jwt.verify(uid, jwtkey)
            
        }catch(err){
            return false
        }
        
    }
    
    //console.log('returning false')
    return false
}

export async function getJWTUID(uid){
    try{
    const decode = jwt.verify(uid,jwtkey)
    return decode.uid
    }catch(err){
        console.log(err)
    }
    return false
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

