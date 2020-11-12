import logo from './logo.svg';
import './App.css';

function getMovieFromAPI() {
  return fetch('/api/movies/v1/tt0120737')
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });
}

function App() {
  getMovieFromAPI();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
