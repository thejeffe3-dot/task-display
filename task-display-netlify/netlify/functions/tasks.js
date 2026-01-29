const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Get Netlify Blobs store
    const store = getStore('tasks');

    // GET - Retrieve tasks
    if (event.httpMethod === 'GET') {
      try {
        const data = await store.get('task-list', { type: 'json' });
        
        if (data) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
          };
        } else {
          // Return empty tasks array if no data exists
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ tasks: [] })
          };
        }
      } catch (error) {
        console.error('Error reading from blob store:', error);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ tasks: [] })
        };
      }
    }

    // POST - Save tasks
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      
      // Save to blob store
      await store.setJSON('task-list', body);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Tasks saved successfully' })
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};
