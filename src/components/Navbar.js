import React, { useState, useEffect } from "react";


export default function Navbar(props) {

    const [navLinks, setNavLinks] = useState(props.navBarLinks)

    useEffect(() => {
        const nav = [
            {
                "_id": "60356464053eb30015e11b28",
                "linkText": "Spanish Travel",
                "set_description": "Travel related cards",
                "owner_id": "000000000000000000000000",
                "cards": [],
                "createdAt": "2021-02-23T20:24:04.899Z",
                "updatedAt": "2021-02-23T20:24:04.899Z",
                "__v": 0
                },
                {
                "_id": "603565dc053eb30015e11b29",
                "linkText": "German Time",
                "set_description": "German",
                "owner_id": "000000000000000000000000",
                "cards": [],
                "createdAt": "2021-02-23T20:30:20.093Z",
                "updatedAt": "2021-02-23T20:30:20.093Z",
                "__v": 0
                }
            ]
        setNavLinks(props.navBarLinks)
        console.log(navLinks)
        console.log(props.navBarLinks + "props")
    }, [props.navBarLinks])
            
        

    return (

            <div className="categoryBarContainer">
                <div className="categoryBar logo"><img src="/img/mlmain.png" alt="My Learning Cards"></img>My Learning Cards</div>
                
                    <div className="categoryBar"><a href="/" alt="My Card Sets">
                        My Card Sets</a></div>
                    {navLinks && navLinks.map((links, index) => (
                        <div className="categoryBar" key={index}><a href={links.linkAnchor} alt={links.linkFunction + " : " + links.linkText}>{links.linkFunction + " : " + links.linkText}</a></div>
                    ))}
                   
                    
                
            </div>

    )
}