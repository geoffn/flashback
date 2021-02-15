import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from 'axios'


export default function CategoryBar() {
    const [catData, setCatData] = useState(null);
    
    useEffect(() => {
    let baseURL = 'http://localhost:3001/cat'

        //If search criteria is provided then search

        axios.get(baseURL).then((data) => setCatData(data.data.results))
            .catch(console.error)

    }, [])

    
    return(
        <div className="categoryBar"><a href="/addcard" alt="add card" key="add">Add New</a>
            <p>Spanish</p><a href='/' key="all">all</a>
            {catData && catData.map((category, index) => (
                <p><a href={`/?cat=`+category} key={category}>{category}</a></p>
            ))}
        </div>

)
}