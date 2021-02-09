import React, { useState, useEffect } from "react"

export default function FlashCardsChild(props) {

    

    var DATA = props.childList
    console.log(Object.entries(DATA))
    

    return (
        <div>
           {Object.entries(DATA).map(([key, val]) => (
                
                    <h4>{key} : {val}
                    </h4>
                
                
            ))}
                
            

        
    </div>
    )
 }

// {DATA && DATA.map((card, index) => (
//     <div className="cardAnswer">
//         <h4>{Object.keys(card)[index]} : {Object.values(card)[index]}
//         </h4>
    