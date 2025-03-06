import React, { useState } from "react";
import "../Styles/Navbar.css";
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                SEVENS
            </div>
            
            <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            
            <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
                <li className="navbar-dropdown">
                    <span>Shop <IoMdArrowDropdown /></span>
                    <ul className="navbar-dropdown-menu">
                        <li><Link to="/category1">Category 1</Link></li>
                        <li><Link to="/category2">Category 2</Link></li>
                        <li><Link to="/category3">Category 3</Link></li>
                    </ul>
                </li>
                <li><Link to="/sale">On Sale</Link></li>
                <li><Link to="/new-arrivals">New Arrivals</Link></li>
                <li><Link to="/brands">Brands</Link></li>
            </ul>
            
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Search for products..." />
            </div>
            
            <div className="navbar-icons">
                <Link to="/cart"><FaShoppingCart /></Link>
                <Link to="/account"><FaUser /></Link>
            </div>
        </nav>
    );
};

export default Navbar;