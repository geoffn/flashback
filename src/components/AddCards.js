import React, { useState } from "react"
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
//import firebase from 'firebase'
import { useCookies } from 'react-cookie'
import {getJWTUID} from './helpers/jwt'

//Temp until cardsform has the correct data
const cardForm = {
    primary_language: 'es',
    primary_language_long: 'spanish',
    secondary_language: 'en',
    secondary_language_long: 'english',
    OwnerId: '000000000000000000000000'
}

export default function AddCards(props) {
    const [currentCardSetId] = useState(props.cardSetId)
    const [cookies] = useCookies(['uid'])
 

    const initialValues = {
            primary_word: '',
            secondary_word: '',
            category: '',
            wordType: 'verb'
    }
    const validationSchema = Yup.object({
        primary_word: Yup.string().required('Required!'),
        secondary_word: Yup.string().required('Required!'),
        category: Yup.string().required('Required!')
    })


    const onSubmit = async (values, submitProps) => {
        
        //const UID = getJWTUID(cookies.uid)
        values['primary_language'] = 'es'
        values['secondary_language'] = 'en'
        values['uid'] =  await getJWTUID(cookies.uid)
        
        console.log(JSON.stringify(values))
        const formJSON = JSON.stringify(values)
        const baseURL = 'https://flashbackv1api.herokuapp.com/card'

        console.log(formJSON)
        const newCard =await axios({
            method: 'post',
            url: baseURL,
            data: formJSON,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        })
        let postData = {
            cardId : newCard.data._id,
            cardSetId : currentCardSetId
        }

        console.log(JSON.stringify(postData))
        const baseCardURL = 'https://flashbackv1api.herokuapp.com/cardsetaddcard'
        const callResponse = await axios({
            method: 'post',
            url: baseCardURL,
            data: postData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
           
        }
    })
        console.log(callResponse)
        submitProps.resetForm()
        props.forceCardsAdded()
        window.location.reload(true)
    }
    
    return (

        <div className="addContainer">
            {/* <div><Navbar /></div> */}
            <div className="addCard"><label>Create New Card</label>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}

            >
                <Form id="addCard">
                        <Field 
                            type="text"
                            name="primary_word"
                            placeholder={cardForm.primary_language_long}
                            className="addcard_textfield"
                        />
                        <p><ErrorMessage name='primary_error' /></p>

                        <Field 
                            type="text"
                            name="secondary_word"
                            placeholder={cardForm.secondary_language_long}
                            className="addcard_textfield"
                        />
                        <p><ErrorMessage name='secondary_error' /></p>
                        
                        < Field name="wordType"  component="select" placeholder="Type" className="addcard_textfield">
                            <option value="verb" defaultValue>Verb</option>
                            <option value="noun" >Noun</option>
                            <option value="adjective">Adjective</option>
                        </Field >    
                        <p><ErrorMessage name="wordType" className="input-error" /></p>

                        <Field 
                            type="text"
                            name="category"
                            placeholder="Category"
                            className="addcard_textfield"
                        />
                        <p><ErrorMessage name='category' /></p>
                       
                        <div ><p>&nbsp;</p>
                                    <button type="submit" className="addcard_button">Submit</button>


                                    <button className="addcard_button" >Cancel</button>

                                </div>

                

                </Form>
            </Formik>
            </div>
        </div>
    )
}