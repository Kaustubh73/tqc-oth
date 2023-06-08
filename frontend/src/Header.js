import React from 'react';
import './Header.css';
import logo from './images/Puzzle1.jpg'

function Header() {
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
    );
}

export default Header;