const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  organization: "org-yjEWmQsSgoZQFZ4ZT90yioh1",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);


//const openaiAPIKey = process.env.MY_API_KEY;// Replace with your OpenAI API key

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    const { action } = JSON.parse(event.body); // New line

    if (action === "chat-completion") { // New condition
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0301",
        messages: [
          {
            role: 'system',
            content: prompt
          }
        ],
        max_tokens: 2048,
        temperature: 0.7,
        n: 1
      });

      const generatedText = response.data.choices[0].message;

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
    } 
    
    
    else if (action === "image-edit") { // New condition
      
      // Handle image editing logic
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
      image_url = response.data.data[0].url;

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify({
          image_url
        })
      };
    }

    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify('Invalid action')
    };
  } catch (error) {
    console.error('Endpoint Error:', error);
    console.log('This is the key: ', process.env.MY_API_KEY);
    return {
      statusCode: 500,
      body: JSON.stringify('Internal Server Error')
    };
  }
};