import React, { useState, useEffect } from "react"
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
            // console.log(props.location.search.length)
            var categoryString = querystring.parse(props.location.search)
        
            // console.log(categoryString)
            baseURL = 'https://flashbackv1api.herokuapp.com/cardcat/' + categoryString.cat
            // console.log(baseURL)
        }

        //If search criteria is provided then search

        axios.get(baseURL).then((data) => setCardData(data.data.results))
            .catch(console.error)

    }, [props.location.search])




// const setToggleAll = (toggleSetting) => {
//     const answerCards = document.querySelectorAll('.cardAnswer')
//     console.log(answerCards)
//     if(toggleSetting === 'off'){
//     answerCards.forEach(ac => ac.classList.remove('toggled'))
//     }else
//     {
//         answerCards.forEach(ac => ac.classList.add('toggled'))
//     }

// }

    return (
        <div className="wrapper">
            <nav className="main-nav">
      <ul>
        <li>
          <a href="/" alt="Spanish to English">Spanish to English</a>
        </li>
        <li>
          <a href="/addcard" alt="Add Card">Add Card</a>
        </li>
        </ul>
        </nav>
        

        <CategoryBar active={querystring.parse(props.location.search)}/>
        <div className="flashCard">
            {cardData && cardData.map((card, index) => (
                <div className="fullCard" id={index} key={index} onClick={e => handleClick(index, e)}>
                <div className="cardItem"><h2>{card.primary_word}</h2></div>
                <div className="cardAnswer">
                    <h2>{card.secondary_word}</h2>
                </div>
                </div>
            ))}

        
    </div>
    </div>
    )
}