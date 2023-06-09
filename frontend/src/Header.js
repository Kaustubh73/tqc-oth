import React from 'react';
import './Header.css';
import logo from './images/Puzzle1.jpg'
import menu from './images/MenuBar.png'

function Desktop() {
    return (
        <header className='header'>
        <nav className='nav'>
            {/* Add your navigation links here */}
            <ul>
                <li><a href="/homepage" ><img src = {logo}  className='logo' alt='Homepage'/></a></li>
                <li className='nav-text'><a href="/puzzles"> Puzzles</a></li>
                <li className='nav-text'><a href="/contests">Contests</a></li>
                <li className='nav-text'><a href="/leaderboard">Leaderboard</a></li>
                <li className='nav-text'><a href="/contactus">Contact Us</a></li>
            </ul>
        </nav>
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
function Header() {
    const isMobile = window.innerWidth <= 768;
    return (
        <div>
            {isMobile ? <DropDown/> : <Desktop/>}
        </div>
    );
}

export default Header;