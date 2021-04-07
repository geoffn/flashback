import React, { useState, useEffect } from "react"
import NavBar from "./Navbar"
import ViewCardSetCards from "./viewCardSetCards"
import { getCardsForCardset } from "./helpers/CardSetHelper"


const querystring = require('query-string')


//Get The Card Set and then get all cards not assigned to another set.

export default function CardSets(props) {

    const [currentCardSetId] = useState(querystring.parse(props.location.search).id)
    const [cardsAdded] = useState(0)
    const [navBarLinks, setNavBarLinks] = useState()
    

    // function forceCardsAdded(){
    //     setCardsAdded(cardsAdded => cardsAdded + 1)
    // }
    
    useEffect(() => {
        //console.log("card:" + currentCardSetId)
        getCardsForCardset(currentCardSetId).then((data)=> {
           // console.log("data:" + data)
            const nav = [{
                linkText: data[0].set_name,
                linkAnchor: "/cardsetedit?id=" + currentCardSetId,
                linkFunction: "Edit"
            },{
                linkText: data[0].set_name,
                linkAnchor: "/cardsetdelete?id=" + currentCardSetId,
                linkFunction: "Delete"
            }]
            setNavBarLinks(nav)
        })
      
    }, [currentCardSetId])

    
   
    return (
        <div className="wrapper">
            <NavBar navBarLinks={navBarLinks} />

             
            <ViewCardSetCards cardSetId={currentCardSetId} cardsAdded={cardsAdded}/>

           
  
        
        </div>
    )
}
