const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const secretsManager = new AWS.SecretsManager();

async function getSecret(secretName) {
  const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
  if (data.SecretString) {
    return JSON.parse(data.SecretString);
  }
  return null;
}


//const openaiAPIKey = process.env.MY_API_KEY;// Replace with your OpenAI API key

exports.handler = async (event) => {
  try {

    const secrets = await getSecret('OPENAI_KEY'); // Replace with the name you gave your secret
    const apiKey = secrets.OPENAI_KEY;

    // Initialize OpenAI configuration with the retrieved API key
    const configuration = new Configuration({
      organization: "org-yjEWmQsSgoZQFZ4ZT90yioh1",
      apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuration);

    const { prompt } = JSON.parse(event.body);
    const { action } = JSON.parse(event.body); // New line

    if (action === "chat-completion") { // New condition
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: 'system',
            content: prompt
          }
        ],
        temperature: 1,
        top_p: 1,
        n: 1,
        stream: false,
        max_tokens: 250,
        presence_penalty: 0,
        frequency_penalty: 0
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