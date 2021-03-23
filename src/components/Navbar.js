import React, { useState, useEffect } from "react";

//import { auth } from './helpers/firebaseHelper'

export default function Navbar(props) {

    const [navLinks, setNavLinks] = useState(props.navBarLinks)

    useEffect(() => {
        
        setNavLinks(props.navBarLinks)
        //console.log(navLinks)
        //console.log(props.navBarLinks + "props")
    }, [props.navBarLinks])
            
 
        
    

    return (

            <div className="categoryBarContainer">
                
                
                    <div className="categoryBar"><a href="/" alt="My Card Sets">
                        My Card Sets </a></div>
                    {navLinks && navLinks.map((links, index) => (
                        <div className="categoryBar" key={index}><a href={links.linkAnchor} alt={links.linkFunction + " : " + links.linkText}>{links.linkFunction + " : " + links.linkText}</a></div>
                    ))}
                   
                    
                
            </div>

    )
}