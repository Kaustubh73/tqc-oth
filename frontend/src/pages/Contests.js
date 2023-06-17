import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import '../css/Contests.css'
import Footer from '../components/Footer';

function Contests() {
    const [name, setName] = useState('');
    
    useEffect(() => {
      (async () => {
        try {
          const response = await fetch('http://localhost:8000/api/user', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
    
          if (response.ok) {
            const content = await response.json();
            setName(content.name);
          } else {
            // Handle non-successful response
            throw new Error('Failed to fetch user data');
          }
        } catch (error) {
          // Handle fetch error
          console.error(error);
        }
      })();
    }, []);    
    return ( 
        <div>
            <NavBar name={name} setName={setName}></NavBar>
            <div className='contests'>
                <h1>Contests</h1>
                <p>No contests coming up in the future, stay tuned!</p>
            </div>
            <Footer/>
        </div>
     );
}


export default Contests;