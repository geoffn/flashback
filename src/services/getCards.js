import React from 'react'
import axios from 'axios'

function getCards(props) {


    const allCards = async () => {

        let baseURL = 'http://localhost:3001/card'

        //If search criteria is provided then search

        let results = await axios.get(baseURL)
            .catch((e) => {
                console.log(e)
            })


        console.log("results: " + results.data)

        return results

    }
    console.log("results: " + allCards)
}

export default getCards