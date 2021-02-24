import React, { useState, useEffect } from "react"
import AddCards from "./AddCards"
import AvailableCards from "./AvailableCards"
import AssignedCards from "./AssignedCards"
import NavBar from "./Navbar"
import ViewCardSetCards from "./viewCardSetCards"
import { getCardsForCardset } from "./helpers/CardSetHelper"


const querystring = require('query-string')


//Get The Card Set and then get all cards not assigned to another set.

export default function CardSets(props) {

    const [currentCardSetId] = useState(querystring.parse(props.location.search).id)
    const [cardsAdded, setCardsAdded] = useState(0)
    const [navBarLinks, setNavBarLinks] = useState()
    const [cardData, setCardData] = useState();

    function forceCardsAdded(){
        setCardsAdded(cardsAdded => cardsAdded + 1)
    }
    // getCardsForCardset(currentCardSetId).then((data) => {
    //     setCardData(data)
    // })

   
    return (
        <div className="wrapper">
            <NavBar  />

             
            <ViewCardSetCards cardSetId={currentCardSetId} cardsAdded={cardsAdded}/>

           
  
        
        </div>
    )
}
