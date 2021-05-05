import React from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
//import firebase from 'firebase'
import {getJWTUID} from './helpers/jwt'
import { useCookies } from 'react-cookie'

export default function AddCardSetForm(props){
    const [cookies] = useCookies(['uid'])
    
//formik setup
    const initialValues = {
        set_name: '',
        set_description: ''
    }
    const validationSchema = Yup.object({
        set_name: Yup.string().required('Required!'),
        set_description: Yup.string().required('Required!')

    })

    const onSubmit = async (values, submitProps) => {
        
        getJWTUID(cookies.uid).then((UID) => {
            values['uid'] = UID
        
        console.log(values)
        
        const formJSON = JSON.stringify(values)
        const baseURL = process.env.REACT_APP_API_URL + 'cardset'

        axios({
            method: 'post',
            url: baseURL,
            data: formJSON,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        }).then(() => {
            console.log("submitted: " + submitProps)
            props.forceCardsAdded()
            submitProps.resetForm()
            
        })        
    })
}

    return (

            <div className="addCard">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    >
                    
                    <Form id="addCardSet">
                    <label className="form_header">Add New Card Set</label>
                        <Field
                            type="text"
                            name="set_name"
                            placeholder="Card Set Name"
                            className="addcard_textfield"
                        />
                        <p><ErrorMessage name='set_name' /></p>
                        <Field
                            type="text"
                            name="set_description"
                            placeholder="Card Set Description"
                            className="addcard_textfield"
                        />
                        <p><ErrorMessage name='set_description' /></p>

                        <div ><p>&nbsp;</p>
                            <button type="submit" className="addcard_button">Submit</button>


                            <button className="addcard_button" >Cancel</button>

                        </div>
                    </Form>
                    </Formik>
        </div>
    )

}