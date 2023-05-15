


const axios = require('axios');
require('dotenv').config()
const openaiAPIKey = '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';

exports.handler = async (event) => {
    try {
        const { prompt } = JSON.parse(event.body);
        const openaiAPIUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
        const openaiAPIKey = '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'; // Replace with your OpenAI API key

        const response = await axios.post(openaiAPIUrl, {
            prompt,
            max_tokens: 100,
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
        console.error('Error:', error.response.data);
        return {
            statusCode: 500,
            body: JSON.stringify('Internal Server Error')
        };
    }
};