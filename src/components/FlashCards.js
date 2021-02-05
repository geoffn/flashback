import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
const querystring = require('query-string')


var DATA = require('../cards/cards.json')


export default function FlashCards(props) {


var categoryString = querystring.parse(props.location.search)
if (categoryString) {
    console.log(categoryString)
}
console.log(DATA)

    return (
        <div className="flashCard">
            {DATA && DATA.map((card, index) => (
                <div className="fullCard">
                <div className="cardItem"><h2>{card.spanish}</h2></div>
                <div className="cardAnswer">
                    <h2>{card.english}</h2>
                    <h4>{card.alternative.toString()}</h4>
                </div>
                </div>
            ))}
        <div className="cardItem"><h2>Domingo</h2></div>
        <div className="cardItem"><h3>Sunday</h3>
        category: calendar</div>
    </div>
    )
}