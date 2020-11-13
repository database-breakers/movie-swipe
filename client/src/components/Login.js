import React from 'react';
import ReactDOM from 'react-dom';

function handleLogin() {

}

const Login = () => {
    return (
       <div>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
}

export default Login;
