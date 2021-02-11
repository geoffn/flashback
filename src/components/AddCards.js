import React, { useState, useEffect } from "react"
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Navbar from './Navbar'

export default function AddCards() {
    
    const initialValues = {
            spanish: '',
            english: '',
            category: '',
            wordType: 'verb'   
    }
    const validationSchema = Yup.object({
        spanish: Yup.string().required('Required!'),
        english: Yup.string().required('Required!'),
        category: Yup.string().required('Required!')
    })

    const onSubmit = async (values, submitProps) => {
        console.log(JSON.stringify(values))
        const formJSON = JSON.stringify(values)
        const baseURL = 'http://localhost:3001/card'

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
            submitProps.resetForm()
        })
    }
    
    return (

        <div className="addContainer">
            <div><Navbar /></div>
            <div className="addCard">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}

            >
                <Form id="addCard">
                        <Field 
                            type="text"
                            name="spanish"
                            placeholder="Spanish"
                            className="addcard_textfield"
                        />
                        <p><ErrorMessage name='spanish' /></p>

                        <Field 
                            type="text"
                            name="english"
                            placeholder="English"
                            className="addcard_textfield"
                        />
                        <p><ErrorMessage name='english' /></p>
                        
                        < Field name="wordType"  component="select" placeholder="Type" className="addcard_textfield">
                            <option value="verb" selected>Verb</option>
                            <option value="noun" selected>Noun</option>
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
                                    <button type="submit" className="addcard_textfield">Submit</button>


                                    <button className="addcard_textfield" >Cancel</button>

                                </div>

                

                </Form>
            </Formik>
            </div>
        </div>
    )
}