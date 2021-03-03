import React, {useState, useEffect} from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import AddCards from './components/AddCards'
import CardSetEdit from './components/CardSetEdit'
import CardSets from './components/CardSets'
import CardSetView from './components/cardSetView'
import firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { getAuthConfig } from './components/helpers/ConfigHelper'
import { loginUserByUID, loginAndRegisterNewUser } from './components/helpers/UserHelper'
import { useCookies } from 'react-cookie'
import { validateJWTCookie } from './components/helpers/jwt'
var jwt = require('jsonwebtoken')

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  //const [firebaseConfig, setFireBaseConfig] = useState(null)
  const [firebaseReady, setFirebaseReady] = useState(false)
  const [cookies, setCookie] = useCookies(['guid'])
  const [jwtid, setjwtid] = useState()

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

    async function populateFirebaseConfig(){
      const callResponse = await getAuthConfig()
      const fireConfig = {
       
         apiKey: callResponse.AUTH_KEY,
         authDomain: callResponse.AUTH_DOMAIN
      }
      //Initial Firebase if not already started
      if (!firebase.apps.length) {
        firebase.initializeApp(fireConfig);
        }
      
        setFirebaseReady(true)
      
    try{
      firebase.auth().onAuthStateChanged(user => {
          console.log(firebase.auth().currentUser)
          // const codeUser = {
          //   user: firebase.auth().currentUser.providerData[0].uid,
          //   displayName:firebase.auth().currentUser.providerData[0].displayName
          // }
          console.log("AUTHSTATECHANGED")
          setIsSignedIn(!!user)
          if(!!firebase.auth().currentUser){
          //setCookie('guid', jwt.sign(codeUser,jwtid,{expiresIn:'1d'}),{ path: '/' })
          loginUserByUID(firebase.auth().currentUser.providerData[0].uid).then((data) => {
            console.log(data)
            if (data.length){
              console.log("UID Set - Welcome Back")
            }else{
              //USER ID not found.  New User
              console.log("New User ")
              loginAndRegisterNewUser(firebase.auth().currentUser).then((data) => {console.log(data)})
            }
          
          })
        }
      })
          
        
      }catch(e){
        console.log("error auth" + e)
      }
    
 
  }
  populateFirebaseConfig()
}, []) 
  return (
    <div>
      {(firebaseReady) ? (
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
  ) : (<div></div>)}
  </div>)
  

}

export default App;
