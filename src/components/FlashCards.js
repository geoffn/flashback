import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from 'axios'

import CategoryBar from './CategoryBar'

const querystring = require('query-string')




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
    const [cardData, setCardData] = useState(null);
    
    useEffect(() => {
        var baseURL = 'http://localhost:3001/card'
        if (props.location.search.length > 1){
            console.log(props.location.search.length)
            var categoryString = querystring.parse(props.location.search)
        
            console.log(categoryString)
            var baseURL = 'http://localhost:3001/cardcat/' + categoryString.cat
            console.log(baseURL)
        }

        //If search criteria is provided then search

        axios.get(baseURL).then((data) => setCardData(data.data.results))
            .catch(console.error)

    }, [])




const setToggleAll = (toggleSetting) => {
    const answerCards = document.querySelectorAll('.cardAnswer')
    console.log(answerCards)
    if(toggleSetting === 'off'){
    answerCards.forEach(ac => ac.classList.remove('toggled'))
    }else
    {
        answerCards.forEach(ac => ac.classList.add('toggled'))
    }

}

    return (
        <div className="flashCard"><div className="toggleAll"><CategoryBar /></div>
            <div className="toggleAll"><button id="toggleBtn" onClick={e => setToggleAll('off')}>Toggle All Off</button>
            <button id="toggleBtn" onClick={e => setToggleAll('on')}>Toggle All On</button></div>
            {cardData && cardData.map((card, index) => (
                <div className="fullCard" id={index} key={index} onClick={e => handleClick(index, e)}>
                <div className="cardItem"><h2>{card.spanish}</h2></div>
                <div className="cardAnswer">
                    <h2>{card.english}</h2>
                    <div>{card.alternatives.map((alternative,index) => (
                        
                        <h4 key={index}>{alternative.altType} : {alternative.value}</h4>
                    ))}
                       
                    </div>
                </div>
                </div>
            ))}

        
    </div>
    )
}