const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Get store with explicit configuration
    const store = getStore({
      name: 'tasks',
      siteID: process.env.NETLIFY_SITE_ID || context.site?.id,
      token: process.env.NETLIFY_AUTH_TOKEN || context.token
    });

    if (event.httpMethod === 'GET') {
      try {
        const data = await store.get('task-list', { type: 'json' });
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data || { tasks: [] })
        };
      } catch (error) {
        console.error('Error reading from blob store:', error);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ tasks: [] })
        };
      }
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      await store.setJSON('task-list', body);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Tasks saved successfully' })
      };
    }

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
