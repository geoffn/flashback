import axios from 'axios'

export async function loginUserByUID(uid) {
        

        var baseURL = 'https://flashbackv1api.herokuapp.com/user/' + uid
        //console.log(baseURL)
    
    var responseData = await axios.get(baseURL)

    //If user is found then update the last login date.
    if (responseData.data) {
        const loginURL = 'https://flashbackv1api.herokuapp.com/loginuser/' + uid
        var loginData = await axios.get(loginURL)
        console.log("Login Date Set")
    } else
    {
        console.log("NEW USER" + uid)
    }
    //console.log(responseData.data.results)
    //     await axios.get(baseURL).then((data) => {
        //console.log("user:" + JSON.stringify(data.data.results))
    return responseData.data.results
           
    }

