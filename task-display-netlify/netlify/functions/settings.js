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
    const store = getStore('settings');

    // GET - Retrieve settings
    if (event.httpMethod === 'GET') {
      try {
        const data = await store.get('app-settings', { type: 'json' });
        
        if (data) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
          };
        } else {
          // Return default settings if no data exists
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              displaySettings: {
                splitView: false,
                webpageUrl: ''
              },
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
      } catch (error) {
        console.error('Error reading from blob store:', error);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            displaySettings: {
              splitView: false,
              webpageUrl: ''
            },
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

    // POST - Save settings
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      
      // Save to blob store
      await store.setJSON('app-settings', body);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Settings saved successfully' })
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
