import React, { useState, useEffect } from "react"
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
        <div className="categoryBarContainer">
            <div className="categoryBar"><a href="/" key="all" alt="All words">All</a></div>
            {catData && catData.map((category, index) => (
                <div className="categoryBar"><a href={`/?cat=`+category} key={category} alt={category}>{category}</a></div>
            ))}
        </div>

)
}