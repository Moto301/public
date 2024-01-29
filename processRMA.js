const { query, Client } = require('faunadb');

// Initialize FaunaDB Client
const client = new Client({ secret: 'HuntsmanRMA' });

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const rmaRequest = JSON.parse(event.body);

        // Add data to FaunaDB
        const response = await client.query(
            query.Create(
                query.Collection('rma_requests'),
                { data: rmaRequest }
            )
        );

        // TODO: Implement email notification using SendGrid

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "RMA request processed successfully", id: response.ref.id })
        };
    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, body: JSON.stringify({ message: "Internal Server Error" }) };
    }
};
