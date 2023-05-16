import logo from './logo.svg';
import './App.css';
import logo2 from './OA.png'
import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { API } from 'aws-amplify';
import {TextField, Button} from '@mui/material'

const myAPI = "api6b706c74"
const path = '/prompt'

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'api6b706c74',
        endpoint: 'https://dg4krhi987.execute-api.us-east-1.amazonaws.com/dev', // Replace with your API endpoint URL
      },
    ],
  },
});


function App() {
  const [prompt, setPrompt] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Handling form submission');
    // Perform submit logic here
    ///////////////////////////////////////////////////////////////////
    try {
      const apiResponse = await API.post('api6b706c74', '/prompt', {
        body: {
          prompt,
        },
      });

      const generatedText = apiResponse.generatedText;
      console.log('Generated text:', generatedText);

      // Perform any additional logic with the generated text here

      // Reset the input field
      setPrompt('');
    } catch (error) {
      console.error('API error:', error);
    }
    ////////////////////////////////////////////////////////////////////


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
          Prompt AI Using GPT-4.0
          
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
