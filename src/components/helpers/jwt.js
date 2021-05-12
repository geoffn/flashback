import firebase from 'firebase/app'
import 'firebase/auth'
var jwt = require('jsonwebtoken')


const jwtkey = process.env.REACT_APP_JWT
const jwtAPIKey = process.env.REACT_APP_API_JWT
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
    console.log("decode:" + decode.uid)
    return decode.uid
    
    }catch(err){
        console.log("Error JTW:" +err)
        
        return false
    }
     
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

export async function createJWTAPI(uid){
    //console.log("Cookie:" + document.cookie("uid"))
    
    console.log("UID:" + uid)
    try{
        const user = {
            uid: uid
        }
        const jwtAPI = jwt.sign(user,jwtAPIKey, {expiresIn:'5m'})
        console.log("JWTAPIT: " + jwtAPI)
        return jwtAPI
    }catch(err){
        console.log(err)
    }
    
}