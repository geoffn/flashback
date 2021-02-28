import React, { useState, useEffect } from "react";
import firebase from 'firebase'

export default function Navbar(props) {

    const [navLinks, setNavLinks] = useState(props.navBarLinks)

    useEffect(() => {
        
        setNavLinks(props.navBarLinks)
        //console.log(navLinks)
        //console.log(props.navBarLinks + "props")
    }, [props.navBarLinks])
            
        
    const logout= (key, e) => {
        firebase.auth().signOut()
    }

    return (

            <div className="categoryBarContainer">
                <div className="categoryBar" onClick={e => logout()}>Logout: {firebase.auth().currentUser.displayName}</div>
                <div className="categoryBar logo"><img src="/img/mlmain.png" alt="My Learning Cards"></img>My Learning Cards</div>
                
                    <div className="categoryBar"><a href="/" alt="My Card Sets">
                        My Card Sets </a></div>
                    {navLinks && navLinks.map((links, index) => (
                        <div className="categoryBar" key={index}><a href={links.linkAnchor} alt={links.linkFunction + " : " + links.linkText}>{links.linkFunction + " : " + links.linkText}</a></div>
                    ))}
                   
                    
                
            </div>

    )
}