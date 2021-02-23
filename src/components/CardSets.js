import React, { useState, useEffect } from "react"
import axios from 'axios'
import NavBar from './Navbar'


export default function CardSets(props) {

    const [cardSetData, setCardSetData] = useState(null)

    useEffect(() => {
        var baseURL = 'https://flashbackv1api.herokuapp.com/cardset'
        axios.get(baseURL).then((data) => setCardSetData(data.data.results))
            .catch(console.error)
        

    }, [])

    return (
        <div className="wrapper">
            <NavBar />
        <div className="flashCard">
            {cardSetData && cardSetData.map((cardSet, index) => (
                <div className="fullCard" id={index} key={index}>
                    <h2>{cardSet.set_name}</h2>
                
                    <p>{cardSet.set_description}</p>

                    <p>Cards: {cardSet.cards.length}</p>

                    <a href={'/cardsetedit?id=' + cardSet._id} alt="View Edit Card Set" >View/Edit</a>
                
                </div>
            ))}
        </div>
        
        </div>
    )
}
