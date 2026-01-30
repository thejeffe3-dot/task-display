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
    const store = getStore('tasks');

    if (event.httpMethod === 'GET') {
      try {
        const data = await store.get('task-list', { type: 'json' });
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data || { tasks: [] })
        };
      } catch (error) {
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
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};