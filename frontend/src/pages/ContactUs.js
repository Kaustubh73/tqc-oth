import React, { useEffect, useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import '../css/ContactUs.css'

function ContactUs() {
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
            <div className='contact-us'>
                <h1>Contact Us</h1>
                <p>Kaustubh Gupta</p>
                <p>+91 8982255359</p>
                <p>es21btech11016@iith.ac.in</p>
            </div>
        </div>
     );
}


export default ContactUs;