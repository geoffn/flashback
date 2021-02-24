import React, { useState, useEffect } from "react"
import axios from 'axios'
import NavBar from './Navbar'
import { getAllCardSetsForUser } from "./helpers/CardSetHelper"
import AddCardSetForm from './addCardSetForm'



export default function CardSets(props) {

    const [cardSetData, setCardSetData] = useState(null)
    const [cardsAdded, setCardsAdded] = useState(0)

    function forceCardsAdded(){
        setCardsAdded(cardsAdded => cardsAdded + 1)
    }

    useEffect(() => {
        // var baseURL = 'https://flashbackv1api.herokuapp.com/cardset'
        // axios.get(baseURL).then((data) => setCardSetData(data.data.results))
        //     .catch(console.error)
        

        async function populateCardData() {
            const callResponse = await getAllCardSetsForUser()
            console.log(callResponse)
            await setCardSetData(callResponse)
            console.log(cardSetData)

        }
        
        populateCardData()
    }, [cardsAdded])

    return (
        <div className="wrapper">
            <NavBar />
            <div className="addCardForm">
            <AddCardSetForm forceCardsAdded={forceCardsAdded}/>
            </div>
        <div className="flashCard">
            {cardSetData && cardSetData.map((cardSet, index) => (
                <div className="fullCardSet" id={index} key={index}>
                    <h2>{cardSet.set_name}</h2>
                
                    <p>{cardSet.set_description}</p>

                    <p>Cards: {cardSet.cards.length}</p>

                    <a href={'/cardsetview?id=' + cardSet._id} alt="View Edit Card Set" >View/Edit</a>
                
                </div>
            ))}
        </div>
        
        </div>
    )
}
