
import axios from 'axios'

export async function getAuthConfig() {
        

        var baseURL = 'https://flashbackv1api.herokuapp.com/validate'
        //console.log(baseURL)
    
    var responseData = await axios.get(baseURL)
    //console.log(responseData.data)

    return responseData.data
           
    }

