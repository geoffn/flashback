
import axios from 'axios'

export async function removeCard(cardSet, card) {
        //Removes a specific card from the provided cardset
        //Takes cardSet which is the ID for the carset
        //and the card which is the id fof the card.


        const postData = {
            cardId : card,
            cardSetId : cardSet
        }
        var baseURL = 'https://flashbackv1api.herokuapp.com/cardsetremovecard'
        try{
                const callResponse = axios({
                method: 'post',
                url: baseURL,
                data: postData,
                headers: {
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

export async function updateAssignedCards(cardSet){
    var baseURL = 'https://flashbackv1api.herokuapp.com/cardset/' + cardSet
    console.log(baseURL)
    
    var responseData = await axios.get(baseURL)
    //console.log(responseData.data)
    //     await axios.get(baseURL).then((data) => {
    //     console.log("udpatecards:" + JSON.stringify(data.data.results))
    return responseData.data
    // })
    //         .catch(console.error)
}


export async function getCardsForCardset(cardSet){
    //Cardset is touched and update last accessed_date

    updateAccessed(cardSet)
    const baseURL = 'https://flashbackv1api.herokuapp.com/cardset/' + cardSet
        //console.log(baseURL)
        const responseData = await axios.get(baseURL)

    //console.log(responseData.data.results)

    return responseData.data.results
}

async function updateAccessed(cardSet){
    const baseURL = 'https://flashbackv1api.herokuapp.com/cardsetaccessed/' + cardSet
    const responseData = await axios.get(baseURL)
    return responseData.data.results
}

export async function getAllCardSetsForUser(userId){
    //Pulls all the card set data for a specific user
    //TODO: Need to add userid info

    const baseURL = 'https://flashbackv1api.herokuapp.com/cardsetforowner/' + userId
    //console.log(baseURL)
    const responseData = await axios.get(baseURL)

    //console.log(responseData.data.results)

    return responseData.data.results
}

export async function deleteCardSet(cardSet){
    const baseURL ='https://flashbackv1api.herokuapp.com/cardsetdelete/' + cardSet
    const responseData = await axios.delete(baseURL)
    //console.log(responseData.data.results)
    return responseData.data.results
}
