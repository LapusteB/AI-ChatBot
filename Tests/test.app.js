import React, { useState } from 'react';

function GeneratedText({ text }) {
  return <div>{text}</div>;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');

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

      // Set the generated text
      setGeneratedText(generatedText);

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
        />
        <button type="submit">Submit</button>
      </form>
      <GeneratedText text={generatedText} />
    </div>
  );
}

export default App;