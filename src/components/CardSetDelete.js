import React, { useState, useEffect } from "react"
import { getCardsForCardset, deleteCardSet } from './helpers/CardSetHelper'
import { useCookies } from 'react-cookie'
import {getJWTUID} from './helpers/jwt'

const querystring = require('query-string')

export default function CardSetDelete(props){

    const [currentCardSetId] = useState(querystring.parse(props.location.search).id)
    const [cardSetName, setCardSetName] = useState()
    const [cookies] = useCookies(['uid'])

    const deleteCards = event => {
        console.log(event)
        deleteCardSet(currentCardSetId).then((data) => {
            props.history.push("/?refresh=true")
        })

        

    }

    useEffect(() => {
        getJWTUID(cookies.uid).then((userId) => {
        getCardsForCardset(currentCardSetId,userId).then((data)=> {
            console.log(data)
            setCardSetName(data[0].set_name)
        })
    })
    })
    return(
        <div className="addCard">
            <div><p>Are you sure you want to delete card set: {cardSetName}</p>
            <p>Note: Cards associated with this card set will not be deleted</p></div>
            <div ><p>&nbsp;</p>
                            <button type="submit" className="addcard_button" onClick={deleteCards}>Delete</button>


                            <button className="addcard_button" >Cancel</button>

                        </div>
        </div>
    )
}