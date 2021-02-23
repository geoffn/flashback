import React, { useState, useEffect } from "react"
import axios from 'axios'
import { removeCard, updateAssignedCards } from './helpers/CardSetHelper'


export default function AssignedCards(props) {

    const [cardSetData, setCardSetData] = useState([])
    const [currentCardSetId, setCurrentCardSetId] = useState(props.cardSetId)
    const [rerender, setRerender] = useState(0)
    console.log("CardsAdded:" + props.cardsAdded)

    useEffect(() => {

        console.log('rerender:' + rerender)
        var baseURL = 'https://flashbackv1api.herokuapp.com/cardset/' + currentCardSetId
        console.log(baseURL)
        axios.get(baseURL).then((data) => usedSetData(data.data.results))
            .catch(console.error)
       

    }, [currentCardSetId, props.cardsAdded, rerender])

    //Create a list of individual cards from the cardset array of cards.
    function usedSetData(cardSetsPre){
        console.log(cardSetsPre)
        var cardsUsed = []
        cardSetsPre.map((cardSet, index) => (
                cardSet.cards.map((card, index) => {
    
                
                    cardsUsed.push({
                        cardSetId : cardSet._id,
                        cardId : card._id,
                        primary_language : card.primary_language,
                        secondary_language : card.secondary_language,
                        primary_word : card.primary_word,
                        secondary_word : card.secondary_word,
                        category : card.category,
                        wordType : card.wordType
                   })
                })
            )
        )
            

        setCardSetData(cardsUsed)
        // console.log(cardSetsPre)
    }

    function removeAndUpdate(cardSet, card){
        const CallResponse = removeCard(cardSet, card)

        if (CallResponse){
            updateAssignedCards(cardSet)
        }
        setRerender(rerender => (rerender + 1))
    }
    // function removeCard(cardSet, card) {
    //     //call remove card api
    //         //call remove card api
    //         console.log("cards " + cardSet, card)
    //         //     console.log(req.body.cardId)
    //         // console.log(req.body.cardSetId)
    //             const postData = {
    //                 cardId : card,
    //                 cardSetId : cardSet
    //             }
    //             var baseURL = 'https://flashbackv1api.herokuapp.com/cardsetremovecard'
    //         axios({
    //             method: 'post',
    //             url: baseURL,
    //             data: postData,
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //                 "Access-Control-Allow-Origin": "*",
    //             }
    //         }).then(() => {
    //             //
    //              baseURL = 'https://flashbackv1api.herokuapp.com/cardset/' + currentCardSetId
    //     console.log(baseURL)
    //     axios.get(baseURL).then((data) => usedSetData(data.data.results))
    //         .catch(console.error)
    //         })
           
    // }
   
    return (
        <div className="flashCard">
            {cardSetData && cardSetData.map((cardSet, index) => (
                <div className="fullCard" id={index} key={index}>
                    <h2>Assigned</h2>
                    <h2>{cardSet.set_name}</h2>
                
                    <p>{cardSet.primary_word}</p>

                    <p>{cardSet.secondary_word}</p>

                    <p><button onClick={() => removeAndUpdate(currentCardSetId,cardSet.cardId)}>Remove Card</button></p>
                
                </div>
            ))}
        </div>
    )
}
