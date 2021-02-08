import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import FlashCards from './components/FlashCards'
import AddCards from './components/AddCards'
import EditCategories from './components/EditCategories'


function App() {

  return (
    <Router>

            <Switch>
                <Route path="/" exact component={FlashCards} />
                <Route path="/Event" component={AddCards} />
                <Route path="/AddEvent" component={EditCategories} />
            </Switch>
        </Router>
  );
}

export default App;
