import React, { useState, useEffect } from "react"
import anime from 'animejs'
import { getCardsForCardset } from './helpers/CardSetHelper'

let playing = false


const handleClick = (key, e) => {
    if(playing)
    return;
  
  playing = true;
    //console.log(key)
    var divNode = document.getElementById(key)
    //console.log(divNode)
    
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
    
    const [cardListData, setCardListData] = useState();
    const [cardSet] = useState(props.cardSetId)
    
    useEffect(() => {

        async function populateCardData() {
            const callResponse = await getCardsForCardset(cardSet)
            
            await setCardListData(callResponse[0].cards)

        }
        
        populateCardData()

    }, [cardSet])



    return (

      <div className="flashCard">
          
            {cardListData && cardListData.map((cardList, index) => (
                
                <div className="fullCard" id={index} key={index} onClick={e => handleClick(index, e)}>
                <div className="cardItem">{cardList.primary_word}</div>
                <div className="cardAnswer">
                    {cardList.secondary_word}
                </div>
                </div>
               
              
            ))}

        
    </div>

    )
}