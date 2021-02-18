import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import FlashCards from './components/FlashCards'
import AddCards from './components/AddCards'
import AddCardSets from './components/AddCardSets'


function App() {

  return (
    <Router>

            <Switch>
                <Route path="/" exact component={FlashCards} />
                <Route path="/addcard" component={AddCards} />
                <Route path="/addcardset" component={AddCardSets} />
            </Switch>
        </Router>
  );
}

export default App;
