import logo from './logo.svg';
import './App.css';
import logo2 from './OA.png';
import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { API } from 'aws-amplify';
import { TextField, Button, Box } from '@mui/material';
import GenerateCard from "./components/GenerateCard";
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
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
  const [generatedCards, setGeneratedCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Handling form submission');
    try {
      const apiResponse = await API.post('api6b706c74', '/prompt', {
        body: {
          prompt,
        },
      });

      const generatedText = apiResponse.generatedText.content;
      const formattedText = generatedText.replace(/\n/g, '\n\n').trim();
      console.log('Generated text:', formattedText);

      // Create a new card object
      const newCard = {
        prompt,
        text: formattedText,
      };

      // Add the new card to the existing array of cards
      setGeneratedCards((prevCards) => [...prevCards, newCard]);

      // Reset the input field
      setLoading(!loading);
      setPrompt('');
    } catch (error) {
      console.error('API error:', error);
      toast.error('An error occurred. Please try again later');
    }
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
        <p>Prompt AI Using GPT-3.5 Turbo</p>

        <form onSubmit={handleSubmit}>
          <Box alignItems="center" marginLeft={2}>
            <TextField
              label="Prompt"
              color="primary"
              variant="outlined"
              size="large"
              fullWidth
              value={prompt}
              onChange={handlePromptChange}
              InputProps={{
                style: {
                  color: 'white', // Set the desired text color here
                  marginBottom: '10px', // Add margin-bottom for spacing
                },
              }}
            />
             {/*loading Cog Wheel */}
             <div className='loading-spiner'>
              <ClipLoader
                color='#fffffff'
                loading={loading}
                size={50}
              />
            </div>

            <Button
            type="submit"
             variant="contained"
             onClick={() => setLoading(!loading)}
             >
              Submit
            </Button>
            
          </Box>
        </form>

        {generatedCards.map((card, index) => (
          <div key={index}>
            <p>{card.prompt}</p>
            <GenerateCard text={card.text} />
          </div>
        ))}
      </header>
      <ToastContainer />
    </div>
  );
}

export default App;
