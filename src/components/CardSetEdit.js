import React, { useState } from "react"
import AddCards from "./AddCards"
import AvailableCards from "./AvailableCards"
import AssignedCards from "./AssignedCards"


const querystring = require('query-string')


//Get The Card Set and then get all cards not assigned to another set.

export default function CardSets(props) {

    const [currentCardSetId] = useState(querystring.parse(props.location.search).id)


 

 
   
    return (
        <div className="wrapper">
             {<AddCards />}
            
            {<AssignedCards cardSetId={currentCardSetId} />}

           
  
            {<AvailableCards cardSetId={currentCardSetId} />}

        
        </div>
    )
}
