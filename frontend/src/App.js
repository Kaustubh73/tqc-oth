import logo from './logo.svg';
import './App.css';

function MyButton() {
  return (
    <button>I'm a button</button>
  )
}
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};
function App() {
  return (
    <div className="App">
      <h1>The Trio Competition</h1>
      <p>Hello there. <br/> How you doin? </p>
      <img src={logo} className="App-logo "/>
      <p> <br/></p>
      <MyButton />
      <p> {user.name} </p>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of' + user.name}
        style = {{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </div>
  );
}

export default App;
