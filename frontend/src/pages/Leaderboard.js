import React, { useEffect, useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import '../css/Leaderboard.css'


function Leaderboard() {
    const [solvedPuzzles, setSolvedPuzzles] = useState('');
    const [name, setName] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        (
          async () => {
            const response = await fetch('http://localhost:8000/api/leaderboard', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });
      
            const content = await response.json();
            try {
                setLeaderboard(content);
            } catch {
                console.error('Error fetching leaderboard');
            }
          }
        )(); 
      }, []);
      
      useEffect(() => {
        (
          async () => {
            const response = await fetch('http://localhost:8000/api/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });
    
            const content = await response.json();
    
            setName(content.name);
          }
        )();
      });
      
    return ( 
        <div>
            <NavBar name={name} setName={setName}></NavBar>
            <div className='leaderboard-container'>
                <h1>Leaderboard</h1>
                {leaderboard.length === 0 ? (
                    <div>No users found in the leaderboard.</div>
                ) : (
                    <table className='leaderboard-table'>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Solved Count</th>
                            <th>Solved Puzzles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.solved_count}</td>
                                <td>{user.solved_puzzles.split(',').join(', ')}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                )}              
            </div>
        </div>
     );
}


export default Leaderboard;