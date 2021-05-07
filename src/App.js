import React, {useState, useEffect} from 'react'
import './App.css';
import Entry from './components/Entry'
import firebase from 'firebase/app'
import 'firebase/auth'
//import {auth} from './components/helpers/firebaseHelper'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { getAuthConfig } from './components/helpers/ConfigHelper'
import { loginUserByUID, loginAndRegisterNewUser } from './components/helpers/UserHelper'
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
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
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
                    
                    loginUserByUID(user)
                    
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

    
      


   
      
        
}, [isSignedIn, cookie.uid, setCookie]) 
  return (

   <div>
      
      {(isSignedIn) ? (
       <div>
       <SignOut forceSignedOut={forceSignedOut}/> 
    <Entry /></div>
        ) : (<div></div>)}

        {(firebaseInit && !isSignedIn) ? (
          <div  className="categoryBarContainer login">
          <div className="categoryBar logo"><a href="/"><img src="/img/mlmain.png" alt="My Learning Cards"></img>My Learning Cards</a></div>
          <div className="categoryBar">Welcome to my learning cards where you can create your own personalized flashcards.  You can login/signup with the below methods. </div> 
          <div className="categoryBar">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
           </div>
           <div className="categoryBar outdoor"><img src="/img/Outdoor.png" alt="Outdoor Coders Logo"></img>
           <a href="http://localhost:3000/terms.html" target="popup" 
  onclick="window.open('terms.html','popup','width=600,height=600'); return false;">terms and conditions</a></div>
           </div>
         ): (<div></div>)}
        
        
        </div>

  )

}

export default App;
