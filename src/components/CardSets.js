import React, { useState, useEffect } from "react"
import NavBar from './Navbar'
import { getAllCardSetsForUser } from "./helpers/CardSetHelper"
import AddCardSetForm from './addCardSetForm'
//import firebase from 'firebase'
import { useCookies } from 'react-cookie'
import {getJWTUID} from './helpers/jwt'


export default function CardSets(props) {

    const [cardSetData, setCardSetData] = useState(null)
    const [cardsAdded, setCardsAdded] = useState(0)
    const [cookies, setCookie] = useCookies(['uid'])

    function forceCardsAdded(){
        setCardsAdded(cardsAdded => cardsAdded + 1)
    }

    useEffect(() => {
        // var baseURL = 'https://flashbackv1api.herokuapp.com/cardset'
        // axios.get(baseURL).then((data) => setCardSetData(data.data.results))
        //     .catch(console.error)
        console.log("cookie=" +cookies.uid)
        const UID = getJWTUID(cookies.uid)
        console.log('UID decoded=' + UID)
        
        async function populateCardData() {
            const callResponse = await getAllCardSetsForUser(UID)
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
