import React, { useEffect, useState } from "react"
import AddCards from "./AddCards"
import AvailableCards from "./AvailableCards"
import AssignedCards from "./AssignedCards"
import NavBar from "./Navbar"
import { getCardsForCardset } from './helpers/CardSetHelper'

const querystring = require('query-string')


//Get The Card Set and then get all cards not assigned to another set.

export default function CardSets(props) {

    const [currentCardSetId] = useState(querystring.parse(props.location.search).id)
    const [cardsAdded, setCardsAdded] = useState(0)
    const [navBarLinks, setNavBarLinks] = useState()

    function forceCardsAdded(){
        setCardsAdded(cardsAdded => cardsAdded + 1)
    }
    useEffect(() => {
        //console.log("card:" + currentCardSetId)
        getCardsForCardset(currentCardSetId).then((data)=> {
            console.log("data:" + data)
            const nav = [{
                linkText: data[0].set_name,
                linkAnchor: "/cardsetview?id=" + currentCardSetId,
                linkFunction: "View"
            }]
            setNavBarLinks(nav)
        })
      
    }, [currentCardSetId])
 
   
    return (
        <div className="wrapper">
            <NavBar navBarLinks={navBarLinks}/>

             {<AddCards cardSetId={currentCardSetId} forceCardsAdded={forceCardsAdded} />}
            
            {<AssignedCards cardSetId={currentCardSetId} cardsAdded={cardsAdded}/>}

           
  
            {<AvailableCards cardSetId={currentCardSetId} forceCardsAdded={forceCardsAdded}/>}

        
        </div>
    )
}
