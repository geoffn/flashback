import React from "react";

export default function Navbar() {
    return (

            <div className="categoryBarContainer">
                    <div className="categoryBar"><a href="/" alt="Flash Cards">
                        Flash Cards</a>
                    </div>
                    <div className="categoryBar"><a href="/cardsets" alt="Card Sets">Card Sets</a></div>
                    <div className="categoryBar"><a href="/addcard" alt="Add Cards">Add Cards</a></div>
                
            </div>

    )
}