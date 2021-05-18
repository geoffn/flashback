import axios from 'axios'

import {createJWTAPI} from './jwt'
export async function loginUserByUID(user) {
        

        var baseURL = process.env.REACT_APP_API_URL + 'user/' + user.providerData[0].uid
        //console.log(baseURL)
        const jwt = await createJWTAPI(user.providerData[0].uid)
    var responseData = await axios.get(baseURL,{
        headers: {
          'authorization': `Bearer ${jwt}`
        }})
    console.log(responseData.data.results.length)
    //If user is found then update the last login date.
    if (responseData.data.results.length) {
        const loginURL = process.env.REACT_APP_API_URL + 'loginuser/' + user.providerData[0].uid
        var loginData = await axios.get(loginURL,{
            headers: {
              'authorization': `Bearer ${jwt}`
            }})
        console.log("Login Date Set")
        return responseData.data.results
    }else{
        console.log("New User Registration")
    const newUser = {
        uid: user.providerData[0].uid,
        display_name: user.providerData[0].displayName,
        email: user.providerData[0].email,
        photo_url: user.providerData[0].photoURL,
        phone: user.providerData[0].phoneNumber,
        provider: user.providerData[0].providerId,
        last_login_date: new Date(),
        level: 1
    }
    const newUserURL = process.env.REACT_APP_API_URL + 'user' 
    const createdUser = await axios({
        method: 'post',
        url: newUserURL,
        data: newUser,
        headers: {
            'authorization': `Bearer ${jwt}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
       
    }
    
})
console.log(createdUser)
    }
    //console.log(responseData.data.results)
    //     await axios.get(baseURL).then((data) => {
        //console.log("user:" + JSON.stringify(data.data.results))
    return []
           
    }

export async function loginAndRegisterNewUser(user){
    console.log("New User Registration")
    const newUser = {
        uid: user.providerData[0].uid,
        display_name: user.providerData[0].displayName,
        email: user.providerData[0].email,
        photo_url: user.providerData[0].photoURL,
        phone: user.providerData[0].phoneNumber,
        provider: user.providerData[0].providerId,
        last_login_date: new Date(),
        level: 1
    }
    const baseURL = process.env.REACT_APP_API_URL + 'user' 
    const createdUser = await axios({
        method: 'post',
        url: baseURL,
        data: newUser,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
       
    }
})

    return createdUser
}
