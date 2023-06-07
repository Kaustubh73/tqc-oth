import './App.css';
import React from 'react'
import Header from './Header';

function WelcomeMessage() {
  return (
    <div className="welcome-message">
      <h1>The Trio Treasure Hunt!</h1>
      <p>Get ready for an exciting adventure filled with puzzles, challenges, and rewards.</p>
      <button>Start the Hunt</button>
    </div>
  );
}

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

function App() {
  return (
    <div className="App">
      <Header />
      <WelcomeMessage />
      <p> {user.name} </p>
      <img src = {user.imageUrl} alt={user.name}/>
      <p> {user.name} </p>
      <img src = {user.imageUrl} alt={user.name}/>
      <p> {user.name} </p>
      <img src = {user.imageUrl} alt={user.name}/>
      <p> {user.name} </p>
      <img src = {user.imageUrl} alt={user.name}/>
    </div>
  );
}

export default App;
