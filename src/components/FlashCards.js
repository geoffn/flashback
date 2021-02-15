import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from 'axios'
import anime from 'animejs'

import CategoryBar from './CategoryBar'

const querystring = require('query-string')

let playing = false


const handleClick = (key, e) => {
    if(playing)
    return;
  
  playing = true;
    console.log(key)
    var divNode = document.getElementById(key)
    console.log(divNode)
    
    anime({
        targets: divNode,
        //scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
        rotateY: {value: '+=180', delay: 100},
        easing: 'easeInOutSine',
        duration: 400,
        complete: function(anim){
            playing = false;
        }
      });
}




export default function FlashCards(props) {
    const [cardData, setCardData] = useState(null);
    
    useEffect(() => {
        var baseURL = 'https://flashbackv1api.herokuapp.com/card'
        if (props.location.search.length > 1){
            console.log(props.location.search.length)
            var categoryString = querystring.parse(props.location.search)
        
            console.log(categoryString)
            var baseURL = 'https://flashbackv1api.herokuapp.com/cardcat/' + categoryString.cat
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
        <div className="flashCard"><div className="categoryBarContainer"><CategoryBar /></div>
            <div className="toggleAll"><button id="toggleBtn" onClick={e => setToggleAll('off')}>Toggle All Off</button>
            <button id="toggleBtn" onClick={e => setToggleAll('on')}>Toggle All On</button></div>
            {cardData && cardData.map((card, index) => (
                <div className="fullCard" id={index} key={index} onClick={e => handleClick(index, e)}>
                <div className="cardItem"><h2>{card.spanish}</h2></div>
                <div className="cardAnswer">
                    <h2>{card.english}</h2>
                </div>
                </div>
            ))}

        
    </div>
    )
}