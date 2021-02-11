import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <header>
            <div className="navbar">
                <nav className="flex">
                    <NavLink to="/" exact
                    activeClassName="nav_active"
                    >
                        Flash Cards
                    </NavLink>
                    <NavLink to="/resume"
                        activeClassName="nav_active"
                        >
                        Add Card
                </NavLink>
                </nav>
            </div>
        </header >
    )
}