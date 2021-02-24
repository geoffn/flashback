import React from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'


export default function AddCardSetForm(props){

//formik setup
    const initialValues = {
        set_name: '',
        set_description: ''
    }
    const validationSchema = Yup.object({

    })

    const onSubmit = async (values, submitProps) => {
        
        values['owner_id'] = '000000000000000000000000'
        console.log(values)

        const formJSON = JSON.stringify(values)
        const baseURL = 'https://flashbackv1api.herokuapp.com/cardset'

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
                            placeholder="Set Name"
                            className="addcard_textfield"
                        />
                        <p><ErrorMessage name='set_name' /></p>
                        <Field
                            type="text"
                            name="set_description"
                            placeholder="Set Description"
                            className="addcard_textfield"
                        />
                        <p><ErrorMessage name='set_description' /></p>

                        <div ><p>&nbsp;</p>
                            <button type="submit" className="addcard_textfield">Submit</button>


                            <button className="addcard_textfield" >Cancel</button>

                        </div>
                    </Form>
                    </Formik>
        </div>
    )

}