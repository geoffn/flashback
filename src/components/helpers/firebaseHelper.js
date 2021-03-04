import firebase from 'firebase/app'
import 'firebase/auth'
import {getAuthConfig} from './ConfigHelper'

const config = {
    apiKey: 'AIzaSyDnFPmm_0LWGFv79Le86Cv69ZXeQYX4Gbk',
    authDomain: 'flashback-d84b5.firebaseapp.com'
}


firebase.initializeApp(config)

export const auth = firebase.auth()

