import React from 'react';
import '../css/Header.css';
import logo from '../images/Puzzle1.jpg';
import menu from '../images/MenuBar.png';
import { Link } from "react-router-dom";

function Desktop() {
    return (
        <header className='header'>
        <nav className='nav'>
            {/* Add your navigation links here */}
            <ul>
                <li><Link to="/" ><img src = {logo}  className='logo' alt='Homepage'/></Link></li>
                <li className='nav-text'><Link to="/puzzles"> Puzzles</Link></li>
                <li className='nav-text'><Link to="/contests">Contests</Link></li>
                <li className='nav-text'><Link to="/leaderboard">Leaderboard</Link></li>
                <li className='nav-text'><Link to="/contactus">Contact Us</Link></li>
            </ul>
        </nav>
        <div className='user-reg'>
            <Link to="/signup"><button>Sign Up</button></Link>
            <Link to="/login"><button>Log In</button></Link>
        </div>
    </header>
    )
}

function DropDown() {
    return (
        <header className='header'>
            <a href="/homepage"><img src={logo} className='logo' alt='Homepage'/></a>
            <div className='dropdown'>
                <img src={menu} className='menu' alt='Menu'/>
                <div className='dropdown-content'>
                    <a href="/puzzles"> Puzzles</a>
                    <a href="/contests">Contests</a>
                    <a href="/leaderboard">Leaderboard</a>
                    <a href="/contactus">Contact Us</a>
                </div>
            </div>
        </header>
    )
}
function NavBar() {
    const isMobile = window.innerWidth <= 768;
    return (
        <div>
            {isMobile ? <DropDown/> : <Desktop/>}
        </div>
    );
}

export default NavBar;