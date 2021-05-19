import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import '../App.css';
import AddCards from './AddCards'
import CardSetEdit from './CardSetEdit'
import CardSets from './CardSets'
import CardSetView from './CardSetView'
import CardSetDelete from './CardSetDelete'
import ViewCurrentConfig from './ViewCurrentConfig';



function Entry() {
 
  return (

    <Router>

            <Switch>
                <Route path="/" exact component={CardSets} />
                <Route path="/addcard" component={AddCards} />
                <Route path="/cardsets" component={CardSets} />
                <Route path="/cardsetedit" component={CardSetEdit} />
                <Route path="/cardsetview" component={CardSetView} />
                <Route path="/cardsetdelete" component={CardSetDelete} />
                {/* <Route path="/viewcurrentconfig" component={ViewCurrentConfig} /> */}
            </Switch>
        </Router>

  )

}

export default Entry;
