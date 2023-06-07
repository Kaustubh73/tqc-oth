import './App.css';
import React from 'react'
import Header from './Header';
function FeaturedContent() {
  const currContest = {
    name: "Trio Quiz Competition 2.0",
    duration: "June 3 - June 10, 2023",
    instructions: "Solve a series of Rounds and gain points with each win on the board!",
    prizes: "1st Place : Rs 500 | 2nd Place : Rs 300 | 3rd Place : Rs 200",
  };

  return (
    <div>
      <h2>{currContest.name}</h2>
      <p>{currContest.duration}</p>
      <p>{currContest.instructions}</p>
      <p>{currContest.prizes}</p>
      <button>Join the Contest</button>
    </div>
  )
}
function WelcomeMessage() {
  return (
    <div>
    <div className="welcome-message">
      <h1>The Trio Treasure Hunt!</h1>
      <p>Get ready for an exciting adventure filled with puzzles, challenges, and rewards.</p>
    </div>
    <div className="featured">
      <FeaturedContent/>
    </div>
  </div>
  );
}

const user = {
  Username: 'Hedy Laamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

function App() {
  return (
    <div className="App">
      <Header />
      <WelcomeMessage />
      <p> {user.Username} </p>
      <img src = {user.imageUrl} alt={user.name}/>

    </div>
  );
}

export default App;
