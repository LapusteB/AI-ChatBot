import logo from './logo.svg';
import OA from './OA.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="image-wrapper">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={OA} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
      </div>
      </header>
    </div>
  );
}

export default App;
