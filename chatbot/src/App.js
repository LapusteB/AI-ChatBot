import logo from './logo.svg';
import './App.css';
import logo2 from './OA.png'
import React, { useState } from 'react';

import {TextField, Button} from '@mui/material'

function App() {
  const [prompt, setPrompt] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submit logic here
    console.log('Form submitted:', prompt);
    // Reset the input field
    setPrompt('');
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };



  return (
    <div className="App">
      <header className="App-header">
      <div className="image-wrapper">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo2} className="App-logo" alt="logo" />
        </div>
        <p>
          Prompt AI Using GPT-3.1
          
        </p>
        <form onSubmit={handleSubmit}>
        
        <TextField
        label="Prompt"
        color="secondary"
        variant='outlined'
        size='large'
        fullWidth
        value={prompt}
        onChange={handlePromptChange}
        />
        <Button
        type='submit'
        variant="contained">Submit</Button>
        
       
       </form>
      </header>
    </div>
  );
}

export default App;
