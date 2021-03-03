import React, { useState, useEffect } from "react"
import NavBar from './Navbar'
import { getAllCardSetsForUser } from "./helpers/CardSetHelper"
import AddCardSetForm from './addCardSetForm'
import firebase from 'firebase'


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
            const callResponse = await getAllCardSetsForUser(firebase.auth().currentUser.providerData[0].uid)
            //console.log(callResponse)
            await setCardSetData(callResponse)
            //console.log(cardSetData)

        }
        
        populateCardData()
    }, [cardsAdded])

    return (
        <div className="wrapper">
            <NavBar />
            
            <AddCardSetForm forceCardsAdded={forceCardsAdded}/>
            
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
