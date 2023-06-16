import React, { useEffect, useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import '../css/Contests.css'

function Contests() {
    const [name, setName] = useState('');
    
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
            <div className='contests'>
                <h1>Contests</h1>
                <p>No contests coming up in the future, stay tuned!</p>
            </div>
        </div>
     );
}


export default Contests;