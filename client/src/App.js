import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Login from './components/Login';

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

class App extends Component () {
  render() {
    return (
       <BrowserRouter>
        <div>
          <div>
            <Navigation />
              <Switch>
               <Route path="/login" component={Login}/>
              <Route component={Error}/>
             </Switch>
          </div>
          <div>
            <div>
              <ul>
                <li>
                  <a href="/login/"><strong>Login</strong></a>
                </li>
              </ul>
            </div>
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
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
