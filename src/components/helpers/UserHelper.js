import axios from 'axios'

export async function loginUserByUID(uid) {
        

        var baseURL = process.env.REACT_APP_API_URL + '/user/' + uid
        //console.log(baseURL)
    
    var responseData = await axios.get(baseURL)
    console.log(responseData.data.results.length)
    //If user is found then update the last login date.
    if (responseData.data.results.length) {
        const loginURL = process.env.REACT_APP_API_URL + 'loginuser/' + uid
        var loginData = await axios.get(loginURL)
        console.log("Login Date Set")
        return responseData.data.results
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
