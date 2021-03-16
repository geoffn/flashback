import firebase from 'firebase/app'
import 'firebase/auth'
import {getAuthConfig} from './ConfigHelper'


async function getConfig(){
const config = await getAuthConfig()
const returnConfig = {
    apiKey: config.AUTH_KEY,
    authDomain: config.AUTH_DOMAIN 
}
return returnConfig
}
getConfig().then((config) => {
    if (!firebase.apps.length) {
        
    firebase.initializeApp(config)
    }
})


//export const auth = firebase.auth()

