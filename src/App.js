import React, {useState, useEffect} from 'react'
import './App.css';
import Entry from './components/Entry'
import firebase from 'firebase/app'
import 'firebase/auth'
//import {auth} from './components/helpers/firebaseHelper'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { getAuthConfig } from './components/helpers/ConfigHelper'
//import { loginUserByUID, loginAndRegisterNewUser } from './components/helpers/UserHelper'
import { useCookies } from 'react-cookie'
import { validateJWTCookie, createJWTCookie } from './components/helpers/jwt'
import { SignOut } from './components/SignOut';
//var jwt = require('jsonwebtoken')

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  //const [setCurrentUser] = useState()
  const [firebaseInit, setFirebaseInit] = useState(false)
  const [cookie, setCookie] = useCookies(['uid'])

  //StyledFirebaseAuth component config
  //Add other options for auth here
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }  
 
  function forceSignedOut(){
    setIsSignedIn(false)
    setFirebaseInit(true)
  }
  
  useEffect(() => {
    async function getConfig(){
      const config = await getAuthConfig()
      const returnConfig = {
          apiKey: config.AUTH_KEY,
          authDomain: config.AUTH_DOMAIN 
      }
      return returnConfig
      }
    //console.log('isSignedIn=' + isSignedIn)
    validateJWTCookie(cookie.uid)
        .then((validJWT) => {
          if(validJWT){
            setIsSignedIn(true)
          }else{
            getConfig().then((config) => {
              if (!firebase.apps.length) {
                firebase.initializeApp(config)
                setIsSignedIn(false)
                setFirebaseInit(true)
              }
              firebase.auth().onAuthStateChanged(user => {
                //console.log(auth.currentUser)
                  console.log(user)
                  if(user){
                  createJWTCookie(user.providerData[0].uid).then((jwtEncoded) => {
                    setCookie('uid',jwtEncoded, {path: '/'} )
                    console.log("encoded JWT in APP:" +jwtEncoded)
    
                    setCookie('displayName', user.providerData[0].displayName, {path: '/'})
                    
                    //setCurrentUser(user)
                    
                    setIsSignedIn(!!user)
                  })
                }else{
                    setIsSignedIn(false)
                    //console.log("User is null set signedinfalse")
                  }
          })

        })
      }
    })

    //If there is a cookie validate cookie if not then show login
    //If there is a JWT validate JWT else sho login
    //If valid JWT Login else go to login
    //console.log("FiringUseEffectApp")
    //console.log("issignedin=" + isSignedIn)
      //Initial Firebase if not already started
      


   
      
        
}, [isSignedIn, cookie.uid, setCookie]) 
  return (

   <div>
      
      {(isSignedIn) ? (
       <div>
       <SignOut forceSignedOut={forceSignedOut}/> 
    <Entry /></div>
        ) : (<div></div>)}

        {(firebaseInit && !isSignedIn) ? (
          <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
           </div>
         ): (<div></div>)}
        
        
        </div>

  )

}

export default App;
