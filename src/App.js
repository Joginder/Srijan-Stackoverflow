import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <i>S</i>
        <h1>
          Srijan Stack Overflow
        </h1>
      </header>
      <div className='conaitner'>
        <form className='login'>
          <input type='email' name='email' placeholder='Email'></input>
          <input type='password' name='password' placeholder='Password'></input>
          <button>login</button>
        </form>
      </div>
    </div>
  );
}

export default App;
