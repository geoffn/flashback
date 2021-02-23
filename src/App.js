import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import FlashCards from './components/FlashCards'
import AddCards from './components/AddCards'
import AddCardSets from './components/AddCardSets'
import CardSetEdit from './components/CardSetEdit'
import CardSets from './components/CardSets'
import CardSetView from './components/cardSetView'

function App() {

  return (
    <Router>

            <Switch>
                <Route path="/" exact component={FlashCards} />
                <Route path="/addcard" component={AddCards} />
                <Route path="/cardsets" component={CardSets} />
                <Route path="/cardsetedit" component={CardSetEdit} />
                <Route path="/cardsetview" component={CardSetView} />
            </Switch>
        </Router>
  );
}

export default App;
