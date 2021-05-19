import React, { useState, useEffect } from "react"
import axios from 'axios'
import { getAuthConfig } from './helpers/ConfigHelper'
import Navbar from "./Navbar"
import { get } from "animejs"


export default function ViewCurrentConfig(){
    //const [firebaseConfig, setFirebaseConfig] = useState()
    const auth_domain = process.env.REACT_APP_AUTH_DOMAIN
        const auth_key = process.env.REACT_APP_AUTH_KEY
        const jwt = process.env.REACT_APP_JWT
        const api_url = process.env.REACT_APP_API_URL
        const api_jwt = process.env.REACT_APP_API_JWT
    // useEffect(() => {
    //     getAuthConfig().then((config) => {
    //          setFirebaseConfig(config)
    //     })
        
    // })
    const firebaseConfig = getAuthConfig()
    


    return(
        <div className="wrapper">
            <p>Testing</p>CONFIG: {JSON.stringify(firebaseConfig)}
            <p>REACT_APP_AUTH_DOMAIN={auth_domain}</p>
            <p>REACT_APP_AUTH_KEY={auth_key}</p>
            <p>REACT_APP_JWT={jwt}</p>
            <p>REACT_APP_API_URL={api_url}</p>
            <p>REACT_APP_API_JWT={api_jwt}</p>
            
        </div>
    )
}