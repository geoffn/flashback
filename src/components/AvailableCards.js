import React, { useState, useEffect } from "react"
import axios from 'axios'


//Get The Card Set and then get all cards not assigned to another set.

export default function AvailableCards(props) {

    const [availableCards, setAvailableCards] = useState([])
    const [currentCardSetId] = useState(props.cardSetId)
    

    useEffect(() => {

        var baseCardURL =  'https://flashbackv1api.herokuapp.com/card'   
        axios.get(baseCardURL).then((data) => setAvailableCards(data.data.results))
            .catch(console.error)

    }, [])

    //Create a list of individual cards from the cardset array of cards.
    
    function addCardToSet(cardSet, card) {
        //call remove card api
        console.log("cards " + cardSet, card)
    //     console.log(req.body.cardId)
    // console.log(req.body.cardSetId)
        const postData = {
            cardId : card,
            cardSetId : cardSet
        }
        const baseURL = 'https://flashbackv1api.herokuapp.com/cardsetaddcard'
    axios({
        method: 'post',
        url: baseURL,
        data: postData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }).then(() => {
        console.log("submitted: " )
        props.forceCardsAdded()
    })
    
       
       
    }
    return (
        <div className="flashCard">
            {availableCards && availableCards.map((cardSet, index) => (
                <div className="fullCard" id={index} key={index}>
                    <h2>Available Card</h2>
                    <h2>{cardSet.set_name}</h2>
                
                    <p>{cardSet.primary_word}</p>

                    <p>{cardSet.secondary_word}</p>

                    <p><button onClick={() => addCardToSet(currentCardSetId,cardSet._id)}>Add Card {console.log(currentCardSetId)}</button></p>
                
                </div>
            ))}

        
        </div>
    )
}
