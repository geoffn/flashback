import firebase from 'firebase/app'
import 'firebase/auth'
import {getAuthConfig} from './ConfigHelper'

const config = {
    apiKey: ,
    authDomain: 
}


firebase.initializeApp(config)

export const auth = firebase.auth()

