import React, { useState, useEffect } from "react"
import anime from 'animejs'
import { getCardsForCardset } from './helpers/CardSetHelper'
import { useCookies } from 'react-cookie'
import {getJWTUID} from './helpers/jwt'

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
    const [cookies] = useCookies(['uid'])
    const [cardListData, setCardListData] = useState();
    const [cardSet] = useState(props.cardSetId)
    
    useEffect(() => {
        getJWTUID(cookies.uid).then((userId) => {
            console.log("View UID:" + userId)
            getCardsForCardset(cardSet, userId).then((callResponse) => {
                console.log(callResponse)
                setCardListData(callResponse[0].cards)
            })
        })
        // async function populateCardData() {
        //     const userId = await getJWTUID(cookies.uid)
        //     console.log("View UID:" + userId)
        //     const callResponse = await getCardsForCardset(cardSet,userId)
            
        //     await setCardListData(callResponse[0].cards)

        // }
        
        // populateCardData()

    }, [cardSet, cookies.uid])



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