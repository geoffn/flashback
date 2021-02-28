import React, {useState, useEffect} from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import AddCards from './components/AddCards'
import CardSetEdit from './components/CardSetEdit'
import CardSets from './components/CardSets'
import CardSetView from './components/cardSetView'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { getAuthConfig } from './components/helpers/ConfigHelper'
import { loginUserByUID } from './components/helpers/UserHelper'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  //const [firebaseConfig, setFireBaseConfig] = useState(null)
  const [firebaseReady, setFirebaseReady] = useState(false)

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
      //await setFireBaseConfig(callResponse)
      
      const fireConfig = {
       
         apiKey: callResponse.AUTH_KEY,
         authDomain: callResponse.AUTH_DOMAIN
      }
      if (!firebase.apps.length) {
        firebase.initializeApp(fireConfig);
        }
      //console.log(fireConfig)
 
    try{
      firebase.auth().onAuthStateChanged(user => {
          //console.log(firebase.auth().currentUser)
    
          setIsSignedIn(!!user)
          setFirebaseReady(true)
          loginUserByUID(firebase.auth().currentUser.providerData[0].uid)
          
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
