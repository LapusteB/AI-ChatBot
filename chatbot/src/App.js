import logo from './logo.svg';
import './App.css';
import logo2 from './OA.png'
import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { API } from 'aws-amplify';
import {TextField, Button, Box, Slider} from '@mui/material'
import GenerateCard from "./components/GenerateCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [generatedCard, setGeneratedCard] = useState('');

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
      setGeneratedCard(generatedText);
      // Reset the input field
      setPrompt('');
    } catch (error) {
      console.error('API error:', error);
      toast.error('An error occured. Please try again later')
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
          Prompt AI Using GPT-3.5 Turbo
          
        </p>
        

        <form onSubmit={handleSubmit}>
        <Box  alignItems="center" marginLeft={2}>
        
        <TextField
        label="Prompt"
        color="primary"
        variant='outlined'
        size='large'
        fullWidth
        value={prompt}
        onChange={handlePromptChange}
        InputProps={{
          style: {
            color: 'white', // Set the desired text color here
          },
        }}
        />
        
      
        
        <Button
        type='submit'
        variant="contained"
        >Submit
        </Button>
        <body>Temerature rating: </body>
        
        <Slider
        aria-label="Temperature"
        defaultValue={0.7}
        
        valueLabelDisplay="auto"
        step={0.1}
        marks
        min={0.0}
        max={1.0}
        />

        </Box>
        <GenerateCard text={generatedCard} prompt={prompt}/>
       
       </form>
      </header>
      <ToastContainer />
    </div>
  );
}

export default App;
