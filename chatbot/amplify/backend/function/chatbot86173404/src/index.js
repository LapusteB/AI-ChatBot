

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
      },
        body: JSON.stringify('Hello from Lambda!'),
    };
};

const axios = require('axios');

exports.handler = async (event) => {
    try {
        const { prompt } = JSON.parse(event.body);
        const openaiAPIUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
        const openaiAPIKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key

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