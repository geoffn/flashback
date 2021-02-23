
import axios from 'axios'

export async function removeCard(cardSet, card) {
        //call remove card api
            //call remove card api
            console.log("cards " + cardSet, card)
            //     console.log(req.body.cardId)
            // console.log(req.body.cardSetId)
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

            console.log(callResponse)
            }catch{
                console.log("error")
            }
           
    }

export async function updateAssignedCards(cardSet){
    var baseURL = 'https://flashbackv1api.herokuapp.com/cardset/' + cardSet
    console.log(baseURL)
    
    var responseData = await axios.get(baseURL)
    console.log(responseData.data)
    //     await axios.get(baseURL).then((data) => {
    //     console.log("udpatecards:" + JSON.stringify(data.data.results))
    return responseData.data
    // })
    //         .catch(console.error)
}
