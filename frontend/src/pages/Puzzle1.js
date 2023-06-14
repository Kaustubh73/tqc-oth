import React from 'react';
import NavBar from '../components/NavBar';
import puzzle1 from '../images/Sudoku.png';
import { useState, useEffect } from 'react';

function Userhere() {
    return (
        <div>
            <h1>User found</h1>
            <h1>User found</h1>
            <h1>User found</h1>
        </div>
    );
}

function Usernot() {
    return (
        <div>
            <p>Please log in first to submit your answer</p>
        </div>
    );
}

function Yo(props) {
    const ansCheck = props.ansCheck;
    if (ansCheck === '1')
    {
        return (
            <div>
                <h1>Right answer</h1>
                <h1>Right answer</h1>
                <h1>Right answer</h1>
                <h1>Right answer</h1>
            </div>
        );
    }
    return (
        <div>
            <h1>{ansCheck}</h1>
            <h1>Wrong answer</h1>
            <h1>Wrong answer</h1>
            <h1>Wrong answer</h1>
            <h1>Wrong answer</h1>
        </div>
    );

}
function Puzzle1() {
    const [name, setName] = useState('');
    const [userans, setUserAns] = useState('');
    const [userCheck, setUserCheck] = useState('');
    const [ansCheck, setAnsCheck] = useState('');
    const answer = 'cream';
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (name)
        {
        const response = await fetch('http://localhost:8000/api/puzzle', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                answer,
                userans
            })
        });

            const content = await response.json();
            setAnsCheck(content.message);
        }
        // {name ? <Userhere/>: <Usernot/>}
        }

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
        <div className='puzzle-details'>
            <NavBar name={name} setName={setName}/>
            <h2>Puzzle 1</h2>
            <img src={puzzle1} alt='Sudoku'/>
            <form onSubmit={handleSubmit}>
            <input 
                type='answer'
                placeholder='Type your guess...'
                value={userans}
                required
                onChange={(e) => setUserAns(e.target.value.toLowerCase())}
            />
            <button type='submit' onClick={()=>setUserCheck(!userCheck)}>Submit</button>
            </form>
            <Yo ansCheck = {ansCheck}/>
`           {userCheck? (name ? <Userhere/>: <Usernot/>): <p></p>}
        </div>
     );
}

export default Puzzle1;