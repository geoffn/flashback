import React, {useState, useEffect} from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import AddCards from './components/AddCards'
import CardSetEdit from './components/CardSetEdit'
import CardSets from './components/CardSets'
import CardSetView from './components/cardSetView'
import firebase from 'firebase/app'
import {auth} from './components/helpers/firebaseHelper'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { getAuthConfig } from './components/helpers/ConfigHelper'
import { loginUserByUID, loginAndRegisterNewUser } from './components/helpers/UserHelper'
import { useCookies } from 'react-cookie'
import { validateJWTCookie } from './components/helpers/jwt'
var jwt = require('jsonwebtoken')

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState()
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
 

      //Initial Firebase if not already started
    
      auth.onAuthStateChanged(user => {
          console.log(auth.currentUser)
          setCookie('uid',user.providerData[0].uid, {path: '/'} )
          setCookie('displayName', user.providerData[0].displayName, {path: '/'})
          
          setCurrentUser(user)
          
          setIsSignedIn(!!user)
          
      })
          
        
}, []) 
  return (

   <div>
      
      {(isSignedIn) ? (
        
    <Router>

            <Switch>
                <Route path="/" exact component={CardSets} />
                <Route path="/addcard" component={AddCards} />
                <Route path="/cardsets" component={CardSets} />
                <Route path="/cardsetedit" component={CardSetEdit} />
                <Route path="/cardsetview" component={CardSetView} />
                

            </Switch>
        </Router>
        ) : (<div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
           </div>
         )}
        </div>

  )

}

export default App;
