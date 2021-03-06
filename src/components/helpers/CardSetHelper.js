
import axios from 'axios'
import {createJWTAPI} from './jwt'


export async function removeCard(cardSet, card, userId) {
        //Removes a specific card from the provided cardset
        //Takes cardSet which is the ID for the carset
        //and the card which is the id fof the card.


        const postData = {
            cardId : card,
            cardSetId : cardSet
        }
        var baseURL = process.env.REACT_APP_API_URL + 'cardsetremovecard'
        try{

            const jwt = await createJWTAPI(userId)
                const callResponse = axios({
                method: 'post',
                url: baseURL,
                data: postData,
                headers: {
                    'authorization': `Bearer ${jwt}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }
            })

            //console.log(callResponse)
            return callResponse
            }catch{
                console.log("error")
            }
           
    }

export async function getCardsForCardset(cardSet, userId){
    var baseURL = process.env.REACT_APP_API_URL + 'cardset/' + cardSet
    console.log(baseURL)
    const jwt = await createJWTAPI(userId)
    var responseData = await axios.get(baseURL, {
        headers: {
          'authorization': `Bearer ${jwt}`
        }})
    //console.log(responseData.data)
    //     await axios.get(baseURL).then((data) => {
    //     console.log("udpatecards:" + JSON.stringify(data.data.results))
    return responseData.data.results
    // })
    //         .catch(console.error)
}


// export async function getCardsForCardset(cardSet, userId){
//     //Cardset is touched and update last accessed_date

//     updateAccessed(cardSet)
//     const baseURL = process.env.REACT_APP_API_URL + 'cardset/' + cardSet
//         //console.log(baseURL)
//         const responseData = await axios.get(baseURL)

//     //console.log(responseData.data.results)

//     return responseData.data.results
// }

async function updateAccessed(cardSet){
    const baseURL = process.env.REACT_APP_API_URL + 'cardsetaccessed/' + cardSet
    const responseData = await axios.get(baseURL)
    return responseData.data.results
}

export async function getAllCardSetsForUser(userId){
    //Pulls all the card set data for a specific user
    //TODO: Need to add userid info

    const jwt = await createJWTAPI(userId)
    const baseURL = process.env.REACT_APP_API_URL + 'cardsetforowner'
    console.log(baseURL)
    console.log(jwt)

    const responseData = await axios.get(baseURL , {
        headers: {
          'authorization': `Bearer ${jwt}`
        }})
    console.log(responseData)
    //console.log(responseData.data.results)

    return responseData.data.results
}

export async function deleteCardSet(cardSet, userId){
    const jwt = await createJWTAPI(userId)
    const baseURL =process.env.REACT_APP_API_URL + 'cardsetdelete/' + cardSet
    const responseData = await axios.delete(baseURL, {
        headers: {
          'authorization': `Bearer ${jwt}`
        }})
    //console.log(responseData.data.results)
    return responseData.data.results
}
