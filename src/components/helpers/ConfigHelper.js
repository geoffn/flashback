
import axios from 'axios'

export async function getAuthConfig() {
        
    


    const data = {
        AUTH_KEY : process.env.REACT_APP_AUTH_KEY,
        AUTH_DOMAIN : process.env.REACT_APP_AUTH_DOMAIN,
        JWT : process.env.REACT_APP_JWT
    }
    console.log("AUTHDOMAIN:" + process.env.REACT_APP_AUTH_DOMAIN)
    console.log("APIURL:" + process.env.REACT_APP_API_URL)
    return data
           
    }

