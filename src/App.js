import React, {useState, useEffect} from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import AddCards from './components/AddCards'
import CardSetEdit from './components/CardSetEdit'
import CardSets from './components/CardSets'
import CardSetView from './components/cardSetView'
import Entry from './components/Entry'
import firebase from 'firebase/app'
import 'firebase/auth'
//import {auth} from './components/helpers/firebaseHelper'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { getAuthConfig } from './components/helpers/ConfigHelper'
//import { loginUserByUID, loginAndRegisterNewUser } from './components/helpers/UserHelper'
import { useCookies } from 'react-cookie'
import { validateJWTCookie, createJWTCookie } from './components/helpers/jwt'
//var jwt = require('jsonwebtoken')

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const [firebaseInit, setFirebaseInit] = useState(false)
  const [cookie, setCookie] = useCookies(['token'])

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
 
  
  useEffect(() => {
    async function getConfig(){
      const config = await getAuthConfig()
      const returnConfig = {
          apiKey: config.AUTH_KEY,
          authDomain: config.AUTH_DOMAIN 
      }
      return returnConfig
      }
    
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
                  createJWTCookie(user.providerData[0].uid).then((jwtEncoded) => {
                    setCookie('uid',jwtEncoded, {path: '/'} )
                    console.log("encoded JWT in APP:" +jwtEncoded)
    
                    setCookie('displayName', user.providerData[0].displayName, {path: '/'})
                    
                    setCurrentUser(user)
                    
                    setIsSignedIn(!!user)
                  })
          })

        })
      }
    })

    //If there is a cookie validate cookie if not then show login
    //If there is a JWT validate JWT else sho login
    //If valid JWT Login else go to login
    console.log("FiringUseEffectApp")
      //Initial Firebase if not already started
      


   
      
        
}, [isSignedIn]) 
  return (

   <div>
      
      {(isSignedIn) ? (
        
    <Entry />
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
