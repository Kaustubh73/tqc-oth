import React, { useEffect, useState, useRef } from 'react';
import Masonry from 'masonry-layout';
import '../css/Puzzles.css';
import NavBar from '../components/NavBar';
import puzzle1 from '../images/Sudoku.png'
import puzzle2 from '../images/Question 2.png'
import puzzle3 from '../images/Question 3.png'
import PuzzleDetails from './Puzzle1';
import { useNavigate, Link } from 'react-router-dom';

function Puzzles() {
  const puzzles = [
    { id: 1, link: '/puzzle1', imageUrl: puzzle1, title: 'Puzzle 1' },
    { id: 2, link: '/puzzle2', imageUrl: puzzle2, title: 'Puzzle 2' },
    { id: 3, link: '/puzzle3', imageUrl: puzzle3, title: 'Puzzle 3' },
    { id: 4, link: '/puzzle4', imageUrl: 'puzzle4.jpg', title: 'Puzzle 4' },
    { id: 5, link: '/puzzle5', imageUrl: 'puzzle5.jpg', title: 'Puzzle 5' },
    { id: 6, link: '/puzzle6', imageUrl: 'puzzle6.jpg', title: 'Puzzle 6' },
    // { id: 7, link: '/puzzle7', imageUrl: 'puzzle7.jpg', title: 'Puzzle 7' },
    // { id: 8, link: '/puzzle8', imageUrl: 'puzzle8.jpg', title: 'Puzzle 8' },
    // { id: 9, link: '/puzzle9', imageUrl: 'puzzle9.jpg', title: 'Puzzle 9' },

    // Add more puzzle objects as needed
  ];

  // // Assume you have an array of puzzle objects
  const masonryRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPuzzles, setFilteredPuzzles] = useState(puzzles);
  const navigate = useNavigate();

  useEffect(() => {
    masonryRef.current = new Masonry('.puzzles-container', {
      itemSelector: '.puzzle-item',
      columnWidth: 300,
      gutter: 20,
      fitWidth: true,
      percentPosition: true,
    });

    return () => {
      if (masonryRef.current) {
        masonryRef.current.destroy();
      }
    };
  }, []);



  useEffect(() => {
    if (masonryRef.current) {
      masonryRef.current.reloadItems();
      masonryRef.current.layout();
    }
  }, [filteredPuzzles]);

  useEffect(() => {
    setFilteredPuzzles(
      puzzles.filter((puzzle) =>
        puzzle.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, puzzles]);


  return (
    <div>
        <NavBar/>
        <div className='search-container'>
          <input 
            type='text'
            placeholder='Search puzzles...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="puzzles-container">
        {filteredPuzzles.map((puzzle) => (
          <Link to={puzzle.link} className='puzzle-link' key={puzzle.id}>
            <div className="puzzle-item">
              <img src={puzzle.imageUrl} alt={puzzle.title} className='puzzle-image' />
              <h3>{puzzle.title}</h3>
            </div>
          </Link>
        ))}
        </div>
    </div>
  );
}

export default Puzzles;
