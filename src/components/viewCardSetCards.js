import React, { useState, useEffect } from "react"
import axios from 'axios'
import anime from 'animejs'
import NavBar from './Navbar'
import { getCardsForCardset } from './helpers/CardSetHelper'

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




export default function ViewCardSetCards(props) {
    const [cardData, setCardData] = useState();
    const [cardSet] = useState('602dabe70ae7f10d81ba310d')
    
    useEffect(() => {

        async function populateCardData() {
            const callResponse = await getCardsForCardset(cardSet)
            console.log(callResponse)
            await setCardData(callResponse)
            console.log(cardSet)

        }
        
        populateCardData()

    }, [])



    return (

      <div className="flashCard">
          
            {cardData && cardData.map((cardList, index) => (
                <div><div>{cardList.set_name}</div><div>{cardList.set_description}</div><div><a href={'/cardsetedit?id=' + cardList._id}>Edit Card</a> </div>
                {cardList.cards && cardList.cards.map((card, index) => (
                <div className="fullCard" id={index} key={index} onClick={e => handleClick(index, e)}>
                <div className="cardItem"><h2>{card.primary_word}</h2></div>
                <div className="cardAnswer">
                    <h2>{card.secondary_word}</h2>
                </div>
                </div>
                ))}
                </div>
            ))}

        
    </div>

    )
}