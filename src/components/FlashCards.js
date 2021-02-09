import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import FlashCardsChild from "./FlashCardsChild"

const querystring = require('query-string')


var DATA = require('../cards/cards.json')

const handleClick = (key, e) => {
    console.log(key)
    var divNode = document.getElementById(key)

    var answerCard = divNode.querySelector('.cardAnswer')
    console.log(answerCard.classList)
    if(answerCard.classList.contains('toggled')) {
        answerCard.classList.remove('toggled')
    } else {

    
    answerCard.classList.add('toggled')
    }
}

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
                <div className="fullCard" id={index} key={index} onClick={e => handleClick(index, e)}>
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