import React, { useState, useEffect } from "react"
import axios from 'axios'
//import firebase from 'firebase'
import { useCookies } from 'react-cookie'
import {getJWTUID} from './helpers/jwt'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import {createJWTAPI} from './helpers/jwt'
//Get The Card Set and then get all cards not assigned to another set.

export default function AvailableCards(props) {

    const [availableCards, setAvailableCards] = useState([])
    const [currentCardSetId] = useState(props.cardSetId)
    const [cookies] = useCookies(['uid'])

    const initialValues = {
        search: ''
    }
    const validationSchema = Yup.object({
       // search: Yup.string().required('Required!')
    })

    const onSubmit = async (values, submitProps) => {
        getJWTUID(cookies.uid).then((UID) => {
            createJWTAPI(UID).then((jwt) => {
            var baseCardURL
            
            if (!values.search){
                baseCardURL = process.env.REACT_APP_API_URL + 'card/' + UID
            } else{
                baseCardURL =  process.env.REACT_APP_API_URL + 'cardsearch/' + UID + '/' + values.search
            } 
            axios.get(baseCardURL,{
                headers: {
                  'authorization': `Bearer ${jwt}`
                }}).then((data) => setAvailableCards(data.data.results))
                .catch(console.error)
            })
        })
    }
    useEffect(() => {
        getJWTUID(cookies.uid).then((UID) => {
            createJWTAPI(UID).then((jwt) => {
        var baseCardURL =  process.env.REACT_APP_API_URL + 'card/' + UID
        axios.get(baseCardURL,{
            headers: {
              'authorization': `Bearer ${jwt}`
            }}).then((data) => setAvailableCards(data.data.results))
            .catch(console.error)
        })
    })
    }, [cookies.uid])

    //Create a list of individual cards from the cardset array of cards.
    
    function addCardToSet(cardSet, card) {
        getJWTUID(cookies.uid).then((UID) => {
            createJWTAPI(UID).then((jwt) => {
        //call remove card api
        //console.log("cards " + cardSet, card)
    //     console.log(req.body.cardId)
    // console.log(req.body.cardSetId)
        const postData = {
            cardId : card,
            cardSetId : cardSet
        }
        const baseURL = process.env.REACT_APP_API_URL + 'cardsetaddcard'
    axios({
        method: 'post',
        url: baseURL,
        data: postData,
        headers: {
            'authorization': `Bearer ${jwt}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    }).then(() => {
        //console.log("submitted: " )
        props.forceCardsAdded()
    })
    
})
        })
       
    }
    return (
        <div>
            <div className="addCard">
                <label>Search Available Cards</label>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}

            >
                <Form id="addcard">

                        <Field 
                            type="text"
                            name="search"
                            placeholder="*"
                            className="addcard_searchfield"
                        />
                         <button type="submit" className="addcard_button">Search</button>

                        <p><ErrorMessage name='search' /></p>
                       
                        <div ><p>&nbsp;</p>
                                   
                                </div>

                

                </Form>
            </Formik>
            </div>
            <div className="flashCard">
                {availableCards && availableCards.map((cardSet, index) => (
                    <div className="fullCardSet" id={index} key={index}>
                        <h2>Available Card</h2>
                        <h2>{cardSet.set_name}</h2>
                    
                        <p>{cardSet.primary_word}</p>

                        <p>{cardSet.secondary_word}</p>

                        <p><button onClick={() => addCardToSet(currentCardSetId,cardSet._id)}>Add Card</button></p>
                    
                    </div>
                ))}

            
            </div>
        </div>
    )
}
