import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import FlashCardsChild from "./FlashCardsChild"
import axios from 'axios'

const querystring = require('query-string')

const allCards = async () => {

    let baseURL = 'http://localhost:3001/card'

    //If search criteria is provided then search

    let results = await axios.get(baseURL)
        .catch((e) => {
            console.log(e)
        })


    console.log("results: " + results.data)

    return results

}



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
    let baseURL = 'http://localhost:3001/card'

        //If search criteria is provided then search

        axios.get(baseURL).then((data) => setCardData(data.data.results))
            .catch(console.error)

    }, [])


// var categoryString = querystring.parse(props.location.search)
// if (categoryString) {
//     console.log(categoryString)
// }
console.log(cardData)

    return (
        <div className="flashCard">
            {cardData && cardData.map((card, index) => (
                <div className="fullCard" id={index} key={index} onClick={e => handleClick(index, e)}>
                <div className="cardItem"><h2>{card.spanish}</h2></div>
                <div className="cardAnswer">
                    <h2>{card.english}</h2>
                    <div><FlashCardsChild childList={card.alternatives} />
                       
                    </div>
                </div>
                </div>
            ))}

        
    </div>
    )
}