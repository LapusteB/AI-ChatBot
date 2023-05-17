const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  organization: "org-yjEWmQsSgoZQFZ4ZT90yioh1",
  apiKey: process.env.MY_API_KEY,
});

const openai = new OpenAIApi(configuration);


const openaiAPIKey = process.env.MY_API_KEY;// Replace with your OpenAI API key

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    //const openaiAPIUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiAPIKey}`
      }
    });

    const generatedText = response.data.choices[0].text.trim();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({
        generatedText
      })
    };
  } catch (error) {
    console.error('Endpoint Error:', error.response.data);
    return {
      statusCode: 500,
      body: JSON.stringify('Internal Server Error')
    };
  }
};