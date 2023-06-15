import React from 'react';
import NavBar from '../components/NavBar';
import puzzle1 from '../images/Sudoku.png';
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
    const answer = 'cream';
    const puzzleId = 'Puzzle 1'
    
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
            setSolved(content.message == 'Congratulations! You solved the puzzle.');
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
            setSolvedPuzzles(content.solved_puzzles);
            setName(content.name);
            setSolved(solvedPuzzles.includes(puzzleId.toString()));
          }
        )();
      });
    return ( 
        <div className='puzzle-details'>
            <NavBar name={name} setName={setName}/>
            <h2>Puzzle 1</h2>
            <img src={puzzle1} alt='Sudoku'/>
            {message && <p>{message}</p>}
            {solved ? (<p>You have already solved this puzzle. The answer is CREAM.</p>) : (submitted && isCorrect ? (<p>Congratulations, the answer was CREAM indeed. Do you understand how it works?</p>)
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
`           {userCheck? (name ? <p/>:<p>Please log in first to submit your answer</p>): <p></p>}
            {submitted? (isCorrect ? <div></div> : <div><p>The answer is wrong!</p></div>) :<p></p>}
        </div>
     );
}

export default Puzzle1;