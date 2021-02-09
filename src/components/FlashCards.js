import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import FlashCardsChild from "./FlashCardsChild"

const querystring = require('query-string')


var DATA = require('../cards/cards.json')


export default function FlashCards(props) {


// Query the Films node under it
// var query = root.child("spanish");


var categoryString = querystring.parse(props.location.search)
if (categoryString) {
    console.log(categoryString)
}
    return (
        <div className="flashCard">
            {DATA && DATA.map((card, index) => (
                <div className="fullCard">
                <div className="cardItem"><h2>{card.spanish}</h2></div>
                <div className="cardAnswer">
                    <h2>{card.english}</h2>
                    <div><FlashCardsChild childList={card.alternative} />
                       
                    </div>
                </div>
                </div>
            ))}

        
    </div>
    )
}