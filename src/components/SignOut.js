import React from "react";
import firebase from 'firebase/app'
import 'firebase/auth'
import { useCookies } from 'react-cookie'
import { getAuthConfig } from './helpers/ConfigHelper'
//import { useHistory } from 'react-router-dom'
export function SignOut(props) {
    const [cookies, setCookie] = useCookies(['token'])
    //const history = useHistory()
    
        async function getConfig(){
            const config = await getAuthConfig()
            const returnConfig = {
                apiKey: config.AUTH_KEY,
                authDomain: config.AUTH_DOMAIN 
            }
            return returnConfig
            }

            

            const logout= (key, e) => {
                
                console.log("Signing Out")
                getConfig().then((config) => {
                    if (!firebase.apps.length) {
                        firebase.initializeApp(config)
                    }
                    firebase.auth().signOut()
                }).then(setCookie('uid','invalid', {path: '/'} ))
                    
                    
                .then(() => {
                    console.log('History Push')
                    props.forceSignedOut()  
                    
                })
            }
            return (
                <div  className="categoryBarContainer">
                    <div className="categoryBar logo"><a href="/"><img src="/img/mlmain.png" alt="My Learning Cards"></img>My Learning Cards</a></div>
                
                    <div className="categoryBar" onClick={e => logout()}>Logout: {cookies.displayName}</div>
                </div>
        )

}
