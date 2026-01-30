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
    const store = getStore('settings');

    if (event.httpMethod === 'GET') {
      try {
        const data = await store.get('app-settings', { type: 'json' });
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data || {
            displaySettings: { splitView: false, webpageUrl: '' },
            visualSettings: {
              headerSize: '4rem',
              taskFontSize: '1.5rem',
              taskCardHeight: 'auto',
              dividerPosition: '50vh',
              headerSectionHeight: 'auto',
              badgeSize: '150px'
            }
          })
        };
      } catch (error) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            displaySettings: { splitView: false, webpageUrl: '' },
            visualSettings: {
              headerSize: '4rem',
              taskFontSize: '1.5rem',
              taskCardHeight: 'auto',
              dividerPosition: '50vh',
              headerSectionHeight: 'auto',
              badgeSize: '150px'
            }
          })
        };
      }
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      await store.setJSON('app-settings', body);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Settings saved successfully' })
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