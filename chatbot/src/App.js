import logo from './logo.svg';
import './App.css';
import logo2 from './OA.png'
import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { API } from 'aws-amplify';
import {TextField, Button} from '@mui/material'

const myAPI = "api6b706c74"
const path = '/prompt'



function App() {
  const [prompt, setPrompt] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Handling form submission');
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
        variant="contained">Submit
        </Button>
        
       
       </form>
      </header>
    </div>
  );
}

export default App;
