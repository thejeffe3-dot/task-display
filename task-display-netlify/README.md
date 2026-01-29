# Task Display System for Raspberry Pi + Netlify

A real-time task display system perfect for showing on a TV via Raspberry Pi, with easy management through a web interface. Uses Netlify Blobs for persistent, reliable storage.

## Features

- 📺 **TV Display Mode**: Large, readable display perfect for viewing from a distance
- ⚙️ **Admin Panel**: Easy-to-use interface for managing tasks
- 🔄 **Real-time Updates**: Auto-refreshes every 5 seconds in TV mode
- 💾 **Persistent Storage**: Tasks saved using Netlify Blobs (never resets!)
- 🎨 **Priority Levels**: Color-coded high/medium/low priorities
- ✅ **Task Management**: Mark complete, delete, and organize tasks
- 🔐 **Backup**: LocalStorage fallback for offline use

## Technology Stack

- **Frontend**: Pure HTML/CSS/JavaScript (no frameworks)
- **Backend**: Netlify Serverless Functions
- **Storage**: Netlify Blobs (persistent key-value store)
- **Hosting**: Netlify + GitHub (auto-deploy)

## Quick Start

### Recommended: GitHub + Netlify

See **[GITHUB-NETLIFY-GUIDE.md](./GITHUB-NETLIFY-GUIDE.md)** for complete step-by-step instructions.

**Quick summary:**
1. Push this repo to GitHub
2. Import to Netlify from GitHub
3. Auto-deploys with functions enabled
4. Data persists forever with Netlify Blobs

### Alternative: Local Use

Just open `index.html` in a browser - works offline with localStorage!

## Deployment

**Full deployment guide:** See [GITHUB-NETLIFY-GUIDE.md](./GITHUB-NETLIFY-GUIDE.md)

**Quick deploy:**
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/task-display.git
git push -u origin main

# Then import on Netlify from GitHub
```

## Setup on Raspberry Pi

Once deployed to Netlify:

```bash
# Full-screen kiosk mode
chromium-browser --kiosk https://your-site.netlify.app
```

**Auto-start on boot:** See [GITHUB-NETLIFY-GUIDE.md](./GITHUB-NETLIFY-GUIDE.md) Section 4.2

## Storage Architecture

### Production (Netlify)
```
User → Netlify Functions → Netlify Blobs (persistent)
                        ↘ localStorage (backup)
```

### Local/Offline
```
User → localStorage only (single device)
```

## Files Structure

```
task-display-netlify/
├── index.html                      # Main app UI
├── netlify.toml                    # Netlify config
├── package.json                    # Dependencies
├── netlify/
│   └── functions/
│       └── tasks.js                # API endpoints
├── README.md                       # This file
├── GITHUB-NETLIFY-GUIDE.md        # Complete setup guide
└── DEPLOYMENT.md                   # Troubleshooting
```

## API Endpoints

### GET `/.netlify/functions/tasks`
Returns all tasks:
```json
{
  "tasks": [
    {
      "id": 1234567890,
      "title": "Example Task",
      "description": "Task description",
      "priority": "high",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST `/.netlify/functions/tasks`
Save tasks:
```json
{
  "tasks": [...]
}
```

## Cost

**100% FREE** for personal use:
- ✅ Netlify free tier: 100GB bandwidth, 300 build minutes
- ✅ Netlify Blobs: 1GB storage free (more than enough)
- ✅ GitHub: Unlimited public/private repos
- ✅ No credit card required

## Features in Detail

### TV Display Mode
- Full-screen, distraction-free interface
- Large text optimized for TV viewing
- Color-coded task priorities
- Real-time clock and date
- Auto-refreshes every 5 seconds
- Shows only active (non-completed) tasks

### Admin Panel
- Simple form to add tasks
- Set priority levels (high/medium/low)
- Add optional descriptions
- Mark tasks as complete
- Delete tasks
- Real-time preview of all tasks

### Storage & Sync
- Primary: Netlify Blobs (cloud storage)
- Fallback: Browser localStorage (offline)
- Automatic sync on every change
- No data loss even if function fails

## Customization

Edit `index.html` to customize:
- Colors and theme
- Text sizes
- Refresh interval
- Display layout
- Priority labels

## Troubleshooting

See [DEPLOYMENT.md](./DEPLOYMENT.md) for common issues.

**Quick checks:**
- ✅ Test API: Visit `/.netlify/functions/tasks`
- ✅ Check console: F12 → Console tab
- ✅ Verify functions: Netlify Dashboard → Functions tab

## Updates & Maintenance

**To update your deployment:**
```bash
# Make changes locally
# Test by opening index.html

# Push to GitHub
git add .
git commit -m "Your update description"
git push

# Netlify auto-deploys in ~1-2 minutes
```

## Security

- ✅ No authentication required (perfect for home use)
- ⚠️ Anyone with the URL can view/edit tasks
- 💡 For private use: Enable Netlify password protection in site settings

## Browser Support

Works in all modern browsers:
- ✅ Chrome/Chromium (recommended for Raspberry Pi)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## License

MIT License - Feel free to use and modify!

## Support

For detailed setup help, see:
- [GITHUB-NETLIFY-GUIDE.md](./GITHUB-NETLIFY-GUIDE.md) - Complete setup walkthrough
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Troubleshooting guide

Built with ❤️ for Raspberry Pi enthusiasts
