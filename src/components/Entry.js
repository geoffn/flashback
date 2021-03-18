import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import '../App.css';
import AddCards from './AddCards'
import CardSetEdit from './CardSetEdit'
import CardSets from './CardSets'
import CardSetView from './cardSetView'


function Entry() {
 
  return (

    <Router>

            <Switch>
                <Route path="/" exact component={CardSets} />
                <Route path="/addcard" component={AddCards} />
                <Route path="/cardsets" component={CardSets} />
                <Route path="/cardsetedit" component={CardSetEdit} />
                <Route path="/cardsetview" component={CardSetView} />
                

            </Switch>
        </Router>

  )

}

export default Entry;
