import React from 'react';
import NavBar from '../components/NavBar';
import puzzle3 from '../images/Question 3.png';
import '../css/Puzzle.css'
import { useState, useEffect } from 'react';


function Puzzle1() {
    const [name, setName] = useState('');
    const [userans, setUserAns] = useState('');
    const [userCheck, setUserCheck] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState('');
    const [solved, setSolved] = useState(false);
    const [solvedPuzzles, setSolvedPuzzles] = useState('');
    const answer = '72';
    const puzzleId = 'Puzzle 3'
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (name)
            {
            const response = await fetch('http://localhost:8000/api/puzzle', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    puzzleId,
                    answer,
                    userans
                })
            });

            if (response.status === 200) {
                // Puzzle solved successfully
                console.log('Puzzle solved!');
                setIsCorrect(true);
            } 
            const content = await response.json();
            setSolved(content.message === 'Congratulations! You solved the puzzle.');
            setSubmitted(true);
            }
        }
        catch (error) {
            console.error(error);
        }     
        };

    useEffect(() => {
        (
          async () => {
            const response = await fetch('http://localhost:8000/api/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });
    
            const content = await response.json();
            setName(content.name);
            if (name)
            {
            setSolvedPuzzles(content.solved_puzzles);
            setSolved(solvedPuzzles.includes(puzzleId.toString()));
            }   
          }
        )();
      });
    return ( 
        <div>
            <NavBar name={name} setName={setName}/>
            <div className='puzzle-details'>
            <h2>The Counting Magic</h2>
            <img src={puzzle3} alt='KAANAV'/>
            {message && <p>{message}</p>}
            {solved ? (<p className='right-message'> You have already solved this puzzle. The answer is 72.</p>) : (submitted && isCorrect ? (<p className='right-message'>Congratulations, the answer was 72 indeed. Do you understand how it works?</p>)
            :
            (
            <form onSubmit={handleSubmit}>
            <input 
                type='answer'
                placeholder='Type your guess...'
                value={userans}
                required
                onChange={(e) => setUserAns(e.target.value.toLowerCase())}
            />
            <button type='submit' onClick={()=>setUserCheck(true)}>Submit</button>
            </form>
            ))}
`           {userCheck? (name ? <p/>:<p className='error-message'>Please log in first to submit your answer</p>): <p></p>}
            {submitted? (isCorrect ? <div></div> : <div><p className='error-message'>The answer is wrong!</p></div>) :<p></p>}
            </div>
        </div>
     );
}

export default Puzzle1;