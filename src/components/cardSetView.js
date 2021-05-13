import React, { useState, useEffect } from "react"
import NavBar from "./Navbar"
import ViewCardSetCards from "./ViewCardSetCards"
import { getCardsForCardset } from "./helpers/CardSetHelper"
import { useCookies } from 'react-cookie'
import {getJWTUID} from './helpers/jwt'

const querystring = require('query-string')


//Get The Card Set and then get all cards not assigned to another set.

export default function CardSets(props) {

    const [currentCardSetId] = useState(querystring.parse(props.location.search).id)
    const [cardsAdded] = useState(0)
    const [navBarLinks, setNavBarLinks] = useState()
    const [cookies] = useCookies(['uid'])

    // function forceCardsAdded(){
    //     setCardsAdded(cardsAdded => cardsAdded + 1)
    // }
    
    useEffect(() => {
        //console.log("card:" + currentCardSetId)
        getJWTUID(cookies.uid).then((userId) => {
            getCardsForCardset(currentCardSetId, userId).then((data)=> {
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
    })
      
    }, [currentCardSetId])

    
   
    return (
        <div className="wrapper">
            <NavBar navBarLinks={navBarLinks} />

             
            <ViewCardSetCards cardSetId={currentCardSetId} cardsAdded={cardsAdded}/>

           
  
        
        </div>
    )
}
